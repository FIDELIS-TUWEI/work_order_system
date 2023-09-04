import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { getAllWorkOrders } from "../../../services/workApi";
import { Card } from "antd";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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

  return (
    <div>
        <Card title="Work Orders Assigned To Employees" style={{ margin: "15px 25px" }} loading={loading}>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart width={500} height={300} data={workOrders}>
                    <CartesianGrid />
                    <XAxis dataKey="assignedTo" interval={'preserveStartEnd'} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line dataKey="title" stroke="black" activeDot={{ r: 8 }} />
                    <Line dataKey="serviceType" stroke="red" activeDot={{ r: 8 }} />
                    <Line dataKey="status" stroke="green" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    </div>
  )
}

export default BarGraph;