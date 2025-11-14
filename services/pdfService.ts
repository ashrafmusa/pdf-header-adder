
import '../types';

const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
};

export const addHeaderToPdf = async (
    pdfFile: File,
    headerImageFile: File,
    position: 'left' | 'center' | 'right',
    opacity: number,
    scale: number
): Promise<Uint8Array> => {
    const { PDFDocument } = window.PDFLib;

    const pdfBuffer = await readFileAsArrayBuffer(pdfFile);
    const headerImageBuffer = await readFileAsArrayBuffer(headerImageFile);

    const pdfDoc = await PDFDocument.load(pdfBuffer);
    
    let headerImage;
    if (headerImageFile.type === 'image/png') {
        headerImage = await pdfDoc.embedPng(headerImageBuffer);
    } else if (headerImageFile.type === 'image/jpeg') {
        headerImage = await pdfDoc.embedJpg(headerImageBuffer);
    } else {
        throw new Error('Unsupported header image format. Please use PNG or JPEG.');
    }
    
    const pages = pdfDoc.getPages();
    const topMargin = 25;
    const sideMargin = 25;

    for (const page of pages) {
        const { width, height } = page.getSize();
        
        const headerWidth = width * scale;
        const scaledHeaderDims = headerImage.scale(headerWidth / headerImage.width);
        
        let xPosition: number;
        switch (position) {
            case 'left':
                xPosition = sideMargin;
                break;
            case 'right':
                xPosition = width - scaledHeaderDims.width - sideMargin;
                break;
            case 'center':
            default:
                xPosition = (width - scaledHeaderDims.width) / 2;
                break;
        }

        page.drawImage(headerImage, {
            x: xPosition,
            y: height - scaledHeaderDims.height - topMargin,
            width: scaledHeaderDims.width,
            height: scaledHeaderDims.height,
            opacity: opacity,
        });
    }

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
};
