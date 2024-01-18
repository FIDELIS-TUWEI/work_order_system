import { useSelector } from "react-redux";
import Layout from "@/components/Layout";
import UpdateEmployee from "@/pages/admin/employee/UpdateEmployee";
import { selectToken } from "@/features/auth/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { editEmployee, getEmployeeData } from "../../../services/employeeApi";
import { useCallback, useEffect, useState } from "react";
import { message } from "antd";
import { useEditEmployeeMutation } from "@/features/employees/employeeSlice";

const EditEmployee = () => {
  const { id } = useParams();
  const [editEmployee, { isLoading: loading }] = useEditEmployeeMutation()
  const token = useSelector(selectToken);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const navigate = useNavigate();

  // Function to handle form submit
  const onFinishHandler = async (values) => {
    try {
      const { error } = await editEmployee({id, values}).unwrap(); 

      if (error) {
        if (error === 400 && error.data && error.data.message) {
          message.error(error.data.message);
          navigate('/all/employees');
        } else {
          message.error("Failed to Update employee")
        }
      } else {
        message.success('Employee Updated Successfully');
        navigate('/all/employees');
      }
      
    } catch (error) {
      message.error(error.message);
    }
  };

  // Function to get single employee details
  const getEmployeeDetails = useCallback (async (id) => {
    try {
      const res = await getEmployeeData(id, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployeeDetails(res.data);
    } catch (error) {
      message.error("Failed to fetch employee data", error.message);
    }
  }, [token]);

  // UseEffect hook
  useEffect(() => {
    if (id) {
      getEmployeeDetails(id);
    }
  }, [id, getEmployeeDetails]);

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