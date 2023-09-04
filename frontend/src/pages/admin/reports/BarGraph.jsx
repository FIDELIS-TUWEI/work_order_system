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
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        allWork();

        if (chartInstance) {
            chartInstance.destroy();
        }
    }, [chartInstance]);

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
        // Parse data for the chart
        const employeeData = {}

        workOrders.map((work) => {
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

        // Create chart and store the instance
        const ctx = document.getElementById("workChart");
        const newInstance = new Chart(ctx, {
            type: 'bar',
            data: chartData,
        })
        setChartInstance(newInstance)
    }, [workOrders]);

    

    

  return (
    <div>
        <Typography>Work Orders Assigned To Employees</Typography>
        <div style={{ width: "80%", margin: "0 auto" }}>
            <canvas id="workChart"></canvas>
        </div>
    </div>
  )
}

export default BarGraph