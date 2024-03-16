import Layout from "@/components/Layout";
import UpdateCategory from "./UpdateCategory";
import { useNavigate, useParams } from "react-router-dom";
import { useSingleCategoryQuery, useUpdateCategoryMutation } from "@/features/categories/categorySlice";
import { useEffect } from "react";
import { message } from "antd";

const EditCategory = () => {
    const { id } = useParams();
    const [ editCategory, { isLoading: loading, error } ] = useUpdateCategoryMutation();
    const { data: categoryData } = useSingleCategoryQuery(id);
    const navigate = useNavigate();

    const categoryInfo = categoryData?.data || [];

    useEffect(() => {
        if (error) {
            message.error(error.response.data.error || "An Error has Occured!");
        }
    }, [error]);

    // Function to handle form submit
    const onFinishHandler = async (values) => {
        try {
            const { error } = await editCategory({ id, values }).unwrap();

            if (error) {
                if (error.response.status === 400 && error.response.data.message) {
                    message.error(error.response.data.message);
                    navigate("all-categories");
                } else {
                    message.error("Failed to Update category with ID!");
                }
            } else {
                message.success("Category updated successfully");
                navigate("/all-categories");
            }
        } catch (error) {
            message.error("Failed to Update category with ID!");
        }
    }

  return (
    <Layout>
        <UpdateCategory
            onFinishHandler={onFinishHandler}
            categoryInfo={categoryInfo}
            loading={loading} 
            navigate={navigate}
        />
    </Layout>
  )
}

export default EditCategory;