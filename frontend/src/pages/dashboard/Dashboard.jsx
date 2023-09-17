import { useSelector } from "react-redux";
import Layout from "../../components/Layout"
import { selectToken, selectUserInfo } from "../../utils/redux/slices/authSlice";
import DashboardComponent from "../../components/DashboardComponent";
import { countCompletedWork, countInProgressWork, countPendingWork, countReviewedWork, countTotalWork } from "../../services/reportApi";
import { useEffect, useState } from "react";
import { countActiveUsers, countAllUsers } from "../../services/usersApi";

const Dashboard = () => {
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const [pendingWorkCount, setPendingWorkCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [totalWorkCount, setTotalWorkCount] = useState(0);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [activeUsersCount, setActiveUsersCount] = useState(0);

  // Function to get work orders with pending status from API Service
  const getPendingWorkCount = async () => {
    const res = await countPendingWork({
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPendingWorkCount(res.countPending);
  };

  // Function to get work orders with In_Progress status from API Service
  const getInProgressWorkCount = async () => {
    const res = await countInProgressWork({
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setInProgressCount(res.countInProgress);
  };

  // Function to get work orders with completed status from API Service
  const getCompletedWorkCount = async () => {
    const res = await countCompletedWork({
      withCredentials: true,
      headers: {
        Authoization: `Bearer ${token}`,
      },
    });
    setCompletedCount(res.countCompleted);
  };

  // Function to get work orders with reviewed status from API Service
  const getReviewedWorkCount = async () => {
    const res = await countReviewedWork({
      withCredentials: true,
      headers: {
        Authoization: `Bearer ${token}`,
      },
    });
    setReviewedCount(res.countReviewed);
  };

  // Function to get total work count
  const getTotalWorkCount = async () => {
    const res = await countTotalWork({
      withCredentials: true,
      headers: {
        Authoization: `Bearer ${token}`,
      },
    });
    setTotalWorkCount(res.totalWorkCount);
  };

  // Function to get Total users count
  const getTotalUsersCount = async () => {
    const res = await countAllUsers({
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTotalUsersCount(res.totalUsers);
  };

  // Function to get total active users
  const getTotalActiveUsers = async () => {
    const res = await countActiveUsers({
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setActiveUsersCount(res.activeUsersCount);
  }

  // UseEffect hook
  useEffect(() => {
    getPendingWorkCount();
    getInProgressWorkCount();
    getCompletedWorkCount();
    getReviewedWorkCount();
    getTotalWorkCount();
    getTotalUsersCount();
    getTotalActiveUsers();
  }, []);

  return (
    <Layout>
      <DashboardComponent 
        user={user} 
        pendingWorkCount={pendingWorkCount}
        inProgressCount={inProgressCount}
        completedCount={completedCount}
        reviewedCount={reviewedCount}
        totalWorkCount={totalWorkCount}
        totalUsersCount={totalUsersCount}
        activeUsersCount={activeUsersCount}
      />
    </Layout>
  )
}

export default Dashboard;