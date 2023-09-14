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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    getUsers();
  }, [currentPage]);

  // Function to get all users from Api
const getUsers = async () => {
  setLoading(true);
  const { data, pages } = await getAllUsers(currentPage, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  setAllUsers(data);
  setTotalPages(pages);
  setLoading(false);
};

// function to handle page change
const handlePageChange = (newPage) => {
  setCurrentPage(newPage);
}

  return (
    <Layout>
      <AllUsers 
        allUsers={allUsers}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        navigate={navigate}
      />
    </Layout>
  )
}

export default UsersAll