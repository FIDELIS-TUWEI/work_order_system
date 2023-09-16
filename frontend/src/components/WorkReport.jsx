import axios from "axios";
import moment from "moment";
import { Button, Card, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Logo from "../assets/logo.png";
import LoadingBox from "../components/LoadingBox";

const WORK_URL = "/hin";


const WorkReport = () => {
  const [workOrders, setWorkOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getWorkOrders() {
      try {
        setLoading(true);
        const res = await axios.get(`${WORK_URL}/work?status=${filterStatus}`);
        const data = res.data;
        setWorkOrders(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error while fetching all work orders by status query", error);
      }
    }

    getWorkOrders();
  }, [filterStatus]);

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

    doc.autoTable({
      html: "#table",
      startY: initialTableY,
    });

    doc.save("Work Orders.pdf");
    message.success("Report Generated Successfully"); 
  }

  return (
    <Card title="Work Orders" style={{ margin: "15px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <label style={{ fontWeight: "bold" }}>Filter By Status
          <select onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="In_Progress">In Progress</option>
            <option value="Complete">Completed</option>
          </select>
        </label>
      </div>
      

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
          <LoadingBox />
        </div>
      ) : (
        <>

          <table id="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Service Type</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Date Requested</th>
              </tr>
            </thead>
            <tbody>
              {workOrders.map((workOrder) => (
                <tr key={workOrder._id}>
                  <td>{workOrder.title}</td>
                  <td>{workOrder.serviceType}</td>
                  <td>{workOrder.status}</td>
                  <td>{workOrder.assignedTo}</td>
                  <td>{moment(workOrder.Date_Created).format("DD/MM/YYYY, hh:mm a")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Total Work Orders: {workOrders.length}</p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button style={{ 
              color: 'white', 
              backgroundColor: 'darkgreen', 
              border: 'none' 
            }} 
              onClick={exportPDF}>
              Generate Report
            </Button>
          </div>
        </>
        )}
    </Card>
  )
};

export default WorkReport;