import { Button, Table, Typography } from "antd"
import Layout from "../../../components/Layout"
import { useNavigate } from "react-router-dom"
import { getAllWorkOrders } from "../../../services/workApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken, selectUserInfo } from "../../../utils/redux/slices/authSlice";

const AllWorkOrders = () => {
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const [allWork, setAllWork] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    getAllWork();
  }, []);

  // Function to get all work orders from Api
  const getAllWork = async () => {
      setLoading(true);
      let response = await getAllWorkOrders({
          withCredentials: true,
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      setAllWork(response.data);
      setLoading(false);
  }


    
  return (
    <Layout>
        <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>All Work Orders</Typography>
        <div className="add-btn">
            <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none'}} onClick={() => navigate("/new/work")}>New Work</Button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Service Type</th>
              <th>Date Requested</th>
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
                <td>{work.Date_Created}</td>
                <td>{work.status}</td>
                <td className="actions__btn">
                  <Button style={{ color: 'green', border: 'none'}} onClick={() => navigate(`/work/details/${work._id}`)}>View Details</Button>
                  {
                    user.role === "admin" || user.role === "superadmin" || user.role === "hod" || user.role === "supervisor" || user.role === "reviewer" ? 
                      <Button style={{ color: 'red', border: 'none'}} 
                        onClick={() => navigate(`/edit/work/${work._id}`)}
                      >
                        Edit
                      </Button> 
                    : null
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </Layout>
  )
}

export default AllWorkOrders