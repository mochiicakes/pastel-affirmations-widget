const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    on: (channel, listener) => ipcRenderer.on(channel, listener),
    removeListener: (channel, listener) => ipcRenderer.removeListener(channel, listener),
  },
  send: (channel, ...args) => ipcRenderer.send(channel, ...args), // For backward compatibility with your current code
});

window.addEventListener('DOMContentLoaded', () => {
  console.log('Preload script loaded');
  
  // Handle dragging at the DOM level as well
  let isDragging = false;
  
  document.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('draggable') || e.target.closest('.draggable')) {
      isDragging = true;
      ipcRenderer.send('start-drag');
    }
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      ipcRenderer.send('stop-drag');
    }
  });
});