import { useEffect } from "react";
import Layout from "../components/Layout"
import { useGetUsersQuery } from "../utils/redux/slices/usersApiSlice";
import { useSelector } from "react-redux";
import { selectToken } from "../utils/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";

const UsersAll = () => {
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const { data: users } = useGetUsersQuery();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }                                                           
  }, [token, navigate]);
  

  return (
    <Layout>
      <Typography>Users</Typography>
    </Layout>
  )
}

export default UsersAll