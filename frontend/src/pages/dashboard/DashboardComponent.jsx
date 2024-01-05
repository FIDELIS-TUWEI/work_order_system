import PropTypes from "prop-types";
import { Card, Col, Row, Typography } from "antd";

const DashboardComponent = ({ user, pendingWorkCount, 
    inProgressCount, completedCount, reviewedCount, 
    totalWorkCount, totalUsersCount, activeUsersCount, employees 
}) => {

    // Conditional render for admin or superadmin
    const isAdmin = user &&(user.role === "admin" || user.role === "superadmin" || user.role === "supervisor");
    const isManager = user && (user.role === "hod" || user.role === "reviewer" || user.role === "engineer");

    // Render admin or superadmin card
    const renderAdminsCard = () => (
        <>
            <Col span={8}>
                <Card title="Total Work Orders" bordered={false} className="custom-card">
                    {totalWorkCount}
                </Card>
            </Col>

            <Col span={8}>
                <Card title="Pending Work Orders" bordered={false} className="custom-card">
                    {pendingWorkCount}
                </Card>
            </Col>

            <Col span={8}>
                <Card title="In Progress Work Orders" bordered={false} className="custom-card">
                    {inProgressCount}
                </Card>
            </Col>

            <Col span={8}>
                <Card title="Completed Work Orders" bordered={false} className="custom-card">
                    {completedCount}
                </Card>
            </Col>

            <Col span={8}>
                <Card title="Reviewed Work Orders" bordered={false} className="custom-card">
                    {reviewedCount}
                </Card>
            </Col>

            <Col span={8}>
                <Card title="Total Users" bordered={false} className="custom-card">
                    {totalUsersCount}
                </Card>
            </Col>

            <Col span={8}>
                <Card title="Active Users" bordered={false} className="custom-card">
                    {activeUsersCount}
                </Card>
            </Col>

            <Col span={8}>
                <Card title="Total Employees" bordered={false} className="custom-card">
                    {employees}
                </Card>
            </Col>
        </>
    );

    // Render Managers card
    const renderManagersCard = () => (
        <>
            <Col span={8}>
                <Card title="Total Work Orders" bordered={false} className="custom-card">
                    {totalWorkCount}
                </Card>
            </Col>
            
            <Col span={8}>
                <Card title="Pending Work Orders" bordered={false} className="custom-card">
                    {pendingWorkCount}
                </Card>
            </Col>

            <Col span={8}>
                <Card title="In Progress Work Orders" bordered={false} className="custom-card">
                    {inProgressCount}
                </Card>
            </Col>

            <Col span={8}>
                <Card title="Completed Work Orders" bordered={false} className="custom-card">
                    {completedCount}
                </Card>
            </Col>

            <Col span={8}>
                <Card title="Reviewed Work Orders" bordered={false} className="custom-card">
                    {reviewedCount}
                </Card>
            </Col>
        </>
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
    <>
        <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
            System Analytics
        </Typography>
        <Row gutter={16}>
            {renderCustomCard()}
        </Row>
    </>
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