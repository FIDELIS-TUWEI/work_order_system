import { useEffect, useState } from "react";
import Layout from "../components/Layout"
import { useGetUsersQuery } from "../utils/redux/slices/usersApiSlice";
import { useSelector } from "react-redux";
import { selectToken } from "../utils/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Table, Typography } from "antd";
import LoadingBox from "../components/LoadingBox";
import axios from "axios";

const UsersAll = () => {
  const token = useSelector(selectToken);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //const { data: users } = useGetUsersQuery();

const getUsers = async () => {
  try {
    const response = await axios.get("http://localhost:5000/hin/all-users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    setAllUsers(data);
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    getUsers();
  }, []);


  const data = [allUsers.map((user) => {
    return {
      key: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    };
  })]
  // antD table

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      align: "center",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      align: "center",
    },
    {
      title: "Username",
      dataIndex: "username",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
    }
  ]

  return (
    <Layout>
      <Typography>Users</Typography>
      <Table columns={columns} dataSource={data} rowKey="_id" />
    </Layout>
  )
}

export default UsersAll