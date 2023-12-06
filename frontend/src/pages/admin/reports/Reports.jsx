import axios from "axios";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import Logo from "../../../assets/logo.png";
import Layout from "../../../components/Layout";
import WorkReport from "../../../components/WorkReport";
import { Typography, message } from "antd";
import { useNavigate } from "react-router-dom";


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
        header: "Title",
        dataKey: "title",
      },
      {
        header: "Date Requested",
        dataKey: "dateAdded",
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
        header: "Status",
        dataKey: "status",
      },
    ];

    const formatDate = (date) => moment(date).format("DD/MM/YYYY, hh:mm a");

    const formatDateCompleted = (date) => (date ? formatDate(date) : "Not yet Complete");

    const rows = workOrders.map((workOrder) => ({
      title: workOrder.title,
      dateAdded: formatDate(workOrder.dateAdded),
      serviceType: workOrder.serviceType,
      priority: workOrder.priority,
      status: workOrder.status,
      dateCompleted: formatDateCompleted(workOrder.dateCompleted),
    }));

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
      
    </Layout>
  )
}

export default Reports;