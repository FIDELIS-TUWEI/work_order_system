import { useSelector } from "react-redux";
import Layout from "../../components/Layout"
import { Card, Col, Row } from "antd";
import { selectUserInfo } from "../../utils/redux/slices/authSlice";

const Dashboard = () => {
  const user = useSelector(selectUserInfo);

  return (
    <Layout>
      <Row gutter={16} >
        {
          user && user.role === "admin" || user && user.role === "superadmin" ? (
            <>
            <Col span={8}>
              <Card title="Total Work Orders" bordered={false}>
                4
              </Card>
            </Col>

            <Col span={8}>
              <Card title="Total Users" bordered={false}>
                6
              </Card>
            </Col>

            <Col span={8}>
                <Card title="Pending Work Orders" bordered={false}>
                  2
                </Card>
              </Col>

              <Col span={8}>
                <Card title="In Progress Work Orders" bordered={false}>
                  1
                </Card>
              </Col>

              <Col span={8}>
                <Card title="Completed Work Orders" bordered={false}>
                  2
                </Card>
              </Col>
            </>
          ) : (
            <>
              <Col span={8}>
                <Card title="Pending Work Orders" bordered={false}>
                  2
                </Card>
              </Col>

              <Col span={8}>
                <Card title="In Progress Work Orders" bordered={false}>
                  1
                </Card>
              </Col>

              <Col span={8}>
                <Card title="Completed Work Orders" bordered={false}>
                  2
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