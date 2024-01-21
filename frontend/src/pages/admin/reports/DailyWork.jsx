import Layout from "@/components/Layout";
import { useState } from "react";
import axios from "axios";
import AllDailyWork from "./AllDailyWork";

const WORK_URL = "/hin";

const DailyWork = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [workOrders, setWorkOrders] = useState([]);

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

  return (
    <Layout>
        <AllDailyWork 
            selectedDate={selectedDate}
            handleDateSelect={handleDateSelect}
            workOrders={workOrders}
        />
    </Layout>
  )
}

export default DailyWork;