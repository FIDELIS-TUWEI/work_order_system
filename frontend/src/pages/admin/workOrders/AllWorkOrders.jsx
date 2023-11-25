import { Button, message } from "antd"
import Layout from "../../../components/Layout"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";

import { selectToken, selectUserInfo } from "../../../utils/redux/slices/authSlice";
import Work from "../../../components/Work";
import { setWorkOrder } from "../../../utils/redux/slices/workSlice";
import { useGetWorkDataQuery } from "../../../utils/redux/slices/workApiSlice";


const AllWorkOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const { data: workOrders = [], isLoading, isFetching, isError } = useGetWorkDataQuery({
    page,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(workOrders);

  useEffect(() => {
    if (isLoading || isFetching) {
      if (Array.isArray(workOrders.data)) {
        dispatch(setWorkOrder(workOrders));
        setPages(workOrders.pages);
      } else {
        message.error("Failed to fetch work orders", workOrders.message);
      }
    }
  }, [workOrders, isLoading, isFetching]);

  useEffect(() => {
    if (isError) {
      message.error("Failed to fetch work orders", error.message);
    }
  }, [isError]);

  // function to handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  return (
    <Layout>
      <Work 
        workOrders={workOrders} 
        user={user} 
        isLoading={isLoading} 
      />
      
      <div className="pagination">
        <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} style={{ border: 'none', margin: '0 5px' }}>
          <GrFormPrevious />
        </Button>
        <span> Page {page} of {pages}</span>
        <Button disabled={page === pages} onClick={() => handlePageChange(page + 1)} style={{ border: 'none', margin: '0 5px' }}>
          <GrFormNext />
        </Button>
      </div>
    </Layout>
  )
}

export default AllWorkOrders;