import { Button, Card } from "antd"
import Layout from "../../../components/Layout"
import { useNavigate } from "react-router-dom"
import { getAllWorkOrders } from "../../../services/workApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken, selectUserInfo } from "../../../utils/redux/slices/authSlice";
import {AiFillEye} from "react-icons/ai"
import {BiSolidEditAlt} from "react-icons/bi"

const AllWorkOrders = () => {
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const [allWork, setAllWork] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

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
      <div className="add-btn">
        <Button 
          style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} 
          onClick={() => navigate("/new/work")}
        >
          New Work
        </Button>
      </div>

      <Card 
        loading={loading} 
        title="All Work Orders" 
        style={{ margin: "15px" }}
      >
        
      <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Service Type</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allWork.map((work) => (
              <tr key={work._id}>
                <td>{work.title}</td>
                <td>{work.location && work.location.locationTitle}</td>
                <td>{work.serviceType}</td>
                <td>{work.category && work.category.categoryTitle}</td>
                <td>{work.status}</td>
                <td className="actions__btn">
                  <Button style={{ color: 'green', border: 'none', margin: '0 5px'}} onClick={() => navigate(`/work/details/${work._id}`)}><AiFillEye/></Button>
                  {
                    user.role === "admin" || user.role === "superadmin" || user.role === "hod" || user.role === "supervisor" || user.role === "reviewer" ? 
                      <Button danger style={{ border: 'none'}} 
                        onClick={() => navigate(`/edit/work/${work._id}`)}
                      >
                        <BiSolidEditAlt/>
                      </Button> 
                    : null
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </Card>
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