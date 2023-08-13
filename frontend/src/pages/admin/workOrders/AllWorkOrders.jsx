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

  // antD table
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Service Type",
      dataIndex: "serviceType",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Date Requested",
      dataIndex: "date",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: () => {
        return (
          <div className="actions__btn">
            <Button>View Details</Button>
          </div>
        );
      }
    }
  ]
    
  return (
    <Layout>
        <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>All Work Orders</Typography>
        <div className="add-btn">
            <Button type="primary" onClick={() => navigate("/new/work")}>New Work</Button>
        </div>
        <Table columns={columns} dataSource={allWork} loading={loading} bordered rowKey={"_id"} scroll={{ x: 1000 }} />
    </Layout>
  )
}

export default AllWorkOrders