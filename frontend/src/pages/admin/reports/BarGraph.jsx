import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { getAllWorkOrders } from "../../../services/workApi";
import { Card } from "antd";

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
        </Card>
    </div>
  )
}

export default BarGraph