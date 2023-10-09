import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { getAllWorkOrders } from "../../../services/workApi";
import { Card } from "antd";
import {  ResponsiveContainer, Tooltip, Legend, PieChart, Pie } from 'recharts';

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

    // Generate an Array of unique colors for each employee
    const uniqueColors = generateUniqueColors(Object.keys(workCounts).length);

    // Convert the workCounts object to an array of objects
    const workCountsArray = Object.entries(workCounts).map(([employee, count], index) => ({ employee, count, fill: uniqueColors[index] }));

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
};

// Function to generate an array of unique colors
const generateUniqueColors = (count) => {
    const colors = [];
    const hueStep = 360 / count;

    for (let i = 0; i < count; i++) {
        const hue = i * hueStep;
        const color = `hsl(${hue}, 70%, 50%)`;
        colors.push(color);
    };

    return colors;
}

export default BarGraph;