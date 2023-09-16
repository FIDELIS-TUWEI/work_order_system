import { useSelector } from "react-redux";
import Layout from "../../components/Layout"
import { selectUserInfo } from "../../utils/redux/slices/authSlice";
import DashboardComponent from "../../components/DashboardComponent";

const Dashboard = () => {
  const user = useSelector(selectUserInfo);

  return (
    <Layout>
      <DashboardComponent user={user} />
    </Layout>
  )
}

export default Dashboard;