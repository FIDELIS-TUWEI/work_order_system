const PDFDoc = require("pdfkit");

exports.generatePDF = (workOrderData) => {
    const doc = new PDFDoc();

    doc.fontSize(26).text("Work Order", {
        underline: true, 
        align: "center",
    })

}