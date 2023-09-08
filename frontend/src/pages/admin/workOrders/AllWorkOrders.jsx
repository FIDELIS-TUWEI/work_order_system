import { Button } from "antd"
import Layout from "../../../components/Layout"
import { getAllWorkOrders } from "../../../services/workApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken, selectUserInfo } from "../../../utils/redux/slices/authSlice";
import Work from "../../../components/Work";

const AllWorkOrders = () => {
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const [allWork, setAllWork] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getAllWork();
  }, [currentPage]);

  // Function to get all work orders from Api
  const getAllWork = async () => {
      setLoading(true);
      const { data, pages } = await getAllWorkOrders(currentPage, {
          withCredentials: true,
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      setAllWork(data);
      setTotalPages(pages);
      setLoading(false);
  }

  // function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  }

  return (
    <Layout>
      <Work allWork={allWork} user={user} loading={loading} />
      
      <div className="pagination">
            {Array.from({length: totalPages}, (_, index) => index + 1).map((page) => (
            <Button key={page} 
                onClick={() => handlePageChange(page)} 
                disabled={currentPage === page} 
                style={{margin: '0 5px'}}
            >
                {page}
            </Button>
            ))}
        </div>
    </Layout>
  )
}

export default AllWorkOrders