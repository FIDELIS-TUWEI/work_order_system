import { Typography } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import axios from "axios";
const WORK_URL = "/hin";


const InprogressWork = () => {
  const token = useSelector(selectToken);
  const [workOrders, setWorkOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    async function getWorkOrders() {
      try {
        const res = await axios.get(`${WORK_URL}/work?status=${filterStatus}`);
        const data = res.data;
        setWorkOrders(data);
      } catch (error) {
        console.log("Error while fetching all work orders by status query", error);
      }
    }

    getWorkOrders();
  }, [filterStatus]);
  return (
    <div>
      <Typography>Pending Work Orders</Typography>
      <label>Filter By Status
        <select onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="In_Progress">In Progress</option>
          <option value="Complete">Completed</option>
        </select>
      </label>

      <table>
        <thead>
          <tr>
            <th>Assigned To</th>
            <th>Title</th>
            <th>Service Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {workOrders.map((workOrder) => (
            <tr key={workOrder._id}>
              <td>{workOrder.assignedTo}</td>
              <td>{workOrder.title}</td>
              <td>{workOrder.serviceType}</td>
              <td>{workOrder.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default InprogressWork;