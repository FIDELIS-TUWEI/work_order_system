import { useNavigate } from "react-router-dom"
import Layout from "../../../components/Layout"
import ViewAllCategories from "../../../components/ViewAllCategories"
import { useEffect, useState } from "react"
import { allWorkCategories } from "../../../services/categoryApi"
import { useSelector } from "react-redux"
import { selectToken, selectUserInfo } from "../../../utils/redux/slices/authSlice"

const AllCategories = () => {
    const user = useSelector(selectUserInfo);
    const token = useSelector(selectToken);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Function to get all Work Categories
    const getCategories = async () => {
        setLoading(true)
        const res = await allWorkCategories({
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setCategories(res.data);
        setLoading(false);
    }

    // UseEffect hook
    useEffect(() => {
        getCategories();
    }, [])
    
  return (
    <Layout>
        <ViewAllCategories 
            navigate={navigate}
            loading={loading}
            categories={categories}
            user={user}
        />
    </Layout>
  )
}

export default AllCategories