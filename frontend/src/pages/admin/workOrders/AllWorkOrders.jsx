import { Button, Typography, message } from "antd"
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";

import Work from "@/pages/admin/workOrders/Work";
import { useWorkOrdersQuery } from "@/features/work/workSlice";
import { selectUserInfo } from "@/features/auth/authSlice";


const AllWorkOrders = () => {
  const user = useSelector(selectUserInfo);
  const [page, setPage] = useState(1);
  const { data, isLoading: loading, error, refetch } = useWorkOrdersQuery(page);

  const { data: workOrdersArray, pages } = data || {};


 // Handle errors
 useEffect(() => {
    if (error) {
      message.error(error.message);
    };
 }, [error]);

 // Handle pagination
 const handlePageChange = (newPage) => {
   setPage(newPage);
   refetch();
 }
 

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>All Work Orders</Typography>
      <Work 
        workOrdersArray={workOrdersArray}
        user={user} 
        loading={loading}
        refetch={refetch}
      />
      
      <div className="pagination">
        <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'darkgrey' }}>
          <GrFormPrevious />
        </Button>
        <span> Page {page} of {pages}</span>
        <Button disabled={page === pages} onClick={() => handlePageChange(page + 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'darkgrey' }}>
          <GrFormNext />
        </Button>
      </div>
    </Layout>
  )
}

export default AllWorkOrders;