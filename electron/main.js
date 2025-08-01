const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 400,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    hasShadow: false,
    webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Load from built frontend
  const indexPath = path.join(__dirname, '../frontend/build/index.html');
  mainWindow.loadFile(indexPath);

  // Handle the close-widget message from renderer
  ipcMain.on('close-widget', () => {
    if (mainWindow) {
      mainWindow.close();
    }
  });

  // Handle dragging
  ipcMain.on('start-drag', () => {
    if (mainWindow) {
      mainWindow.webContents.executeJavaScript(`
        const startPos = require('electron').screen.getCursorScreenPoint();
        const windowBounds = require('electron').remote?.getCurrentWindow()?.getBounds() || {};
        window.dragData = {
          startX: startPos.x,
          startY: startPos.y,
          windowStartX: windowBounds.x || 0,
          windowStartY: windowBounds.y || 0
        };
      `).catch(() => {
        // Fallback: just start dragging from current position
        const { screen } = require('electron');
        const cursor = screen.getCursorScreenPoint();
        const bounds = mainWindow.getBounds();
        
        // Calculate offset from cursor to window origin
        const offsetX = cursor.x - bounds.x;
        const offsetY = cursor.y - bounds.y;
        
        // Store the offset for use during dragging
        mainWindow.dragOffset = { x: offsetX, y: offsetY };
      });
    }
  });

  ipcMain.on('stop-drag', () => {
    if (mainWindow) {
      mainWindow.dragOffset = null;
    }
  });

  // Handle mouse move for dragging (this needs to be set up differently)
  // We'll use a simpler approach with setIgnoreMouseEvents
  let isDragging = false;
  
  ipcMain.on('start-drag', () => {
    isDragging = true;
    
    const handleMouseMove = () => {
      if (!isDragging || !mainWindow) return;
      
      const { screen } = require('electron');
      const cursor = screen.getCursorScreenPoint();
      
      // If we have a drag offset, use it; otherwise drag from center
      if (mainWindow.dragOffset) {
        mainWindow.setPosition(
          cursor.x - mainWindow.dragOffset.x,
          cursor.y - mainWindow.dragOffset.y
        );
      } else {
        // Fallback: drag from center of window
        const bounds = mainWindow.getBounds();
        mainWindow.setPosition(
          cursor.x - bounds.width / 2,
          cursor.y - bounds.height / 2
        );
      }
      
      setTimeout(handleMouseMove, 16); // ~60fps
    };
    
    handleMouseMove();
  });
  
  ipcMain.on('stop-drag', () => {
    isDragging = false;
    if (mainWindow) {
      mainWindow.dragOffset = null;
    }
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Clean up IPC listeners when app is quitting
app.on('before-quit', () => {
  ipcMain.removeAllListeners('close-widget');
  ipcMain.removeAllListeners('start-drag');
  ipcMain.removeAllListeners('stop-drag');
});