import { useSelector } from "react-redux";
import Layout from "../../components/Layout"
import { selectToken, selectUserInfo } from "../../utils/redux/slices/authSlice";
import DashboardComponent from "../../components/DashboardComponent";
import { countCompletedWork, countInProgressWork, countPendingWork } from "../../services/reportApi";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const [pendingWorkCount, setPendingWorkCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  // Function to get work orders with pending status from API Service
  const getPendingWorkCount = async () => {
    const res = await countPendingWork({
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPendingWorkCount(res.countPending);
  }

  // Function to get work orders with In_Progress status from API Service
  const getInProgressWorkCount = async () => {
    const res = await countInProgressWork({
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setInProgressCount(res.countInProgress);
  }

  // Function to get work orders with completed status from API Service
  const getCompletedWorkCount = async () => {
    const res = await countCompletedWork({
      withCredentials: true,
      headers: {
        Authoization: `Bearer ${token}`,
      },
    });
    setCompletedCount(res.countCompleted);
  }

  useEffect(() => {
    getPendingWorkCount();
    getInProgressWorkCount();
    getCompletedWorkCount();
  }, []);

  return (
    <Layout>
      <DashboardComponent 
        user={user} 
        pendingWorkCount={pendingWorkCount}
        inProgressCount={inProgressCount}
        completedCount={completedCount}
      />
    </Layout>
  )
}

export default Dashboard;