import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { getAllWorkOrders } from "../../../services/workApi";
import { Typography } from "antd";
import Chart from "chart.js/auto";

const BarGraph = () => {
    const token = useSelector(selectToken);
    const [workOrders, setWorkOrders] = useState([]);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        allWork();
    }, []);

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
        // check if chart instance exists and destroy it
        if (chartInstance) {
            chartInstance.destroy();
        }

        // create a chart using chart.js
        if (workOrders.length > 0) {
            const labels = workOrders.map((workOrder) => {
                return workOrder.date;
            });
            const data = {
                workOrders: workOrders.map((workOrder) => {
                    return workOrder.total;
                })
            }
            const ctx = document.getElementById('myChart').getContext("2d");

            const newChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Work Orders',
                        data: data,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    ],
                },
                
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        },
                    },
                },
            });

            // set chart instance
            setChartInstance(newChartInstance);
        }
    }, [workOrders]);

  return (
    <div>
        <Typography>Work Orders Assigned To Employees</Typography>
        <canvas id="myChart" width="400" height="200"></canvas>
    </div>
  )
}

export default BarGraph