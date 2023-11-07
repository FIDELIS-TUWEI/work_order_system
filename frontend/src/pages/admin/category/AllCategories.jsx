import { useNavigate } from "react-router-dom"
import Layout from "../../../components/Layout"
import ViewAllCategories from "../../../components/ViewAllCategories"
import { useCallback, useEffect, useState } from "react"
import { allWorkCategories } from "../../../services/categoryApi"
import { useSelector } from "react-redux"
import { selectToken, selectUserInfo } from "../../../utils/redux/slices/authSlice"
import { message } from "antd"

const AllCategories = () => {
    const user = useSelector(selectUserInfo);
    const token = useSelector(selectToken);
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Function to get all Work Categories
    const getCategories = useCallback (async () => {
        try {
            setLoading(true)
            const { data, pages } = await allWorkCategories(page, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCategories(data);
            setPages(pages);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            message.error("Failed to fetch categories", error.message);
            
        }
    }, [token, page]);

    // UseEffect hook
    useEffect(() => {
        getCategories();
    }, [page, getCategories]);

    // Function to handle page change
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    
  return (
    <Layout>
        <ViewAllCategories 
            navigate={navigate}
            loading={loading}
            categories={categories}
            user={user}
            page={page}
            pages={pages}
            handlePageChange={handlePageChange}
            getCategories={getCategories}
        />
    </Layout>
  )
}

export default AllCategories