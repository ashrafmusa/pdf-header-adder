
declare global {
  interface Window {
    PDFLib: {
      PDFDocument: {
        create: () => Promise<any>;
        load: (data: ArrayBuffer | Uint8Array | string) => Promise<any>;
      };
      rgb: (r: number, g: number, b: number) => any;
      degrees: (angle: number) => number;
    };
    electronAPI?: {
      savePdf: (pdfData: Uint8Array, defaultFilename: string) => Promise<{ success: boolean; message: string }>;
    };
  }
}

// This export makes the file a module, which is required for global declarations.
export {};
