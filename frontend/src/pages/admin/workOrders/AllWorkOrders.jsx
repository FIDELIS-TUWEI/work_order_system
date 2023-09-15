import { Button } from "antd"
import Layout from "../../../components/Layout"
import { getAllWorkOrders } from "../../../services/workApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";

import { selectToken, selectUserInfo } from "../../../utils/redux/slices/authSlice";
import Work from "../../../components/Work";

const AllWorkOrders = () => {
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const [allWork, setAllWork] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    getAllWork();
  }, [page]);

  // Function to get all work orders from Api
  const getAllWork = async () => {
      setLoading(true);
      const { data, pages } = await getAllWorkOrders(page, {
          withCredentials: true,
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      setAllWork(data);
      setPages(pages);
      setLoading(false);
  }

  // function to handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  return (
    <Layout>
      <Work allWork={allWork} user={user} loading={loading} />
      
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

export default AllWorkOrders