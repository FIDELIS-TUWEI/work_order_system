import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { getAllWorkOrders } from "../../../services/workApi";
import { Card, Typography } from "antd";
import { Bar } from "react-chartjs-2";

const BarGraph = () => {
    const token = useSelector(selectToken);
    const [workOrders, setWorkOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        allWork();
    }, []);

    // Function to get All work orders from API Service
    const allWork = async () => {
        setLoading(true);
        const { data } = await getAllWorkOrders({
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setWorkOrders(data);
        setLoading(false);
    }

    // Extract data for the bar graph
    const employeeWorkCounts = {};
    workOrders.forEach(workOrder => {
        const assignedTo = workOrder.assignedTo;

        if (employeeWorkCounts[assignedTo]) {
            employeeWorkCounts[assignedTo] = 1;
        } else {
            employeeWorkCounts[assignedTo] ++ ;
        }
    });

    // Prepare data for the bar graph
    const employeeNames = Object.keys(employeeWorkCounts);
    const workCounts = Object.values(employeeWorkCounts);

    const data = {
        labels: employeeNames,
        datasets: [{
            label: "Work Orders",
            data: workCounts,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }

  return (
    <div>
        <Card title="Work Orders Assigned To Employees" style={{ margin: "15px 25px" }} loading={loading}>
            <Bar 
                data={data}
                options={{
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Number of Work Orders'
                            },
                        },
                    },
                }}
            />
        </Card>
    </div>
  )
}

export default BarGraph