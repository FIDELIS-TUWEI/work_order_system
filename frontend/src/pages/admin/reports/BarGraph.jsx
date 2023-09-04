import {useState, useEffect} from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { getAllWorkOrders } from "../../../services/workApi";
import { Typography } from "antd";
import { Chart } from "chart.js";

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

        // Process the data to create the chart dataset
        
    });

  return (
    <div>
        <Typography>Work Orders Assigned To Employees</Typography>
        <div style={{ width: "80%", margin: "0 auto" }}>
        </div>
    </div>
  )
}

export default BarGraph