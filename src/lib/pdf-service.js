import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePagePDF = (title, contentTitle, data, type = 'table') => {
    const doc = new jsPDF();
    const collegeName = "Haider Institute of Technology and Management (HITM)";
    const address = "Haider Institute of Technology and Management, Okhargarha, Pithoriya, Ranchi -834006";
    const contact = "Phone: 764-496-6461 | Email: info@hitmranchi.ac.in";

    // Header (Consistent Layout)
    doc.setFont("playfair", "bold");
    doc.setFontSize(22);
    doc.setTextColor(139, 26, 26); // hitm-red
    const titleWidth = doc.getTextWidth(collegeName);
    doc.text(collegeName, (doc.internal.pageSize.getWidth() - titleWidth) / 2, 20);

    doc.setFontSize(10);
    doc.setFont("inter", "normal");
    doc.setTextColor(100);
    const addrWidth = doc.getTextWidth(address);
    doc.text(address, (doc.internal.pageSize.getWidth() - addrWidth) / 2, 28);
    const contactWidth = doc.getTextWidth(contact);
    doc.text(contact, (doc.internal.pageSize.getWidth() - contactWidth) / 2, 34);

    doc.setDrawColor(212, 160, 23); // hitm-gold
    doc.line(20, 40, 190, 40);

    // Page Title
    doc.setFontSize(16);
    doc.setTextColor(15, 37, 71); // hitm-navy
    doc.text(contentTitle, 20, 55);

    if (type === 'table') {
        doc.autoTable({
            startY: 65,
            head: [data.headers],
            body: data.rows,
            headStyles: { fillColor: [15, 37, 71], textColor: [255, 255, 255], fontStyle: 'bold' },
            alternateRowStyles: { fillColor: [245, 245, 245] },
            margin: { left: 20, right: 20 }
        });
    } else {
        doc.setFontSize(12);
        doc.setTextColor(60);
        let y = 65;
        data.sections.forEach(sec => {
            doc.setFont("inter", "bold");
            doc.text(sec.title, 20, y);
            y += 7;
            doc.setFont("inter", "normal");
            const lines = doc.splitTextToSize(sec.content, 170);
            doc.text(lines, 20, y);
            y += (lines.length * 6) + 10;
            
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
        });
    }

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text("Haider Institute of Technology and Management - Ranchi, Jharkhand - 834006", 20, doc.internal.pageSize.getHeight() - 10);
        doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 10);
    }

    doc.save(`${title.replace(/\s+/g, '_')}_HITM.pdf`);
};
