import jsPDF from 'jspdf';

export default function downloadPDF() {
    var doc = new jsPDF();

    // Source HTMLElement or a string containing HTML.
    var elementHTML = document.querySelector('#generatePDFContainer');
    const nameHTML = document.querySelector('#idToPDF').innerText;

    doc.html(elementHTML, {
        callback: function (doc) {
            // Save the PDF
            doc.save(`${nameHTML}.pdf`);
        },
        margin: [10, 10, 10, 10],
        autoPaging: 'text',
        x: 0,
        y: 0,
        width: 190, //target width in the PDF document
        windowWidth: 675, //window width in CSS pixels
    });
}
