import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { getAllWorkQuery } from "../../../services/workApi";
import { Card } from "antd";
import {  ResponsiveContainer, Tooltip, Legend, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

const BarGraph = () => {
    const token = useSelector(selectToken);
    const [workData, setWorkData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        allWork();
    }, []);

    // Function to get All work orders from API Service
    const allWork = async () => {
        setLoading(true);
        const { data } = await getAllWorkQuery({
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setWorkData(data);
        setLoading(false);
    }

    // Count the number of work assigned to each employee
    const workCounts = workData.reduce((counts, workOrder) => {
        const assignedTo = workOrder.assignedTo ? workOrder.assignedTo.firstName : "Unassigned";
        counts[assignedTo] = (counts[assignedTo] || 0) + 1;
        return counts;
    }, {});

    // Generate an Array of unique colors for each employee
    const uniqueColors = generateUniqueColors(Object.keys(workCounts).length);

    // Convert the workCounts object to an array of objects
    const workCountsArray = Object.entries(workCounts).map(([employee, count], index) => ({ employee, count, fill: uniqueColors[index] }));

    // Count the number of requested by each user
    const userCounts = workData.reduce((counts, workOrder) => {
        const requestedBy = workOrder.requestedBy.username;
        counts[requestedBy] = (counts[requestedBy] || 0) + 1;
        return counts;
    }, {});

    // Generate an Array of unique colors for each user
    const uniqueUserColors = generateUniqueColors(Object.keys(userCounts).length);

    // Convert the userCounts object to an array of objects
    const userCountsArray = Object.entries(userCounts).map(([user, count], index) => ({ user, count, fill: uniqueUserColors[index] }));

    // Count the number of work by status
    const workStatusCounts = workData.reduce((counts, workOrder) => {
      const status = workOrder.status;
      counts[status] = (counts[status] || 0) + 1;
      return counts;
    }, {});

    // generate unique colors for each status
    const uniqueStatusColors = generateUniqueColors(Object.keys(workStatusCounts).length);

    // Convert the workStatusCounts object to an array of objects
    const workStatusCountsArray = Object.entries(workStatusCounts).map(([status, count], index) => ({ status, count, fill: uniqueStatusColors[index] }));

    // Rest of the code...

  return (
    <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", margin: "15px 2px" }}>
        <Card title="Work Orders Assigned To Employees" style={{ flex: 1, margin: "6px" }} loading={loading}>
            <ResponsiveContainer width="100%" aspect={2}>
                <PieChart>
                    <Pie data={workCountsArray} dataKey="count" nameKey="employee" cx="50%" cy="50%" outerRadius={80} fill="#8884d8"  />
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Card>

        <Card title="Work Orders By Status" style={{ flex: 1, margin: "6px" }} loading={loading}>
            <ResponsiveContainer width="100%" aspect={2}>
                <PieChart>
                    <Pie data={workStatusCountsArray} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={80} fill="#8884d8"  />
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Card>

        <Card title="WorkOrders Requested By Users" style={{ flex: 1, margin: "10px" }} loading={loading}>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart>
                    <Line data={userCountsArray} dataKey="count" type='monotone' stroke="#8884d8" dot={{r:6}} activeDot={{r:8}} fill="#8884d8"  />
                    <XAxis dataKey="user" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Legend />
                </LineChart>
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