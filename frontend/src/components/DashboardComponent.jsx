import { Card, Col, Row, Typography } from "antd";


const DashboardComponent = ({ user, pendingWorkCount, inProgressCount, completedCount }) => {
  return (
    <>
        <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
            System Analytics
        </Typography>
        <Row gutter={16} style={{ marginTop: '20px' }}>
            {
            user && user.role === "admin" || user && user.role === "superadmin" ? (
                <>
                <Col span={8}>
                    <Card title="Total Work Orders" bordered={false} style={{ marginBottom: '16px'}} className="custom-card">
                        4
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
                    0
                    </Card>
                </Col>

                <Col span={8} style={{ marginBottom: '16px'}}>
                <Card title="Total Users" bordered={false} className="custom-card">
                    6
                </Card>
                </Col>

                <Col span={8}>
                <Card title="Active Users" bordered={false} className="custom-card">
                    6
                </Card>
                </Col>
                </>
            ) : (
                <>
                <Col span={8}>
                    <Card title="Pending Work Orders" bordered={false} style={{ marginBottom: '16px'}} className="custom-card">
                    2
                    </Card>
                </Col>

                <Col span={8}>
                    <Card title="In Progress Work Orders" bordered={false} className="custom-card">
                    1
                    </Card>
                </Col>

                <Col span={8}>
                    <Card title="Completed Work Orders" bordered={false} className="custom-card">
                    2
                    </Card>
                </Col>

                <Col span={8}>
                    <Card title="Reviewed Work Orders" bordered={false} className="custom-card">
                    0
                    </Card>
                </Col>
                </>
            )
            }
        </Row>
    </>
  )
}

export default DashboardComponent