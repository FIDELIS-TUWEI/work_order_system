import {useState, useEffect} from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { getAllWorkOrders } from "../../../services/workApi";

const BarGraph = () => {
    const token = useSelector(selectToken);
    const [workOrders, setWorkOrders] = useState();

    useEffect(() => {
        allWork();
    });

    // Function to get All work orders from API Service
    const allWork = async () => {
        const { data } = await getAllWorkOrders({
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setWorkOrders(data);
    }

    // Parse data for the chart
    const employeeData = {}

    workOrders.forEach((work) => {
        const { assignedTo } = work;

        if (employeeData[assignedTo]) {
            employeeData[assignedTo]++;
        } else {
            employeeData[assignedTo] = 1;
        }
    });

  return (
    <div>BarGraph</div>
  )
}

export default BarGraph