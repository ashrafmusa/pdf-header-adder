const { contextBridge, ipcRenderer } = require('electron');

// Expose a secure API to the renderer process (your React app).
contextBridge.exposeInMainWorld('electronAPI', {
  /**
   * Invokes the 'save-pdf-file' handler in the main process.
   * @param {Uint8Array} pdfBytes - The raw byte data of the PDF.
   * @param {string} defaultFilename - The suggested filename.
   * @returns {Promise<{success: boolean, message: string}>}
   */
  savePdf: (pdfBytes, defaultFilename) => ipcRenderer.invoke('save-pdf-file', pdfBytes, defaultFilename),
});
