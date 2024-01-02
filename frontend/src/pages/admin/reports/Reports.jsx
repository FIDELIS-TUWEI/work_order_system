import axios from "axios";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import Logo from "../../../assets/logo.png";
import Layout from "../../../components/Layout";
import WorkReport from "../../../components/WorkReport";
import { Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";

const WORK_URL = "/hin";

const Reports = () => {
  const [workOrders, setWorkOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


// Function to fetch all work orders from API
const getWorkOrders = useCallback (async () => {
  try {
    setLoading(true);
    const res = await axios.get(`${WORK_URL}/work`, {
      params: {
        pageNumber: page,
        status: filterStatus
      },
    });
    setWorkOrders(res.data.data);
    setPages(res.data.pages);
    setLoading(false);
  } catch (error) {
    message.error("Failed to fetch work orders", error.message);
  }
}, [filterStatus, page]);

  // useEffect hook
  useEffect(() => {
    getWorkOrders();
  }, [filterStatus, page, getWorkOrders]);

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
    doc.text("Work Orders Report", 15, initialTableY - 10);

    const columns = [
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
        header: "Requested By",
        dataKey: "requestedBy",
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

    const rows = workOrders.map((workOrder) => [
      workOrder.serviceType,
      workOrder.priority,
      `${workOrder.category.categoryTitle}`,
      `${workOrder.requestedBy.username}`,
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
  }

  // function to handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>All Reports</Typography>
      <WorkReport 
        workOrders={workOrders}
        handlePageChange={handlePageChange}
        pages={pages}
        page={page}
        loading={loading}
        getWorkOrders={getWorkOrders}
        setFilterStatus={setFilterStatus}
        exportPDF={exportPDF}
        navigate={navigate}
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