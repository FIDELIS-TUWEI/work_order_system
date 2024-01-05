import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useSelector } from "react-redux";
import { selectToken } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../../services/usersApi";
import AllUsers from "../../../components/AllUsers";
import { Typography, message } from "antd";


const UsersAll = () => {
  const token = useSelector(selectToken);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const navigate = useNavigate();

  // Function to get all users from Api
const getUsers = async () => {
  try {
    setLoading(true);
    const { data, pages } = await getAllUsers(page, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setAllUsers(data);
    setPages(pages);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    message.error("Failed to fetch users", error.message);
  }
};

useEffect(() => {
  getUsers();
}, [page]);

// function to handle page change
const handlePageChange = (newPage) => {
  setPage(newPage);
}

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>All Users</Typography>
      <AllUsers 
        allUsers={allUsers}
        loading={loading}
        page={page}
        pages={pages}
        handlePageChange={handlePageChange}
        navigate={navigate}
        getUsers={getUsers}
      />
    </Layout>
  )
}

export default UsersAll;