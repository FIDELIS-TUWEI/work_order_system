import PropTypes from "prop-types";
import { Card, Col, Row, Space, Statistic, Typography } from "antd";
import { MdGroups, MdOutlinePendingActions, MdOutlinePreview, MdOutlineWork } from "react-icons/md";
import { FaCheckCircle, FaHourglassHalf,  } from "react-icons/fa";
import { FaUsersLine } from "react-icons/fa6";
import { BiSolidUserCheck } from "react-icons/bi";

// Dashboard card
const DashboardCard = ({ title, value, icon }) => (
    <Card className="custom-card" hoverable>
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

const DashboardComponent = ({ user, pendingCount, 
    inProgressCount, completedCount, workCountData, reviewedCount, 
    usersData, countActiveUsers, countEmployees 
}) => {

    // Conditional render for admin or superadmin
    const isAdmin = user &&(user.role === "admin" || user.role === "superadmin" || user.role === "supervisor");
    const isManager = user && (user.role === "hod" || user.role === "reviewer" || user.role === "engineer");

    // Render admin or superadmin card
    const renderAdminsCard = () => (
        <Space direction="horizontal">
        <Row gutter={16}>

            <Col span={8}>
                <DashboardCard 
                    title={"Total Work"} 
                    value={workCountData} 
                    icon={
                        <MdOutlineWork size={24} color="grey" />
                    }
                />
            </Col>

            <Col span={8}>
                <DashboardCard 
                    title={"Pending Work"}
                    value={pendingCount}
                    icon={
                        <MdOutlinePendingActions size={24} color="orange" />
                    }
                />
            </Col>

            <Col span={8}>
                <DashboardCard 
                    title={"Progress Work"}
                    value={inProgressCount}
                    icon={
                        <FaHourglassHalf size={24} color="blue" />
                    }
                />
            </Col>

            <Col span={8}>
                <DashboardCard 
                    title={"Completed Work"}
                    value={completedCount}
                    icon={
                        <FaCheckCircle size={24} color="green" />
                    }
                />
            </Col>

            <Col span={8}>
                <DashboardCard 
                    title={"Reviewed Work"}
                    value={reviewedCount}
                    icon={
                        <MdOutlinePreview size={24} color="purple" />
                    }
                />
            </Col>

            <Col span={8}>
                <DashboardCard 
                    title={"Total Users"}
                    value={usersData}
                    icon={
                        <MdGroups size={24} color="brown" />
                    }
                />
            </Col>

            <Col span={8}>
            <DashboardCard 
                title={"Active Users"}
                value={countActiveUsers}
                icon={
                    <BiSolidUserCheck size={24} color="violet" />
                }
            />
            </Col>

            <Col span={8}>
            <DashboardCard 
                title={"Total Employees"}
                value={countEmployees}
                icon={
                    <FaUsersLine size={24} color="black" />
                }
            />
            </Col>
        </Row>
        </Space>
    );

    // Render Managers card
    const renderManagersCard = () => (
        <Space direction="horizontal">
            <Row gutter={16}>
                <Col span={8}>
                    <DashboardCard 
                        title={"Total Work"} 
                        value={workCountData} 
                        icon={
                            <MdOutlineWork size={24} color="grey" />
                        }
                    />
                </Col>

                <Col span={8}>
                    <DashboardCard
                        title={"Pending Work"}
                        value={pendingCount}
                        icon={
                            <MdOutlinePendingActions size={24} color="orange" />
                        } 
                    />
                </Col>

                <Col span={8}>
                    <DashboardCard 
                        title={"Progress Work"}
                        value={inProgressCount}
                        icon={
                            <FaHourglassHalf size={24} color="blue" />
                        }
                    />
                </Col>

                <Col span={8}>
                    <DashboardCard 
                        title={"Completed Work"}
                        value={completedCount}
                        icon={
                            <FaCheckCircle size={24} color="green" />
                        }
                    />
                </Col>

                <Col span={8}>
                    <DashboardCard 
                        title={"Reviewed Work"}
                        value={reviewedCount}
                        icon={
                            <MdOutlinePreview size={24} color="purple" />
                        }
                    />
                </Col>
            </Row>
        </Space>
    );

    // Render Users card
    const renderUsersCard = () => (
        <div>
            <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: '400', margin: '2rem' }}>
                Welcome to Holiday Inn Work Order Management System.
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
    <Space direction="vertical" size={24}>
        <Typography.Title level={4} style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>Dashboard</Typography.Title>
            {renderCustomCard()}
    </Space>
  )
};

DashboardComponent.propTypes = {
    user: PropTypes.object,
    pendingCount: PropTypes.number,
    inProgressCount: PropTypes.number,
    completedCount: PropTypes.number,
    workCountData: PropTypes.number,
    reviewedCount: PropTypes.number,
    usersData: PropTypes.number,
    countActiveUsers: PropTypes.number,
    countEmployees: PropTypes.number
};

export default DashboardComponent;