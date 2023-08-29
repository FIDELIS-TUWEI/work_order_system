const WorkOrder = require("../../model/workOrder");
const PDF = require("pdfkit");
const fs = require("fs");


// Get work order by status
const printWorkOrder = asyncHandler (async (req, res, next) => {
    const {status} = req.params;
    try {
        const work = await WorkOrder.find({status});

        if (!work) {
            return next(new ErrorResponse("Work Order not found", 404));
        }

        res.status(200).json({
            success: true,
            data: work
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        next(error);
        
    }
});

// Generate PDF
const generatePDF = asyncHandler (async (req, res, next) => {
    const {status} = req.params;
    try {
        const workOrders = await WorkOrder.find({status});

        const pdfdoc = new PDF();
        pdfdoc.pipe(fs.createWriteStream("workorder.pdf"));

        workOrders.forEach(work => {
            pdfdoc.font("Times-Roman");
            pdfdoc.text(`Work Order ID: ${work._id}`);
            pdfdoc.text(work.title);
            pdfdoc.text(work.location);
            pdfdoc.text(work.category);
            pdfdoc.text(work.serviceType);
            pdfdoc.text(work.dateAssigned);
            pdfdoc.text(work.dateCompleted);
            pdfdoc.text(work.comments);
            pdfdoc.text(work.status);

            pdfdoc.moveDown();
        });

        pdfdoc.end();
        res.download('workorder.pdf');

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error Generating PDF"
        })
        next(error);
        
    }
})

module.exports = {
    printWorkOrder,
    generatePDF
}