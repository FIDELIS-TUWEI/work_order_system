import Layout from "@/components/Layout";
import UpdateEmployee from "@/pages/admin/employee/UpdateEmployee";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { message } from "antd";
import { useEditEmployeeMutation, useEmployeeDataQuery } from "@/features/employees/employeeSlice";

const EditEmployee = () => {
  const { id } = useParams();
  const [editEmployee, { isLoading: loading, error }] = useEditEmployeeMutation();
  const { data: employeeInfo } = useEmployeeDataQuery(id);
  const navigate = useNavigate();

  const employeeDetails = employeeInfo?.data || [];

  // Hook to handle errors
  useEffect(() => {
    if (error) {
      message.error("An Error has occured!");
    }
  }, [error]);

  // Function to handle form submit
  const onFinishHandler = async (values) => {
    try {
      const { error } = await editEmployee({id, values}).unwrap(); 

      if (error) {
        if (error === 400 && error?.data?.message) {
          message.error(error.data.message);
          navigate('/all/employees');
        } else {
          message.error("Failed to Update employee with ID!")
        }
      } else {
        message.success('Employee Updated Successfully');
        navigate('/all/employees');
      }

    } catch (error) {
      message.error("Failed to Update employee with ID!");
    }
  };

  return (
    <Layout>
      <UpdateEmployee 
        onFinishHandler={onFinishHandler}
        employeeDetails={employeeDetails}
        loading={loading}
      />
    </Layout>
  )
}

export default EditEmployee;