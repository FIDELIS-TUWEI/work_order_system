import { useNavigate } from "react-router-dom"
import Layout from "@/components/Layout"
import ViewAllCategories from "@/pages/admin/category/ViewAllCategories"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectUserInfo } from "@/features/auth/authSlice"
import { useAllCategoriesQuery } from "@/features/categories/categorySlice"
import { Button, message } from "antd";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";

const AllCategories = () => {
    const user = useSelector(selectUserInfo);
    const [page, setPage] = useState(1);
    const { data, isLoading: loading, error, refetch } = useAllCategoriesQuery(page)
    const navigate = useNavigate();

    const { data: categories, pages } = data || {};

    // Handle errors
    useEffect(() => {
        if (error) {
        message.error("Failed to load all categories data!");
        };
    }, [error]);

    // Function to handle page change
    const handlePageChange = (newPage) => {
        setPage(newPage);
        refetch();
    };
    
  return (
    <Layout>
        <ViewAllCategories 
            navigate={navigate}
            loading={loading}
            categories={categories}
            user={user}
            refetch={refetch}
        />

        <div className="pagination">
            <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'darkgrey' }}>
                <GrFormPrevious />
            </Button>
        <span> Page {page} of {pages}</span>
        <Button disabled={page === pages} onClick={() => handlePageChange(page + 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'darkgrey' }}>
            <GrFormNext />
        </Button>
        </div>
    </Layout>
  )
}

export default AllCategories;