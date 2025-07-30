const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 400,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    hasShadow: false,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Load from built frontend
  const indexPath = path.join(__dirname, '../frontend/build/index.html');
  win.loadFile(indexPath);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
