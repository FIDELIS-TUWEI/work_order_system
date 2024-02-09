import moment from "moment";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import Logo from "@/assets/images/logo.png";
import Layout from "@/components/Layout";
import WorkReport from "./WorkReport";
import { Button, Typography, message } from "antd";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import { useGetFilterStatusQuery } from "@/features/reports/reportSlice";


const Reports = () => {
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading: loading, error, refetch } = useGetFilterStatusQuery({page, status: filterStatus})

  const { data: workOrdersData, pages } = data || {};

  useEffect(() => {
    if (error) {
      message.error(error.message)
    }
  }, [error]);

  // Handle status change
  const handleStatusChange = (event) => {
    const newStatus = event.target.value
    setFilterStatus(newStatus);
    refetch();
  };

  // function to handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
    refetch();
  };

  // Function to generate and export pending work orders
  const exportPDF = async () => {
    const doc = new jsPDF({ orientation: "landscape" });

    // Calculate the center position for the logo
    const centerX = doc.internal.pageSize.width / 2;

    // Add company logo centered
    const imgData = Logo;
    const logoWidth = 30;
    const logoHeight = 30;
    const logoX = centerX - logoWidth / 2;
    doc.addImage(imgData, "PNG", logoX, 10, logoWidth, logoHeight);

    // Add report generation date
    const reportDate = moment().format("DD/MM/YYYY, hh:mm a");
    doc.setFontSize(6);
    doc.text(`${reportDate}`, 10, 20);

    const initialTableY = 50;

    doc.setFontSize(12);
    doc.text(`Work Orders Report by ${filterStatus || "All"} Status`, 15, initialTableY - 10);

    const columns = [
      {
        header: "Description",
        dataKey: "description",
      },
      {
        header: "Service Type",
        dataKey: "serviceType",
      },
      {
        header: "Priority",
        dataKey: "priority",
      },
      {
        header: "Category",
        dataKey: "category",
      },
      {
        header: "Tracker",
        dataKey: "tracker",
      },
      {
        header: "Date Requested",
        dataKey: "Date_Created",
      },
      {
        header: "Assigned To",
        dataKey: "assignedTo",
      },
      {
        header: "Supervisor",
        dataKey: "supervisedBy",
      },
      {
        header: "Date Completed",
        dataKey: "dateCompleted",
      },
    ];

    // Format date work added
    const formatDate = (date) => moment(date).format("DD/MM/YYYY, hh:mm a");

    // format date work completed
    const formatDateCompleted = (date) => (date ? formatDate(date) : "Not yet Complete");

    // Display employee assigned
    const showEmployeeName = (employee) => (employee ? `${employee.firstName} ${employee.lastName}` : "Unassigned");

    const rows = workOrdersData.map((workOrder) => [
      workOrder.description,
      workOrder.serviceType,
      workOrder.priority,
      `${workOrder.category.categoryTitle}`,
      workOrder.tracker,
      formatDate(workOrder.Date_Created),
      showEmployeeName(workOrder.assignedTo),
      workOrder.supervisedBy,
      formatDateCompleted(workOrder.dateCompleted),
    ]);

    doc.autoTable({
      head: [columns.map((col) => col.header)],
      body: rows,
      startY: initialTableY,
    });

    // Add pagination information
    const pageInfo = `Page ${page} of ${pages}`;
    doc.text(pageInfo, doc.internal.pageSize.width - 15, doc.internal.pageSize.height - 10, {align: "right"});

    doc.save("Work Orders.pdf");
    message.success("Report Generated Successfully"); 
  };

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>All Reports</Typography>
      <WorkReport 
        workOrdersData={workOrdersData}
        handlePageChange={handlePageChange}
        loading={loading}
        handleStatusChange={handleStatusChange}
        exportPDF={exportPDF}
      />
      
      <div className="pagination">
        <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'lightgrey' }}>
          <GrFormPrevious />
        </Button>
        <span> Page {page} of {pages}</span>
        <Button disabled={page === pages} onClick={() => handlePageChange(page + 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'lightgrey' }}>
          <GrFormNext />
        </Button>
      </div>
    </Layout>
  )
}

export default Reports;