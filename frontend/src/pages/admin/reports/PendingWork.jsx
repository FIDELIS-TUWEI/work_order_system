import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { pendingWorkOrders } from "../../../services/reportsApi";
import { useEffect, useRef, useState } from "react";
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

    doc.setFontSize(12);
    doc.text("Pending Work Orders", 20, 10);

    doc.autoTable({
      html: "#table",
    });

    doc.save("Pending Work Orders.pdf");
  }

  return (
    <>
    <Card loading={loading} title="Pending Work Orders" style={{ margin: "15px" }}>
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
      <Button onClick={exportPDF}>Generate Report</Button>
    </Card>
    </>
  )
}

export default PendingWork;