const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

// In development, you may want to use a command-line flag to indicate development mode
const isDev = process.argv.includes('--dev');

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      // The preload script is essential for secure communication between
      // the main process (Node.js) and the renderer process (your React app).
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false, // Recommended for security
      contextIsolation: true, // Recommended for security
    },
  });

  // Load the web app.
  if (isDev) {
    // In development, load from the Vite dev server for hot-reloading.
    // Make sure your Vite server is running on this port.
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools(); // Open DevTools automatically.
  } else {
    // In production, load the static HTML file built by Vite.
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

// --- Inter-Process Communication (IPC) Handler ---
// Listens for the 'save-pdf-file' event from the React app.
ipcMain.handle('save-pdf-file', async (event, pdfBytes, defaultFilename) => {
  // Get the window that sent the message.
  const window = BrowserWindow.fromWebContents(event.sender);
  
  // Open a native "Save File" dialog.
  const { canceled, filePath } = await dialog.showSaveDialog(window, {
    defaultPath: path.join(app.getPath('downloads'), defaultFilename),
    filters: [{ name: 'PDF Documents', extensions: ['pdf'] }],
  });

  if (canceled) {
    return { success: false, message: 'Save cancelled by user.' };
  }

  try {
    // The data comes as a Uint8Array; convert it to a Node.js Buffer for fs.
    const nodeBuffer = Buffer.from(pdfBytes);
    await fs.promises.writeFile(filePath, nodeBuffer);
    return { success: true, message: `File saved successfully to ${filePath}` };
  } catch (error) {
    console.error('Failed to save the file:', error);
    return { success: false, message: `Error saving file: ${error.message}` };
  }
});


// --- App Lifecycle Events ---
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS, re-create a window when the dock icon is clicked and no other windows are open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // Quit when all windows are closed, except on macOS.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
