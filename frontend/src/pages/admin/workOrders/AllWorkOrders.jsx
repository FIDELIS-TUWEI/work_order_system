import { Button, Table, Typography } from "antd"
import Layout from "../../../components/Layout"
import { useNavigate } from "react-router-dom"
import { getAllWorkOrders } from "../../../services/workApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";

const AllWorkOrders = () => {
  const token = useSelector(selectToken);
  const [allWork, setAllWork] = useState([]);
  const [loading, setLoading] = useState(false);
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
            <Button type="primary" onClick={() => navigate("/new/work")}>New Work</Button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allWork.map((work) => (
              <tr key={work._id}>
                <td>{work.title}</td>
                <td>{work.location}</td>
                <td>
                  <Button onClick={() => navigate(`/work/details/${work._id}`)}>View Details</Button>
                  <Button danger>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </Layout>
  )
}

export default AllWorkOrders