import { Button, Typography, message } from "antd"
import Layout from "@/components/Layout";
import { useState } from "react";
import { useSelector } from "react-redux";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";

import Work from "@/pages/admin/workOrders/Work";
import { useWorkOrdersQuery } from "@/features/work/workSlice";


const AllWorkOrders = () => {
  const user = useSelector(selectUserInfo);
  const [page, setPage] = useState(1);
  const { data: workOrders, isLoading: loading, error } = useWorkOrdersQuery(page);

  const workOrdersArray = workOrders?.data || [];
 // Handle errors
 if (error) {
    message.error(error.message);
  };

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>All Work Orders</Typography>
      <Work 
        workOrdersArray={workOrdersArray}
        user={user} 
        loading={loading}
      />
      
      <div className="pagination">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'lightgrey' }}>
          <GrFormPrevious />
        </Button>
        <span> Page {page} of {workOrdersArray?.pages || 1}</span>
        <Button disabled={page === workOrdersArray?.pages || 1} onClick={() => setPage(page + 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'lightgrey' }}>
          <GrFormNext />
        </Button>
      </div>
    </Layout>
  )
}

export default AllWorkOrders;