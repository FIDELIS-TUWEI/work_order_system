import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import AllUsers from "@/pages/admin/users/AllUsers";
import { Button, Typography, message } from "antd";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import { useGetAllUsersQuery } from "@/features/users/userSlice";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/features/auth/authSlice";


const UsersAll = () => {
  const user = useSelector(selectUserInfo);
  const [page, setPage] = useState(1);
  const { data, isLoading: loading, error, refetch } = useGetAllUsersQuery(page);

  // Fetch paginated data pages
  const { data: allUsersArray, pages } = data || {};

  // Handle Errors
  useEffect(() => {
    if (error) {
      message.error("Error Occured getting all users!");
    };
  }, [error]);

// function to handle page change
const handlePageChange = (newPage) => {
  setPage(newPage);
  refetch();
}

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>All Users</Typography>
      <AllUsers 
        allUsersArray={allUsersArray}
        loading={loading}
        handlePageChange={handlePageChange}
        refetch={refetch}
        user={user}
      />

      <div className="pagination">
        <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'lightgrey' }}>
          <GrFormPrevious />
        </Button>
        <span> Page {page} of {pages}</span>
        <Button disabled={page === pages} onClick={() => handlePageChange(page + 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'lightgrey' }}>
          <GrFormNext />
        </Button>
      </div>
    </Layout>
  )
}

export default UsersAll;