import Layout from "@/components/Layout";
import { useState } from "react";
import axios from "axios";
import { DatePicker, Table } from "antd";

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
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Priority",
            align: "center",
            dataIndex: "priority",
            key: "priority"
        }
    ]
  return (
    <Layout>
        <DatePicker value={selectedDate} onSelect={handleDateSelect} />

        <Table 
            columns={columns}
            dataSource={workOrders?.data || []}
            rowKey="_id"
            pagination={false}
        />
    </Layout>
  )
}

export default DailyWork