import { useSelector } from "react-redux";
import Layout from "../../components/Layout"
import { Card, Col, Row, Typography } from "antd";
import { selectUserInfo } from "../../utils/redux/slices/authSlice";

const Dashboard = () => {
  const user = useSelector(selectUserInfo);

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
        System Analytics
      </Typography>
      <Row gutter={16} style={{ marginTop: '30px' }}>
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
    </Layout>
  )
}

export default Dashboard;