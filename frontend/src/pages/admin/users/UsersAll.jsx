import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useSelector } from "react-redux";
import { selectToken, selectUserInfo } from "../../../utils/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Table, Typography, Button } from "antd";
import axios from "axios";
import { getAllUsers } from "../../../services/usersApi";
const USERS_URL = "/hin";


const UsersAll = () => {
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


const getUsers = async () => {
  setLoading(true);
  let response = await getAllUsers({
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  setAllUsers(response.data);
  setLoading(false);
};

  useEffect(() => {
    getUsers();
  }, []);

  // antD table

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: () => {
        return (
          <div className="actions__btn">
            <Button onClick={() => {navigate(`/edit/user/${user._id}`)}}>Edit</Button>
            <Button danger>Delete</Button>
          </div>
        );
      }
    }
  ]

  return (
    <Layout>
      <Typography>Users</Typography>
      <div className="add-user">
        <Button type="primary" onClick={() => navigate("/users/register")}>Add User</Button>
      </div>
      <Table columns={columns} dataSource={allUsers} loading={loading} bordered rowKey={"_id"} />
    </Layout>
  )
}

export default UsersAll