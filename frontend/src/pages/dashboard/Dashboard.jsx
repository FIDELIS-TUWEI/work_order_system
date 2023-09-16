import { useSelector } from "react-redux";
import Layout from "../../components/Layout"
import { selectToken, selectUserInfo } from "../../utils/redux/slices/authSlice";
import DashboardComponent from "../../components/DashboardComponent";
import { countPendingWork } from "../../services/reportApi";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const [pendingWorkCount, setPendingWorkCount] = useState(0);

  // Function to get work orders with pending status from API Service
  const getPendingWorkOrders = async () => {
    const res = await countPendingWork({
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPendingWorkCount(res.count);
  }

  useEffect(() => {
    getPendingWorkOrders();
  }, []);

  return (
    <Layout>
      <DashboardComponent user={user} pendingWorkCount={pendingWorkCount} />
    </Layout>
  )
}

export default Dashboard;