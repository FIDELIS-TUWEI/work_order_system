import { useNavigate } from "react-router-dom"
import Layout from "../../../components/Layout"
import ViewAllCategories from "../../../components/ViewAllCategories"
import { useState } from "react"

const AllCategories = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
  return (
    <Layout>
        <ViewAllCategories 
            navigate={navigate}
            loading={loading}
        />
    </Layout>
  )
}

export default AllCategories