import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { getAllWorkOrders } from "../../../services/workApi";
import { Card } from "antd";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie } from 'recharts';

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

    // Count the number of work assigned to each employee
    const workCounts = workOrders.reduce((counts, workOrder) => {
        const assignedTo = workOrder.assignedTo;
        counts[assignedTo] = (counts[assignedTo] || 0) + 1;
        return counts;
    }, {});

    // Array of colors
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // Create a mapping of employee names to colors
    const useColors = Object.keys(workCounts).reduce((colors, employee, index) => {
        colors[employee] = COLORS[index % COLORS.length];
        return colors;
    }, {});


    // Convert the workCounts object to an array of objects
    const workCountsArray = Object.entries(workCounts).map(([employee, count]) => ({ employee, count, fill: useColors[employee] }));

  return (
    <div>
        <Card title="Work Orders Assigned To Employees" style={{ margin: "15px 25px" }} loading={loading}>
            <ResponsiveContainer width="100%" aspect={3}>
                <PieChart>
                    <Pie data={workCountsArray} dataKey="count" nameKey="employee" cx="50%" cy="50%" outerRadius={80} fill="#8884d8"  />
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Card>
    </div>
  )
}

export default BarGraph;