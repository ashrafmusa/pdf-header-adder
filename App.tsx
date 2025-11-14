
import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import PdfPreview from './components/PdfPreview';
import { addHeaderToPdf } from './services/pdfService';

const PdfIcon = () => (
    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 8v32h32V8H8z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 22h16M16 30h16M16 14h4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const HeaderIcon = () => (
     <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

type HeaderPosition = 'left' | 'center' | 'right';

const App: React.FC = () => {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [headerImageFile, setHeaderImageFile] = useState<File | null>(null);
    const [headerImageUrl, setHeaderImageUrl] = useState<string | null>(null);
    const [modifiedPdfUrl, setModifiedPdfUrl] = useState<string | null>(null);
    const [modifiedPdfBytes, setModifiedPdfBytes] = useState<Uint8Array | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [headerPosition, setHeaderPosition] = useState<HeaderPosition>('center');
    const [headerOpacity, setHeaderOpacity] = useState<number>(100);
    const [headerScale, setHeaderScale] = useState<number>(25);

    useEffect(() => {
        if (headerImageFile) {
            const objectUrl = URL.createObjectURL(headerImageFile);
            setHeaderImageUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
        setHeaderImageUrl(null);
    }, [headerImageFile]);

    useEffect(() => {
        return () => {
            if (modifiedPdfUrl) {
                URL.revokeObjectURL(modifiedPdfUrl);
            }
        };
    }, [modifiedPdfUrl]);

    const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPdfFile(file);
            setModifiedPdfUrl(null);
            setModifiedPdfBytes(null);
            setError(null);
        }
    };

    const handleHeaderImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setHeaderImageFile(file);
            setModifiedPdfUrl(null);
            setModifiedPdfBytes(null);
            setError(null);
        }
    };

    const handleProcessPdf = async () => {
        if (!pdfFile || !headerImageFile) {
            setError('Please select both a PDF and a header image.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const pdfBytes = await addHeaderToPdf(pdfFile, headerImageFile, headerPosition, headerOpacity / 100, headerScale / 100);
            setModifiedPdfBytes(pdfBytes);
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setModifiedPdfUrl(url);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const getModifiedFilename = (): string => {
        if (!pdfFile) return 'document-with-header.pdf';
        const nameWithoutExtension = pdfFile.name.replace(/\.pdf$/i, '');
        return `${nameWithoutExtension}-with-header.pdf`;
    }
    
    const positionToJustify: { [key in HeaderPosition]: string } = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-7xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">PDF Header Adder</h1>
                    <p className="mt-4 text-lg text-gray-600">Easily add an image header to every page of your PDF.</p>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-6">
                        <div className="flex-grow space-y-6">
                            <FileUpload
                                id="pdf-upload"
                                label="1. Upload PDF File"
                                accept=".pdf"
                                file={pdfFile}
                                onFileChange={handlePdfChange}
                                icon={<PdfIcon />}
                            />
                            <FileUpload
                                id="header-upload"
                                label="2. Upload Header Image"
                                accept="image/png, image/jpeg"
                                file={headerImageFile}
                                onFileChange={handleHeaderImageChange}
                                icon={<HeaderIcon />}
                            />
                            <div>
                                <label className="block text-lg font-semibold text-gray-800 mb-2">3. Header Position</label>
                                 <fieldset className="mt-2">
                                    <legend className="sr-only">Header position</legend>
                                    <div className="flex items-center justify-between bg-gray-100 p-1 rounded-lg">
                                        {(['left', 'center', 'right'] as const).map((pos) => (
                                            <div key={pos} className="flex-1 px-1">
                                                <input 
                                                    type="radio" 
                                                    id={`position-${pos}`} 
                                                    name="header-position" 
                                                    value={pos}
                                                    checked={headerPosition === pos}
                                                    onChange={() => setHeaderPosition(pos)}
                                                    className="sr-only"
                                                />
                                                <label 
                                                    htmlFor={`position-${pos}`}
                                                    className={`block w-full text-center py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer ${
                                                        headerPosition === pos
                                                            ? 'bg-indigo-600 text-white shadow'
                                                            : 'text-gray-600 hover:bg-gray-200'
                                                    }`}
                                                >
                                                    {pos.charAt(0).toUpperCase() + pos.slice(1)}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </fieldset>
                            </div>
                             <div>
                                <label htmlFor="opacity-slider" className="block text-lg font-semibold text-gray-800 mb-2">
                                    4. Header Opacity: <span className="font-bold text-indigo-600">{headerOpacity}%</span>
                                </label>
                                <input
                                    id="opacity-slider"
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={headerOpacity}
                                    onChange={(e) => setHeaderOpacity(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                    aria-label="Header image opacity"
                                />
                            </div>
                             <div>
                                <label htmlFor="scale-slider" className="block text-lg font-semibold text-gray-800 mb-2">
                                    5. Header Scale: <span className="font-bold text-indigo-600">{headerScale}% of page width</span>
                                </label>
                                <input
                                    id="scale-slider"
                                    type="range"
                                    min="5"
                                    max="100"
                                    value={headerScale}
                                    onChange={(e) => setHeaderScale(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                    aria-label="Header image scale"
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-semibold text-gray-800 mb-2">
                                    6. Live Preview
                                </label>
                                <div className="mt-2 p-4 border border-gray-300 rounded-lg bg-gray-100">
                                    <div className="relative w-full h-80 bg-white rounded shadow-inner border border-gray-200 overflow-hidden" aria-label="Mock PDF page preview">
                                        {headerImageUrl ? (
                                            <div className="absolute top-0 left-0 right-0 p-[25px]">
                                                <div className={`w-full flex ${positionToJustify[headerPosition]}`}>
                                                    <img 
                                                        src={headerImageUrl} 
                                                        alt="Header Preview"
                                                        className="object-contain"
                                                        style={{ 
                                                            opacity: headerOpacity / 100,
                                                            width: `${headerScale}%`,
                                                        }}
                                                        aria-label={`Header preview with ${headerOpacity}% opacity, scaled to ${headerScale}% and aligned to the ${headerPosition}`}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-center text-gray-500 text-sm">
                                                <p>Upload a header image to see a preview on this page.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {error && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                                <p className="font-bold">Error</p>
                                <p>{error}</p>
                            </div>
                        )}
                        
                        <div className="flex-shrink-0 pt-4">
                             <button
                                onClick={handleProcessPdf}
                                disabled={!pdfFile || !headerImageFile || isLoading}
                                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    'Add Header & Preview'
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg min-h-[75vh]">
                        {modifiedPdfUrl && modifiedPdfBytes ? (
                            <PdfPreview url={modifiedPdfUrl} filename={getModifiedFilename()} bytes={modifiedPdfBytes} />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-md border-2 border-dashed border-gray-300 p-4">
                                <div className="text-center text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M7 21a4 4 0 004-4v-4a2 2 0 012-2h4a2 2 0 012 2v4a4 4 0 00-4 4M7 21h10a2 2 0 002-2v-3.5a2.5 2.5 0 00-5 0V21z" />
                                    </svg>
                                    <p className="mt-2 text-sm font-medium">Your processed PDF will appear here</p>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;
