import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../../services/usersApi";
import AllUsers from "../../../components/AllUsers";


const UsersAll = () => {
  const token = useSelector(selectToken);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const navigate = useNavigate();

  // Function to get all users from Api
const getUsers = async () => {
  setLoading(true);
  const { data, pages, count } = await getAllUsers(page, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  setAllUsers(data);
  setPages(pages);
  setLoading(false);
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
      <AllUsers 
        allUsers={allUsers}
        loading={loading}
        page={page}
        pages={pages}
        handlePageChange={handlePageChange}
        navigate={navigate}
      />
    </Layout>
  )
}

export default UsersAll