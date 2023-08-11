import { Button, Typography } from "antd"
import Layout from "../../../components/Layout"
import { useNavigate } from "react-router-dom"

const AllWorkOrders = () => {

    const navigate = useNavigate();
    
  return (
    <Layout>
        <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>All Work Orders</Typography>
        <div className="add-btn">
            <Button type="primary" onClick={() => navigate("/new/work")}>New Work</Button>
        </div>
    </Layout>
  )
}

export default AllWorkOrders