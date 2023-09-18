import { useNavigate } from "react-router-dom"
import Layout from "../../../components/Layout"
import ViewAllCategories from "../../../components/ViewAllCategories"
import { useEffect, useState } from "react"
import { allWorkCategories, deleteCategory } from "../../../services/categoryApi"
import { useSelector } from "react-redux"
import { selectToken, selectUserInfo } from "../../../utils/redux/slices/authSlice"
import { Modal } from "antd"

const AllCategories = () => {
    const user = useSelector(selectUserInfo);
    const token = useSelector(selectToken);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Function to get all Work Categories
    const getCategories = async () => {
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
    }

    // UseEffect hook
    useEffect(() => {
        getCategories();
    }, [page]);

    // Function to handle page change
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    // Function to handle delete category
    const handleDelete = async (category) => {
        setSelectedCategory(category);
        setIsModalVisible(true);
    };

    // Function to confirm modal delete
    const confirmDelete = async () => {
        const { data } = await deleteCategory(selectedCategory._id, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        message.success(data.message);
        setIsModalVisible(false);
        getCategories();
    }
    
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
        />

        <Modal 
            title="Confirm Delete Category" 
            visible={isModalVisible} 
            onOk={confirmDelete} 
            onCancel={() => setIsModalVisible(false)}
        >
            <p>Are you sure you want to delete this category?</p>
        </Modal>
    </Layout>
  )
}

export default AllCategories