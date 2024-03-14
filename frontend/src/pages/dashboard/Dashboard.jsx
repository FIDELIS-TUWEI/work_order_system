import { useSelector } from "react-redux";
import Layout from "@/components/Layout";
import { selectUserInfo } from "@/features/auth/authSlice";
import DashboardComponent from "@/pages/dashboard/DashboardComponent";
import { useCountWorkTrackerQuery, useGetWorkCountByStatusQuery, useTotalReviewedWorkQuery, useTotalWorkCountQuery } from "@/features/reports/reportSlice";
import { useCountActiveUsersQuery, useCountAllUsersQuery } from "@/features/users/userSlice";
import { useCountAllEmployeesQuery } from "@/features/employees/employeeSlice";
import { useState } from "react";
import { Button, Modal } from "antd";

const MaintenanceNotification = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <Modal 
      open={isOpen}
      onOk={closeModal}
      title="Maintenance Notification"
      okButtonProps={{ style: { backgroundColor: 'green', border: 'none' } }}
    >
      <h2>Scheduled System Maintenance</h2>
      <p>
        A System maintenance is scheduled to happen from Saturday 6 pm to Sunday 10 pm. Some services will be unavailable during this time. Please complete all work orders before 12 pm Saturday.
      </p>
    </Modal>
  );
}

const Dashboard = () => {
  const user = useSelector(selectUserInfo);
  const { data: reviewed } = useTotalReviewedWorkQuery();
  const { data: counts } = useGetWorkCountByStatusQuery();
  const { data: workTotal } = useTotalWorkCountQuery();
  const { data: trackerCounts } = useCountWorkTrackerQuery();
  const { data: totalUsers } = useCountAllUsersQuery();
  const { data: activeUsers } = useCountActiveUsersQuery();
  const { data: totalEmployees } = useCountAllEmployeesQuery();

  const notAttendedCount = trackerCounts?.data.not_attended || [];
  const pendingCount = counts?.data.pending || [];
  const inAttendanceCount = trackerCounts?.data.in_attendance || [];
  const inCompleteCount = trackerCounts?.data.in_complete || [];
  const attendedCount = trackerCounts?.data.attended || [];
  const completedCount = counts?.data.completed || [];
  const reviewCount = reviewed?.data || [];
  const workCountData = workTotal?.data || [];
  const usersData = totalUsers?.data || [];
  const countActiveUsers = activeUsers?.data || [];
  const countEmployees = totalEmployees?.data || [];

  return (
    <Layout>
      <MaintenanceNotification />
      <DashboardComponent 
        notAttendedCount={notAttendedCount}
        pendingCount={pendingCount}
        inAttendanceCount={inAttendanceCount}
        inCompleteCount={inCompleteCount}
        attendedCount={attendedCount}
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