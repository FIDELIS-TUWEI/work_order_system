import axios from "axios";
import moment from "moment";
import { Card, Typography } from "antd";
import { useEffect, useState } from "react";
import LoadingBox from "../../../components/LoadingBox";

const WORK_URL = "/hin";


const InprogressWork = () => {
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
  return (
    <Card>
      <Typography>Pending Work Orders</Typography>
      <label>Filter By Status
        <select onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="In_Progress">In Progress</option>
          <option value="Complete">Completed</option>
        </select>
      </label>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
          <LoadingBox />
        </div>
      ) : (
        <>

          <table>
            <thead>
              <tr>
                <th>Assigned To</th>
                <th>Title</th>
                <th>Service Type</th>
                <th>Status</th>
                <th>Date Requested</th>
              </tr>
            </thead>
            <tbody>
              {workOrders.map((workOrder) => (
                <tr key={workOrder._id}>
                  <td>{workOrder.assignedTo}</td>
                  <td>{workOrder.title}</td>
                  <td>{workOrder.serviceType}</td>
                  <td>{workOrder.status}</td>
                  <td>{moment(workOrder.Date_Created).format("DD/MM/YYYY, hh:mm a")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
        )}
    </Card>
  )
};

export default InprogressWork;