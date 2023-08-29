import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { pendingWorkOrders } from "../../../services/reportsApi";
import { useEffect, useRef, useState } from "react";
import { Button, Card } from "antd";
import { useReactToPrint } from "react-to-print";

const PendingWork = () => {
  const token = useSelector(selectToken);
  const [pendingWork, setPendingWork] = useState([]);
  const [loading, setLoading] = useState(false);
  const componentPDF = useRef();

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

  // Function to print report
  const printReport = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Pending Work Orders",
    onAfterPrint: () => {
      alert("Report Generated Successfully");
    }
  })

  return (
    <>
    <Card loading={loading} title="Pending Work Orders" style={{ margin: "15px" }}>
      <div ref={componentPDF} style={{ width: "100%" }}>
        <table>
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
                <td>{work.Date_Created}</td>
                <td>{work.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button onClick={printReport}>Generate Report</Button>
    </Card>
    </>
  )
}

export default PendingWork;