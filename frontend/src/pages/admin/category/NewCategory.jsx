import CreateCategory from "@/pages/admin/category/CreateCategory"
import Layout from "@/components/Layout"
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useCreateCategoryMutation } from "@/features/categories/categorySlice";

const NewCategory = () => {
    const [newCategory, { isLoading: loading }] = useCreateCategoryMutation()
    const navigate = useNavigate();

    // Function to handle form submit
    const onFinishHandler = async (values) => {
        try {
          const { error } = await newCategory(values).unwrap();
  
          if (error) {
            if (error === 400 && error?.data?.message) {
              message.error(error.data.message)
              navigate("/all-categories");
            } else {
              message.error("Failed to create new category!")
            }
          } else {
            message.success("New Category Created Succesfully");
            navigate("/all-categories");
          }

        } catch (error) {
          message.error("Failed to create new category!");
        }
    };

  return (
    <Layout>
        <CreateCategory 
            onFinishHandler={onFinishHandler}
            loading={loading}
            navigate={navigate}
        />
    </Layout>
  )
};

export default NewCategory;