import { useEffect, useState } from "react";
import Layout from "../components/Layout"
//import { useGetUsersQuery } from "../utils/redux/slices/usersApiSlice";
import { useSelector } from "react-redux";
import { selectToken } from "../utils/redux/slices/authSlice";
//import { useNavigate } from "react-router-dom";
import { Table, Typography, Button } from "antd";
import axios from "axios";

const UsersAll = () => {
  const token = useSelector(selectToken);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  //const navigate = useNavigate();

  //const { data: users } = useGetUsersQuery();

const getUsers = async () => {
  try {
    setLoading(true);
    const response = await axios.get("http://localhost:5000/hin/all-users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    setAllUsers(data.data);
    setLoading(false);
  } catch (error) {
    console.error(error);
  }
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
      title: "Active",
      dataIndex: "active",
      renderCell: () => {
        return active ? true : false
      }
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
            <Button>Edit</Button>
            <Button danger>Delete</Button>
          </div>
        );
      }
    }
  ]

  return (
    <Layout>
      <Typography>Users</Typography>
      <Table columns={columns} dataSource={allUsers} bordered rowKey={"id"} />
    </Layout>
  )
}

export default UsersAll