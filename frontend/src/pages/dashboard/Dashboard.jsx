import { useSelector } from "react-redux";
import Layout from "../../components/Layout"
import { Card, Typography } from "antd";
import { selectUserInfo } from "../../utils/redux/slices/authSlice";
import Logo from "../../assets/logo.png"

const Dashboard = () => {
  const user = useSelector(selectUserInfo);

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img style={{ marginTop: "20px" }} src={Logo} alt="Company Logo" />
      </div>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Welcome To Holiday Inn Nairobi
        </Typography>
      <Card style={{ margin: "auto", width: "300px" }}>
        <Typography style={{ textAlign: 'center', fontSize: '1rem', fontWeight: 'bold' }}>
          User: {user && user.firstName}, {user && user.lastName}
        </Typography>
        <Typography style={{ textAlign: 'center', fontSize: '1rem', fontWeight: 'bold' }}>
          Department: {user && user.department} 
        </Typography>
      </Card>
      
    </Layout>
  )
}

export default Dashboard;