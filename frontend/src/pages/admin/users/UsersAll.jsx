import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useSelector } from "react-redux";
import { selectToken, selectUserInfo } from "../../../utils/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Table, Typography, Button } from "antd";
import { getAllUsers } from "../../../services/usersApi";



const UsersAll = () => {
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    getUsers();
  }, []);

  // Function to get all users from Api
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
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>Users</Typography>
      <div className="add-btn">
        <Button type="primary" onClick={() => navigate("/users/register")}>Add User</Button>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td className="actions__btn">
                <Button onClick={() => {navigate(`/edit/user/${user._id}`)}}>Edit</Button>
                <Button danger>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default UsersAll