import jsPDF from 'jspdf';

const loadPdfJs = async () => {
  if (typeof window === 'undefined') return null;
  if (window.pdfjsLib) return window.pdfjsLib;

  return new Promise((resolve, reject) => {
    const scriptId = 'pdfjs-script-cdn';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
      document.head.appendChild(script);
    }

    const checkLoaded = setInterval(() => {
      if (window.pdfjsLib) {
        clearInterval(checkLoaded);
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
        resolve(window.pdfjsLib);
      }
    }, 100);

    setTimeout(() => {
      clearInterval(checkLoaded);
      reject(new Error('Timeout loading PDF.js from CDN'));
    }, 15000);
  });
};

export async function compressPDF(file, onProgress) {
  // If the file is already under 100KB, no need to compress it
  if (file.size <= 100 * 1024) {
    if (onProgress) onProgress('File is already under 100KB. Using original file.');
    return file;
  }

  try {
    if (onProgress) onProgress('Loading PDF compression engine...');
    const pdfjsLib = await loadPdfJs();
    if (!pdfjsLib) {
      throw new Error('PDF.js engine could not be loaded.');
    }

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    const numPages = pdf.numPages;
    if (onProgress) onProgress(`PDF loaded. Total pages: ${numPages}. Starting compression...`);
    
    // We will start with a baseline scale and quality.
    // Since we need to get below 100KB, let's adjust based on number of pages.
    let scale = 1.2;
    let quality = 0.5;

    if (numPages > 5) {
      scale = 0.6;
      quality = 0.2;
    } else if (numPages > 3) {
      scale = 0.8;
      quality = 0.3;
    } else if (numPages > 1) {
      scale = 1.0;
      quality = 0.4;
    }

    const tryCompress = async (s, q) => {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
      });

      for (let i = 1; i <= numPages; i++) {
        if (onProgress) onProgress(`Processing page ${i} of ${numPages} (Scale: ${s.toFixed(1)}, Quality: ${q.toFixed(1)})...`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: s });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Draw white background
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        const imgData = canvas.toDataURL('image/jpeg', q);

        if (i > 1) {
          doc.addPage([viewport.width, viewport.height]);
        } else {
          doc.internal.pageSize.width = viewport.width;
          doc.internal.pageSize.height = viewport.height;
        }

        doc.addImage(imgData, 'JPEG', 0, 0, viewport.width, viewport.height);
      }

      const blob = doc.output('blob');
      return new File([blob], file.name, { type: 'application/pdf' });
    };

    let compressedFile = await tryCompress(scale, quality);

    // If still over 100KB, try aggressive compression
    if (compressedFile.size > 100 * 1024) {
      if (onProgress) onProgress('File exceeds 100KB. Applying higher compression...');
      compressedFile = await tryCompress(scale * 0.7, Math.max(0.15, quality * 0.4));
    }

    // If still over 100KB, try maximum compression
    if (compressedFile.size > 100 * 1024) {
      if (onProgress) onProgress('Finalizing maximum compression settings...');
      compressedFile = await tryCompress(scale * 0.5, 0.1);
    }

    const savings = ((file.size - compressedFile.size) / file.size * 100).toFixed(0);
    if (onProgress) onProgress(`Complete! Size reduced by ${savings}% to ${(compressedFile.size / 1024).toFixed(1)} KB.`);

    return compressedFile;
  } catch (error) {
    console.error('Error compressing PDF:', error);
    if (onProgress) onProgress('Compression failed. Uploading original file as fallback.');
    return file;
  }
}
