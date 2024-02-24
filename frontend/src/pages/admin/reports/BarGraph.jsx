import PropTypes from "prop-types";
import { Card, Col, Row, message, Typography } from "antd";
import {  ResponsiveContainer, Tooltip, Legend, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import LoadingBox from "@/components/LoadingBox";

const BarGraph = ({ workDataArray, loading, error }) => {
    // Conditional statements to check fetching data and handle errors
    if (loading) {
        return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <LoadingBox />
        </div>;
    };

    if (error) {
        return message.error("Error Occured loading data");
    };

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

    // Map status to colors
    const statusColors = new Map([
      ["Pending", "red"],
      ["Complete", "green"],
    ])
    // Convert the workStatusCounts object to an array of objects
    const workStatusCountsArray = Object.entries(workStatusCounts).map(([status, count]) => ({ 
        status, 
        count, 
        fill: statusColors.get(status) || "#8884d8"
    }));

    // Count work by priority
    const workPriorityCounts = workDataArray.reduce((counts, workOrder) => {
      const priority = workOrder.priority;
      counts[priority] = (counts[priority] || 0) + 1;
      return counts;
    }, {});

    // Map priority to colors
    const priorityColors = new Map([
      ["Urgent", "red"],
      ["Normal", "green"],
    ])
    // Convert the workPriorityCounts object to an array of objects
    const workPriorityCountsArray = Object.entries(workPriorityCounts).map(([priority, count]) => ({ 
        priority, 
        count, 
        fill: priorityColors.get(priority) || "#8884d8"
    }));

  return (
    <>
        <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Work Order Analytics
        </Typography>
        <div style={{ margin: "15px 2px" }}>
            <Row gutter={16}>
            <Col xs={24} md={12} lg={8}>
            <Card title="Work Assigned" style={{ margin: "auto" }}>
                <ResponsiveContainer width="100%" aspect={1}>
                    <PieChart>
                        <Pie 
                            data={workCountsArray} 
                            dataKey="count" 
                            nameKey="employee" 
                            cx="50%" 
                            cy="50%" 
                            innerRadius={60}
                            outerRadius={80} 
                            paddingAngle={5}
                            fill="#8884d8"  
                        />
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </Card>
            </Col>

            <Col xs={24} md={12} lg={8}>
            <Card title="Work Status" style={{ margin: "6px" }}>
                <ResponsiveContainer width="100%" aspect={1}>
                    <PieChart>
                        <Pie 
                            data={workStatusCountsArray} 
                            dataKey="count" 
                            nameKey="status" 
                            cx="50%" 
                            cy="50%"
                            startAngle={180}
                            endAngle={0} 
                            innerRadius={50}
                            outerRadius={70} 
                            paddingAngle={5}
                            fill={(entry) => entry.data.fill}  
                        />
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </Card>
            </Col>

            <Col xs={24} md={12} lg={8}>
            <Card title="Work Priority" style={{ margin: "6px" }}>
                <ResponsiveContainer width="100%" aspect={1}>
                    <PieChart>
                        <Pie
                            data={workPriorityCountsArray}
                            dataKey="count"
                            nameKey="priority"
                            cx="50%"
                            cy="50%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius={50}
                            outerRadius={70}
                            paddingAngle={5}
                            fill={(entry) => entry.data.fill}
                        />
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </Card>
            </Col> 

            <Col>
            <Card title="Work Requested" style={{ margin: "6px" }}>
                <ResponsiveContainer width="100%" minWidth={700} aspect={1}>
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
    </>
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
};

BarGraph.propTypes = {
    workDataArray: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.object
};

export default BarGraph;