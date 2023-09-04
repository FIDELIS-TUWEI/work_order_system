import {useState, useEffect} from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { getAllWorkOrders } from "../../../services/workApi";
import { Typography } from "antd";

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

    const labels = Object.keys(employeeData);
    const data = Object.values(employeeData);

    // Chartjs Configuration
    const chartData = {
        labels,
        datasets: [
            {
                label: "Work Orders Assigned",
                data,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

  return (
    <div>
        <Typography>Work Orders Assigned To Employees</Typography>
        <div style={{ width: "80%", margin: "0 auto" }}>
            <Bar data={chartData} />
        </div>
    </div>
  )
}

export default BarGraph