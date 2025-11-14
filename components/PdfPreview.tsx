
import React, { useRef, useState } from 'react';

interface PdfPreviewProps {
    url: string;
    filename: string;
    bytes: Uint8Array | null;
}

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const PrintIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
    </svg>
);


const PdfPreview: React.FC<PdfPreviewProps> = ({ url, filename, bytes }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    const handlePrint = () => {
        const iframe = iframeRef.current;
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        }
    };

    const handleSavePdf = async () => {
        if (!bytes || !window.electronAPI) return;

        setIsSaving(true);
        setSaveError(null);
        try {
            const result = await window.electronAPI.savePdf(bytes, filename);
            if (!result.success && result.message !== 'Save cancelled by user.') {
                setSaveError(result.message);
            }
        } catch (err) {
            console.error('Failed to save PDF via Electron:', err);
            setSaveError(err instanceof Error ? err.message : 'An unknown error occurred during save.');
        } finally {
            setIsSaving(false);
        }
    };

    const isElectron = !!window.electronAPI;

    return (
        <div className="w-full h-full flex flex-col bg-gray-100 rounded-lg">
            <div className="flex-shrink-0 p-2 bg-white border-b border-gray-200 rounded-t-lg flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                {saveError && <p className="text-sm text-red-600 mr-auto flex-grow text-left px-2" role="alert">{`Save failed: ${saveError}`}</p>}
                {isElectron ? (
                    <button
                        onClick={handleSavePdf}
                        disabled={isSaving || !bytes}
                        className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isSaving ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : (
                            <>
                                <DownloadIcon />
                                Save to Computer
                            </>
                        )}
                    </button>
                ) : (
                    <a
                        href={url}
                        download={filename}
                        className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                    >
                        <DownloadIcon />
                        Download
                    </a>
                )}
                <button
                    onClick={handlePrint}
                    type="button"
                    className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                    <PrintIcon />
                    Print
                </button>
            </div>
            <div className="flex-grow p-1 sm:p-2">
                <iframe
                    ref={iframeRef}
                    src={url}
                    title="PDF Preview"
                    className="w-full h-full border rounded-b-md"
                />
            </div>
        </div>
    );
};

export default PdfPreview;
