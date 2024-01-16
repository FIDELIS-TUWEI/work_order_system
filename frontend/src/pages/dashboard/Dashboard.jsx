import { useSelector } from "react-redux";
import Layout from "@/components/Layout";
import { selectToken, selectUserInfo } from "@/features/auth/authSlice";
import DashboardComponent from "@/pages/dashboard/DashboardComponent";
import { useCallback, useEffect, useState } from "react";
import { countActiveUsers, countAllUsers } from "../../services/usersApi";
import { countAllEmployees } from "../../services/employeeApi";
import { message } from "antd";
import { useGetWorkCountByStatusQuery, useTotalReviewedWorkQuery, useTotalWorkCountQuery } from "@/features/reports/reportSlice";

const Dashboard = () => {
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [employees, setEmployees] = useState(0);
  const { data: reviewed } = useTotalReviewedWorkQuery();
  const { data: counts } = useGetWorkCountByStatusQuery();
  const { data: workTotal } = useTotalWorkCountQuery()

  const pendingCount = counts?.data.pending;
  const inProgressCount = counts?.data.inProgress;
  const completedCount = counts?.data.completed;
  const reviewCount = reviewed?.data || {};
  const workCountData = workTotal?.data || {};

  // Function to get Total users count
  const getTotalUsersCount = useCallback (async () => {
    try {
      const res = await countAllUsers({
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalUsersCount(res.data);
    } catch (error) {
      message.error("Error while fetching total users count", error.message);
    }
  });

  // Function to get total active users
  const getTotalActiveUsers = useCallback (async () => {
    try {
      const res = await countActiveUsers({
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setActiveUsersCount(res.data);
    } catch (error) {
      message.error("Error while fetching total active users count", error.message);
    }
  })

  // Function to count all employees
  const getAllEmployees = useCallback (async () => {
    try {
      const res = await countAllEmployees({
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(res.data);
    } catch (error) {
      message.error("Error while fetching total employees count", error.message);
    }
  });

  // UseEffect hook
  useEffect(() => {
    getTotalUsersCount();
    getTotalActiveUsers();
    getAllEmployees();
  }, [ getTotalUsersCount, getTotalActiveUsers, getAllEmployees]);

  return (
    <Layout>
      <DashboardComponent 
        pendingCount={pendingCount}
        inProgressCount={inProgressCount}
        completedCount={completedCount}
        reviewedCount={reviewCount}
        workCountData={workCountData}
        user={user} 
        totalUsersCount={totalUsersCount}
        activeUsersCount={activeUsersCount}
        employees={employees}
      />
    </Layout>
  )
}

export default Dashboard;