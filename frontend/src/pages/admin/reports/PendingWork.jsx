import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { pendingWorkOrders } from "../../../services/reportsApi";
import { useEffect, useState } from "react";
import { Button, Card, message } from "antd";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import Logo from "../../../assets/logo.png";

const PendingWork = () => {
  const token = useSelector(selectToken);
  const [pendingWork, setPendingWork] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPendingWork();
  }, []);

  // Function to get all pending work orders from Api
  const getPendingWork = async () => {
    setLoading(true);
    const { data } = await pendingWorkOrders({
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPendingWork(data);
    setLoading(false);
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
    doc.text("Pending Work Orders Report", 15, initialTableY - 10);

    doc.autoTable({
      html: "#table",
      startY: initialTableY,
    });

    doc.save("Pending Work Orders.pdf");
    message.success("Report Generated Successfully"); 
  }

  return (
    <>
    <Card loading={loading} title="Pending Work Orders Report" style={{ margin: "15px" }}>
      {pendingWork.length === 0 ? (
        <p style={{ textAlign: "center" }}>No Pending Work Orders</p> 
      ) : (
        <>
          <table id="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Service Type</th>
                <th>Date Requested</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pendingWork.map((work) => (
                <tr key={work._id}>
                  <td>{work.title}</td>
                  <td>{work.serviceType}</td>
                  <td>{moment(work.Date_Created).format("DD/MM/YYYY, hh:mm a")}</td>
                  <td>{work.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        <Button style={{ 
            color: 'white', 
            backgroundColor: 'darkgreen', 
            border: 'none' 
          }} 
          onClick={exportPDF}
        >
          Generate Report
        </Button>
      </>
      )}
    </Card>
    </>
  )
}

export default PendingWork;