import { useSelector } from "react-redux";
import Layout from "@/components/Layout";
import { selectUserInfo } from "@/features/auth/authSlice";
import DashboardComponent from "@/pages/dashboard/DashboardComponent";
import { useGetWorkCountByStatusQuery, useTotalReviewedWorkQuery, useTotalWorkCountQuery } from "@/features/reports/reportSlice";
import { useCountActiveUsersQuery, useCountAllUsersQuery } from "@/features/users/userSlice";
import { useCountAllEmployeesQuery } from "@/features/employees/employeeSlice";

const Dashboard = () => {
  const user = useSelector(selectUserInfo);
  const { data: reviewed } = useTotalReviewedWorkQuery();
  const { data: counts } = useGetWorkCountByStatusQuery();
  const { data: workTotal } = useTotalWorkCountQuery();
  const { data: totalUsers } = useCountAllUsersQuery();
  const { data: activeUsers } = useCountActiveUsersQuery();
  const { data: totalEmployees } = useCountAllEmployeesQuery();

  const pendingCount = counts?.data.pending;
  const inProgressCount = counts?.data.inProgress;
  const completedCount = counts?.data.completed;
  const reviewCount = reviewed?.data || {};
  const workCountData = workTotal?.data || {};
  const usersData = totalUsers?.data || {};
  const countActiveUsers = activeUsers?.data || {};
  const countEmployees = totalEmployees?.data || {};


  return (
    <Layout>
      <DashboardComponent 
        pendingCount={pendingCount}
        inProgressCount={inProgressCount}
        completedCount={completedCount}
        reviewedCount={reviewCount}
        workCountData={workCountData}
        user={user} 
        usersData={usersData}
        countActiveUsers={countActiveUsers}
        countEmployees={countEmployees}
      />
    </Layout>
  )
}

export default Dashboard;