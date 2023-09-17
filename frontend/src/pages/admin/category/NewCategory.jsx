import { useState } from "react"
import CreateCategory from "../../../components/CreateCategory"
import Layout from "../../../components/Layout"
import { createNewCategory } from "../../../services/categoryApi";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const NewCategory = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Function to handle form submit
    const onFinishHandler = async (values) => {
        setLoading(true);
        await createNewCategory(values);
        navigate("/all-categories");
        message.success("New Category Created Succesfully");
        setLoading(false);
    }
  return (
    <Layout>
        <CreateCategory 
            onFinishHandler={onFinishHandler}
            loading={loading}
            navigate={navigate}
        />
    </Layout>
  )
}

export default NewCategory