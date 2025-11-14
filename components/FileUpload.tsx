
import React, { useRef } from 'react';

interface FileUploadProps {
    id: string;
    label: string;
    accept: string;
    file: File | null;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: React.ReactNode;
}

const FileUpload: React.FC<FileUploadProps> = ({ id, label, accept, file, onFileChange, icon }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="w-full">
            <label htmlFor={id} className="block text-lg font-semibold text-gray-800 mb-2">{label}</label>
            <div 
                className="mt-1 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors duration-200"
                onClick={() => inputRef.current?.click()}
            >
                <div className="space-y-1 text-center">
                    {icon}
                    <div className="flex text-sm text-gray-600">
                        <p className="relative bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                           {file ? (
                                <span className="text-gray-900 truncate">{file.name}</span>
                            ) : (
                                <span>Select a file</span>
                            )}
                        </p>
                        <input ref={inputRef} id={id} name={id} type="file" className="sr-only" accept={accept} onChange={onFileChange} />
                    </div>
                    <p className="text-xs text-gray-500">
                        {accept.replace('image/*', 'PNG, JPG supported').replace('.pdf', 'PDF up to 50MB')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
