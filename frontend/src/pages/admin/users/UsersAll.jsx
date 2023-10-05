import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useNavigate } from "react-router-dom";
import AllUsers from "../../../components/AllUsers";
import axios from "../../../api/axiosConfig";


const UsersAll = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const navigate = useNavigate();

  // Function to get all users from Api
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        setLoading(true);
        const res = axios.get("/all-users", {
          signal: controller.signal
        });
        console.log(res.data);

        isMounted && setAllUsers(res.data);
        isMounted && setPages(Math.ceil(res.data.length / 10));
        setLoading(false);
      } catch (error) {
        console.error("Error while fetching users", error);
        setLoading(false);
      }
    };
    
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    }
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