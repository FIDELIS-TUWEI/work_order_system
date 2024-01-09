import PropTypes from "prop-types";
import { Card, Space, Statistic, Typography } from "antd";
import { MdGroups, MdOutlinePendingActions, MdOutlinePreview, MdOutlineWork } from "react-icons/md";
import { FaCheckCircle, FaHourglassHalf,  } from "react-icons/fa";
import { FaUsersLine } from "react-icons/fa6";
import { BiSolidUserCheck } from "react-icons/bi";

// Dashboard card
const DashboardCard = ({ title, value, icon }) => (
    <Card>
        <Space direction="horizontal">
            {icon}
            <Statistic title={title} value={value} />
        </Space>
    </Card>
);

DashboardCard.propTypes = {
    title: PropTypes.string,
    value: PropTypes.number,
    icon: PropTypes.element
}

const DashboardComponent = ({ user, pendingWorkCount, 
    inProgressCount, completedCount, reviewedCount, 
    totalWorkCount, totalUsersCount, activeUsersCount, employees 
}) => {

    // Conditional render for admin or superadmin
    const isAdmin = user &&(user.role === "admin" || user.role === "superadmin" || user.role === "supervisor");
    const isManager = user && (user.role === "hod" || user.role === "reviewer" || user.role === "engineer");

    // Render admin or superadmin card
    const renderAdminsCard = () => (
        <Space direction="horizontal">
            <DashboardCard 
                title={"Total Work Orders"} 
                value={totalWorkCount} 
                icon={
                    <MdOutlineWork size={32} color="grey" />
                }
            />

            <DashboardCard 
                title={"Pending Work Orders"}
                value={pendingWorkCount}
                icon={
                    <MdOutlinePendingActions size={32} color="orange" />
                }
            />

            <DashboardCard 
                title={"In Progress Work Orders"}
                value={inProgressCount}
                icon={
                    <FaHourglassHalf size={32} color="blue" />
                }
            />

            <DashboardCard 
                title={"Completed Work Orders"}
                value={completedCount}
                icon={
                    <FaCheckCircle size={32} color="green" />
                }
            />

            <DashboardCard 
                title={"Reviewed Work Orders"}
                value={reviewedCount}
                icon={
                    <MdOutlinePreview size={32} color="purple" />
                }
            />

            <DashboardCard 
                title={"Total Users"}
                value={totalUsersCount}
                icon={
                    <MdGroups size={32} color="brown" />
                }
            />

            <DashboardCard 
                title={"Active Users"}
                value={activeUsersCount}
                icon={
                    <BiSolidUserCheck size={32} color="violet" />
                }
            />

            <DashboardCard 
                title={"Total Employees"}
                value={employees}
                icon={
                    <FaUsersLine size={32} color="black" />
                }
            />
        </Space>
    );

    // Render Managers card
    const renderManagersCard = () => (
        <Space direction="horizontal">
            <DashboardCard 
                title={"Total Work Orders"} 
                value={totalWorkCount} 
                icon={
                    <MdOutlineWork size={32} color="grey" />
                }
            />

            <DashboardCard
                title={"Pending Work Orders"}
                value={pendingWorkCount}
                icon={
                    <MdOutlinePendingActions size={32} color="orange" />
                } 
            />

            <DashboardCard 
                title={"In Progress Work Orders"}
                value={inProgressCount}
                icon={
                    <FaHourglassHalf size={32} color="blue" />
                }
            />

            <DashboardCard 
                title={"Completed Work Orders"}
                value={completedCount}
                icon={
                    <FaCheckCircle size={32} color="green" />
                }
            />

            <DashboardCard 
                title={"Reviewed Work Orders"}
                value={reviewedCount}
                icon={
                    <MdOutlinePreview size={32} color="purple" />
                }
            />
        </Space>
    );

    // Render Users card
    const renderUsersCard = () => (
        <div>
            <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: '400', margin: '2rem' }}>
                The Ultimate Work Order Management System for the Holiday Inn.
            </Typography>
        </div>  
    )

    // Conditionally render custom card using switch case and user roles
    const renderCustomCard = () => {
        switch (true) {
            case isAdmin:
                return renderAdminsCard();
            case isManager:
                return renderManagersCard();
            default:
                return renderUsersCard();
        }
    } 
  return (
    <Space direction="vertical" size={20}>
        <Typography.Title level={4}>Dashboard Analytics</Typography.Title>
        {renderCustomCard()}
    </Space>
  )
};

DashboardComponent.propTypes = {
    user: PropTypes.object,
    pendingWorkCount: PropTypes.number,
    inProgressCount: PropTypes.number,
    completedCount: PropTypes.number,
    reviewedCount: PropTypes.number,
    totalWorkCount: PropTypes.number,
    totalUsersCount: PropTypes.number,
    activeUsersCount: PropTypes.number,
    employees: PropTypes.number
};

export default DashboardComponent;