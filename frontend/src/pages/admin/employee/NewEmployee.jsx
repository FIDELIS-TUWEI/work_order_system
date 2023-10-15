import Layout from "../../../components/Layout";
import CreateEmployee from "../../../components/CreateEmployee";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewEmployee } from "../../../services/employeeApi";
import { message } from "antd";

const NewEmployee = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  // Function to create new employee
  const onFinishHandler = async (values) => {
    try {
      setLoading(true);
      await createNewEmployee(values);
      navigate("/all/employees");
      message.success("New Employee Created Succesfully");
    } catch (error) {
      setLoading(false);
      message.error("New Employee Creation Failed:", error);
    }
  }

  return (
    <Layout>
      <CreateEmployee 
        onFinishHandler={onFinishHandler}
        loading={loading}
        navigate={navigate}
      />
    </Layout>
  )
}

export default NewEmployee;