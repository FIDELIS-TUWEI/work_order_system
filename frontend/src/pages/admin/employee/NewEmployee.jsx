import Layout from "@/components/Layout";
import CreateEmployee from "@/pages/admin/employee/CreateEmployee";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useCreateEmployeeMutation } from "@/features/employees/employeeSlice";

const NewEmployee = () => {
  const [addEmployee, { isLoading: loading }] = useCreateEmployeeMutation();
  const navigate = useNavigate();


  // Function to create new employee
  const onFinishHandler = async (values) => {
    try {
      const { error } = await addEmployee(values).unwrap();

      if (error) {
        if (error === 400 && error.data && error.data.message) {
          message.error(error.data.message);
          navigate("/all/employees");
        } else {
          message.error("Failed to create new employee");
        }
      } else {
        message.success("New Employee Created Succesfully");
        navigate("/all/employees");
      }
    } catch (error) {
      message.error(error.message);
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