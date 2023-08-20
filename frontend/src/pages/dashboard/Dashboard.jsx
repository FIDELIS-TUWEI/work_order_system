import { useSelector } from "react-redux";
import Layout from "../../components/Layout"
import { Card, Typography } from "antd";
import { selectUserInfo } from "../../utils/redux/slices/authSlice";

const Dashboard = () => {
  const user = useSelector(selectUserInfo);

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Welcome {user && user.firstName}, {user && user.lastName}
        </Typography>
      <Card style={{ margin: "auto", width: "300px" }}>
        <Typography style={{ textAlign: 'center', fontSize: '1rem', fontWeight: 'bold' }}>
          The ultimate Work Order Management System
        </Typography>
      </Card>
      
    </Layout>
  )
}

export default Dashboard;