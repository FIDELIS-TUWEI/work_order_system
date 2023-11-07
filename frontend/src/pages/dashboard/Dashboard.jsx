import { useSelector } from "react-redux";
import Layout from "../../components/Layout"
import { selectToken, selectUserInfo } from "../../utils/redux/slices/authSlice";
import DashboardComponent from "../../components/DashboardComponent";
import { countCompletedWork, countInProgressWork, countPendingWork, countReviewedWork, countTotalWork } from "../../services/reportApi";
import { useEffect, useState } from "react";
import { countActiveUsers, countAllUsers } from "../../services/usersApi";
import { countAllEmployees } from "../../services/employeeApi";
import { message } from "antd";

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
  const [employees, setEmployees] = useState(0);

  // Function to get work orders with pending status from API Service
  const getPendingWorkCount = async () => {
    try {
      const res = await countPendingWork({
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPendingWorkCount(res.countPending);
    } catch (error) {
      message.error("Error while fetching pending work count", error.message);
    }
  };

  // Function to get work orders with In_Progress status from API Service
  const getInProgressWorkCount = async () => {
    try {
      const res = await countInProgressWork({
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInProgressCount(res.countInProgress);
    } catch (error) {
      message.error("Error while fetching in progress work count", error.message);
    }
  };

  // Function to get work orders with completed status from API Service
  const getCompletedWorkCount = async () => {
    try {
      const res = await countCompletedWork({
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCompletedCount(res.countCompleted);
    } catch (error) {
      message.error("Error while fetching completed work count", error.message);
    }
  };

  // Function to get work orders with reviewed status from API Service
  const getReviewedWorkCount = async () => {
    try {
      const res = await countReviewedWork({
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReviewedCount(res.countReviewed);
    } catch (error) {
      message.error("Error while fetching reviewed work count", error.message);
    }
  };

  // Function to get total work count
  const getTotalWorkCount = async () => {
    try {
      const res = await countTotalWork({
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalWorkCount(res.countTotal);
    } catch (error) {
      message.error("Error while fetching total work count", error.message);
    }
  };

  // Function to get Total users count
  const getTotalUsersCount = async () => {
    try {
      const res = await countAllUsers({
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalUsersCount(res.totalUsersCount);
    } catch (error) {
      message.error("Error while fetching total users count", error.message);
    }
  };

  // Function to get total active users
  const getTotalActiveUsers = async () => {
    try {
      const res = await countActiveUsers({
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setActiveUsersCount(res.activeUsersCount);
    } catch (error) {
      message.error("Error while fetching total active users count", error.message);
    }
  };

  // Function to count all employees
  const getAllEmployees = async () => {
    try {
      const res = await countAllEmployees({
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(res.employeesCount);
    } catch (error) {
      message.error("Error while fetching total employees count", error.message);
    }
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
    getAllEmployees();
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
        employees={employees}
      />
    </Layout>
  )
}

export default Dashboard;