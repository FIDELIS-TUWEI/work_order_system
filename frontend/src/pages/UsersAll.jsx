import { useEffect, useState } from "react";
import Layout from "../components/Layout"
//import { useGetUsersQuery } from "../utils/redux/slices/usersApiSlice";
import { useSelector } from "react-redux";
import { selectToken } from "../utils/redux/slices/authSlice";
//import { useNavigate } from "react-router-dom";
import { Table, Typography } from "antd";
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
    setAllUsers(data);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    getUsers();
  }, []);

  const users = allUsers;
  console.log(users);

  // antD table

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        <span>{record.firstName} {record.lastName}</span>
      }
    }
  ]

  return (
    <Layout>
      <Typography>Users</Typography>
      {users.length > 0 && (
        <Table columns={columns} dataSource={users} />
      )}
      {loading && <p>Loading...</p>}
    </Layout>
  )
}

export default UsersAll