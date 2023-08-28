import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { pendingWorkOrders } from "../../../services/reportsApi";
import { useEffect, useState } from "react";
import { Card } from "antd";

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
  }

  return (
    <>
    <Card loading={loading} title="Pending Work Orders" style={{ margin: "15px" }}>

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
    </Card>
    </>
  )
}

export default PendingWork;