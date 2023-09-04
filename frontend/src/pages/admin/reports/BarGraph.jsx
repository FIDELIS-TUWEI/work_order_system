import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { getAllWorkOrders } from "../../../services/workApi";
import { Typography } from "antd";

const BarGraph = () => {
    const token = useSelector(selectToken);
    const [workOrders, setWorkOrders] = useState([]);

    // Function to get All work orders from API Service
    const allWork = async () => {
        const { data } = await getAllWorkOrders({
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setWorkOrders(data);
        console.log(data);
    }

    useEffect(() => {
        allWork();
    });

    // callback to store the chart instance
    const handleChartInstance = (instance) => {
        setChartInstance(instance);
    }

  return (
    <div>
        <Typography>Work Orders Assigned To Employees</Typography>
        
    </div>
  )
}

export default BarGraph