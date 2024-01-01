import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, message } from "antd";
import {  ResponsiveContainer, Tooltip, Legend, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { queryWorkOrders, queryAllWork } from "../../../utils/redux/slices/queryWorkSlice";
import LoadingBox from "../../../components/LoadingBox";

const BarGraph = () => {
    const dispatch = useDispatch();
    const workData = useSelector(queryAllWork);
    const { isLoading, workOrders, error } = workData;

    // useEffect hook
    useEffect(() => {
        dispatch(queryWorkOrders());
    }, [dispatch]);

    if (isLoading) {
        return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <LoadingBox />
        </div>;
    };

    if (error) {
       return message.error(error);
    };

    // Check and ensure workOrders?.data is an array
    const workDataArray = workOrders?.data || [];

    // Count the number of work assigned to each employee
    const workCounts = workDataArray.reduce((counts, workOrder) => {
        const assignedTo = workOrder.assignedTo ? workOrder.assignedTo.firstName : "Unassigned";
        counts[assignedTo] = (counts[assignedTo] || 0) + 1;
        return counts;
    }, {});

    // Generate an Array of unique colors for each employee
    const uniqueColors = generateUniqueColors(Object.keys(workCounts).length);

    // Convert the workCounts object to an array of objects
    const workCountsArray = Object.entries(workCounts).map(([employee, count], index) => ({ employee, count, fill: uniqueColors[index] }));

    // Count the number of requested by each user
    const userCounts = workDataArray.reduce((counts, workOrder) => {
        const requestedBy = workOrder.requestedBy.firstName;
        counts[requestedBy] = (counts[requestedBy] || 0) + 1;
        return counts;
    }, {});

    // Generate an Array of unique colors for each user
    const uniqueUserColors = generateUniqueColors(Object.keys(userCounts).length);

    // Convert the userCounts object to an array of objects
    const userCountsArray = Object.entries(userCounts).map(([user, count], index) => ({ user, count, fill: uniqueUserColors[index] }));

    // Count the number of work by status
    const workStatusCounts = workDataArray.reduce((counts, workOrder) => {
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
    <div style={{ margin: "15px 2px" }}>
        <Row gutter={16}>
        <Col xs={24} md={12} lg={8}>
        <Card title="Work Orders Assigned To Employees" style={{ margin: "6px" }}>
            <ResponsiveContainer width="100%" aspect={1}>
                <PieChart>
                    <Pie data={workCountsArray} dataKey="count" nameKey="employee" cx="50%" cy="50%" outerRadius={80} fill="#8884d8"  />
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Card>
        </Col>

        <Col xs={24} md={12} lg={8}>
        <Card title="Work Orders By Status" style={{ margin: "6px" }}>
            <ResponsiveContainer width="100%" aspect={1}>
                <PieChart>
                    <Pie data={workStatusCountsArray} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={80} fill="#8884d8"  />
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Card>
        </Col>

        <Col xs={24} md={12} lg={8}>
        <Card title="WorkOrders Requested By Users" style={{ margin: "6px" }}>
            <ResponsiveContainer width="100%" aspect={1}>
                <LineChart>
                    <Line data={userCountsArray} dataKey="count" type='monotone' stroke="#8884d8" dot={{r:6}} activeDot={{r:8}} fill="#8884d8"  />
                    <XAxis dataKey="user" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#ccc" />
                    <Legend />
                </LineChart>
            </ResponsiveContainer>
        </Card>
        </Col>
        </Row>
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
    }

    return colors;
}

export default BarGraph;