import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { getAllWorkOrders } from "../../../services/workApi";
import { Card } from "antd";
import { Bar, Line } from "react-chartjs-2";

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
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    }

  return (
    <div>
        <Card title="Work Orders Assigned To Employees" style={{ margin: "15px 25px" }} loading={loading}>
            <Line data={data} />
        </Card>
    </div>
  )
}

export default BarGraph