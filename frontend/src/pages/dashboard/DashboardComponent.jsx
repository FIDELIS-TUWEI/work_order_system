import PropTypes from "prop-types";
import { Card, Col, Row, Space, Statistic, Typography } from "antd";
import { MdGroups, MdOutlinePendingActions, MdOutlineWork } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaUsersLine } from "react-icons/fa6";
import { BiSolidUserCheck, BiTask, BiTaskX } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { TbProgressCheck } from "react-icons/tb";
import { AiOutlineFileDone } from "react-icons/ai";
import { BsFillClipboard2XFill } from "react-icons/bs";

// Dashboard card
const DashboardCard = ({ title, value, icon, onClick }) => (
    <Card className="custom-card" hoverable onClick={onClick}>
        <Space direction="horizontal">
            {icon}
            <Statistic title={title} value={value} />
        </Space>
    </Card>
);

DashboardCard.propTypes = {
    title: PropTypes.string,
    value: PropTypes.number,
    icon: PropTypes.element,
    onClick: PropTypes.func
}

const DashboardComponent = ({ user, notAttendedCount, pendingCount, inAttendanceCount,
    inCompleteCount, attendedCount, completedCount, workCountData, 
    usersData, countActiveUsers, countEmployees 
}) => {
    const navigate = useNavigate();

    // Navigate function for Dashboard cards
    const navigateTotalWork = () => navigate('/work/list');
    const navigateToPendingWork = () => navigate('/work/list');
    const navigateToInAttendanceWork = () => navigate("/in-attendance/work");
    const navigateToInCompleteWork = () => navigate('/in-complete/work');
    const navigateToCompleteWork = () => navigate('/work/list');
    const navigateToUsers = () => navigate('/users/all');
    const navigateToActiveUsers = () => navigate('/users/all');
    const navigateToEmployees = () => navigate('/all/employees');


    // Conditional render for admin or superadmin
    const isAdmin = user &&(user.role === "admin" || user.role === "superadmin");
    const isManager = user && (user.role === "hod" || user.role === "reviewer" || user.role === "engineer" || user.role === "supervisor" || user?.role === "maintenance");

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
                    onClick={navigateTotalWork}
                />
            </Col>

            <Col span={8}>
                <DashboardCard 
                    title={"Not-attended Work"}
                    value={notAttendedCount}
                    icon={
                        <BiTaskX size={24} color="orange" />
                    }
                    onClick={navigateToPendingWork}
                />
            </Col>

            <Col span={8}>
                <DashboardCard 
                    title={"Pending Work"}
                    value={pendingCount}
                    icon={
                        <MdOutlinePendingActions size={24} color="red" />
                    }
                    onClick={navigateToPendingWork}
                />
            </Col>
            <Col span={8}>
                <DashboardCard 
                    title={"In-attendance Work"}
                    value={inAttendanceCount}
                    icon={
                        <TbProgressCheck  size={24} color="blue" />
                    }
                    onClick={navigateToInAttendanceWork}
                />
            </Col>
            <Col span={8}>
                <DashboardCard 
                    title={"In-complete Work"}
                    value={inCompleteCount}
                    icon={
                        <BsFillClipboard2XFill size={24} color="maroon" />
                    }
                    onClick={navigateToInCompleteWork}
                />
            </Col>
            <Col span={8}>
                <DashboardCard 
                    title={"Attended Work"}
                    value={attendedCount}
                    icon={
                        <BiTask size={24} color="green" />
                    }
                    onClick={navigateToPendingWork}
                />
            </Col>

            <Col span={8}>
                <DashboardCard 
                    title={"Completed Work"}
                    value={completedCount}
                    icon={
                        <AiOutlineFileDone size={24} color="green" />
                    }
                    onClick={navigateToCompleteWork}
                />
            </Col>

            <Col span={8}>
                <DashboardCard 
                    title={"Total Users"}
                    value={usersData}
                    icon={
                        <MdGroups size={24} color="brown" />
                    }
                    onClick={navigateToUsers}
                />
            </Col>

            <Col span={8}>
                <DashboardCard 
                    title={"Active Users"}
                    value={countActiveUsers}
                    icon={
                        <BiSolidUserCheck size={24} color="green" />
                    }
                    onClick={navigateToActiveUsers}
                />
            </Col>

            <Col span={8}>
                <DashboardCard 
                    title={"Total Employees"}
                    value={countEmployees}
                    icon={
                        <FaUsersLine size={24} color="black" />
                    }
                    onClick={navigateToEmployees}
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
                        onClick={navigateTotalWork}
                    />
                </Col>

                <Col span={8}>
                    <DashboardCard 
                        title={"Not-attended Work"}
                        value={notAttendedCount}
                        icon={
                            <BiTaskX size={24} color="orange" />
                        }
                        onClick={navigateToPendingWork}
                    />
                </Col>

                <Col span={8}>
                    <DashboardCard 
                        title={"Pending Work"}
                        value={pendingCount}
                        icon={
                            <MdOutlinePendingActions size={24} color="red" />
                        }
                        onClick={navigateToPendingWork}
                    />
                </Col>

                <Col span={8}>
                    <DashboardCard 
                        title={"In-attendance Work"}
                        value={inAttendanceCount}
                        icon={
                            <TbProgressCheck  size={24} color="blue" />
                        }
                        onClick={navigateToInAttendanceWork}
                    />
                </Col>

                <Col span={8}>
                    <DashboardCard 
                        title={"In-complete Work"}
                        value={inCompleteCount}
                        icon={
                            <BsFillClipboard2XFill size={24} color="maroon" />
                        }
                        onClick={navigateToInCompleteWork}
                    />
                </Col>

                <Col span={8}>
                    <DashboardCard 
                        title={"Attended Work"}
                        value={attendedCount}
                        icon={
                            <BiTask size={24} color="green" />
                        }
                        onClick={navigateToPendingWork}
                    />
                </Col>

                <Col span={8}>
                    <DashboardCard 
                        title={"Completed Work"}
                        value={completedCount}
                        icon={
                            <AiOutlineFileDone size={24} color="green" />
                        }
                        onClick={navigateToCompleteWork}
                    />
                </Col>
            </Row>
        </Space>
    );

    // Render Users card
    const renderUsersCard = () => (
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
                        title={"Completed Work"}
                        value={completedCount}
                        icon={
                            <FaCheckCircle size={24} color="green" />
                        }
                    />
                </Col>
            </Row>
        </Space> 
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
   <>
        <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>Dashboard Analytics</Typography>
        <Space direction="vertical" size={24}>
            {renderCustomCard()}
        </Space>
    </>
    
  )
};

DashboardComponent.propTypes = {
    user: PropTypes.object,
    notAttendedCount: PropTypes.number,
    pendingCount: PropTypes.number,
    inAttendanceCount: PropTypes.number,
    inCompleteCount: PropTypes.number,
    attendedCount: PropTypes.number,
    completedCount: PropTypes.number,
    workCountData: PropTypes.number,
    usersData: PropTypes.number,
    countActiveUsers: PropTypes.number,
    countEmployees: PropTypes.number
};

export default DashboardComponent;