## 📄 PDF Header Adder: Detailed Application Description

 **PDF Header Adder**, is a desktop utility built using the **React/Vite** framework for the user interface and **Electron** for native desktop capabilities. Its primary function is to allow users to easily add a custom image, such as a logo or watermark, to the header area of every page within a PDF document.

The application is highly focused on user control, providing granular options for positioning and styling the added header image.

---

### I. 🧱 Core Technology Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **User Interface (Frontend)** | **React** (with **Vite**) and **TypeScript** | Provides a modern, responsive, and type-safe UI (as seen in `App.tsx` and `index.tsx`). |
| **Styling** | **Tailwind CSS** (implied by class names) | Used for rapid and utility-first styling of the application layout. |
| **Desktop Runtime** | **Electron** (`electron.js`, `preload.js`) | Bundles the web app to run natively, providing access to desktop features like the file system. |
| **PDF Processing** | External library (implied by `pdfService`) | A dedicated service (`pdfService.ts`) handles the low-level PDF manipulation (likely using a library like `pdf-lib` or similar) to embed the image. |

---

### II. 🗺️ Application Workflow and Features

The application follows a linear, step-by-step workflow, presented in a clean, two-column layout.

#### A. Input & Configuration (Left Column)

The user first provides the source files and then fine-tunes the header's appearance using intuitive controls.

| Step | Feature | Description |
| :--- | :--- | :--- |
| **1. Upload PDF File** | **File Selection** | Allows the user to select the base PDF file they wish to modify. (Handled by `handlePdfChange`). |
| **2. Upload Header Image** | **File Selection** | Allows the user to select an image (`.png`, `.jpeg`) to be used as the header/watermark. (Handled by `handleHeaderImageChange`). |
| **3. Header Position** | **Radio Buttons** | Controls the horizontal placement of the image within the header area, offering: **Left**, **Center** (default), and **Right** alignment. |
| **4. Header Opacity** | **Range Slider (0-100%)** | Controls the transparency of the header image, allowing it to function as a subtle watermark or a fully opaque graphic. |
| **5. Header Scale** | **Range Slider (5-100%)** | Controls the size of the header image as a percentage of the PDF page's width, ensuring the image scales correctly relative to the document size. |
| **6. Live Preview** | **Mock Page Display** | A dedicated section that instantly renders the uploaded header image using the chosen **position**, **opacity**, and **scale** on a mock PDF page background. |

#### B. Processing and Output (Bottom & Right Column)

1.  **Process Button:** The **"Add Header & Preview"** button triggers the core logic (`handleProcessPdf`).
    * It checks for both uploaded files.
    * It calls the external `addHeaderToPdf` service with the input files and user settings (position, opacity, scale).
    * The service returns the new PDF as a byte array (`pdfBytes`).
2.  **PDF Generation:** The app converts the resulting `pdfBytes` into a web-accessible `Blob` and a temporary `modifiedPdfUrl`.
3.  **Preview Pane (Right Column):** The `PdfPreview` component uses the `modifiedPdfUrl` to display the final, processed PDF document in the right column, allowing the user to verify the result before saving.
4.  **Native Saving (Electron Feature):** Unlike a web app that relies on simple browser downloads, the Electron implementation utilizes **Inter-Process Communication (IPC)** to call the native save functionality:
    * The React app calls `window.electronAPI.savePdf`.
    * The `electron.js` (Main Process) receives the data, opens the operating system's **Save File Dialog**, and uses the Node.js **File System (`fs`)** module to write the final `.pdf` file to the user's selected location. This provides a true, native desktop experience.
