import Layout from "@/components/Layout";
import { useState } from "react";
import axios from "axios";
import { Card, DatePicker, Table } from "antd";

const WORK_URL = "/hin";

const DailyWork = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [workOrders, setWorkOrders] = useState([]);
    console.log("Daily Work:", workOrders);

    // Function to handle date selected
    const handleDateSelect = async (value) => {
        setSelectedDate(value)
        const formattedDate = value.format("YYYY-MM-DD")

        try {
            const res = await axios.get(`${WORK_URL}/work/created/date/${formattedDate}`);
            setWorkOrders(res.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    const columns = [
        {
            title: "Description",
            align: "center",
            responsive: ["md", "lg"],
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Priority",
            align: "center",
            responsive: ["md", "lg"],
            dataIndex: "priority",
            key: "priority"
        },
        {
            title: "Tracker",
            width: 150,
            align: "center",
            responsive: ["md", "lg"],
            dataIndex: "tracker",
            key: "tracker",
        },
        {
            title: "Service Type",
            fixed: "left",
            width: 150,
            align: "center",
            responsive: ["md", "lg"],
            dataIndex: "serviceType",
            key: "serviceType",
        },
    ]
  return (
    <Layout>
        <DatePicker value={selectedDate} onSelect={handleDateSelect} />

        <Card title="Daily Work Report" style={{ marginTop: "20px"  }}>
            <Table 
                columns={columns}
                dataSource={workOrders?.data || []}
                rowKey="_id"
                pagination={false}
            />
        </Card>
    </Layout>
  )
}

export default DailyWork