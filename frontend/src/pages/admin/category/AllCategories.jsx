import { useNavigate } from "react-router-dom"
import Layout from "../../../components/Layout"
import ViewAllCategories from "../../../components/ViewAllCategories"

const AllCategories = () => {
    const navigate = useNavigate();
  return (
    <Layout>
        <ViewAllCategories 
            navigate={navigate}
        />
    </Layout>
  )
}

export default AllCategories