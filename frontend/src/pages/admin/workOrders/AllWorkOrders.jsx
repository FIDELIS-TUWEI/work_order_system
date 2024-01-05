import { Button, Typography, message } from "antd"
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";

import { selectToken, selectUserInfo } from "@/features/auth/authSlice";
import Work from "@/pages/admin/workOrders/Work";
import { getAllWorkOrders } from "../../../services/workApi";


const AllWorkOrders = () => {
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const [allWork, setAllWork] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Function to get all work orders from API
  const getAllWork = async () => {
    try {
      setLoading(true);
      const { data, pages } = await getAllWorkOrders(page, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllWork(data);
      setPages(pages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Failed to fetch work orders", error.message);
    }
  };

  // UseEffect hook
  useEffect(() => {
    getAllWork();
  }, [page]);

  // function to handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>All Work Orders</Typography>
      <Work 
        allWork={allWork} 
        user={user} 
        loading={loading}
        getAllWork={getAllWork} 
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

export default AllWorkOrders;