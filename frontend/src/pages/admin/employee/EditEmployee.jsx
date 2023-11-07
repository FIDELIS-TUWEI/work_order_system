import { useSelector } from "react-redux";
import Layout from "../../../components/Layout";
import UpdateEmployee from "../../../components/UpdateEmployee";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { editEmployee, getEmployeeData } from "../../../services/employeeApi";
import { useCallback, useEffect, useState } from "react";
import { message } from "antd";

const EditEmployee = () => {
  const token = useSelector(selectToken);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // Function to handle form submit
  const onFinishHandler = async (values) => {
    try {
      await editEmployee(id, values, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
      message.success('Employee Updated Successfully');
      navigate('/all/employees');
    } catch (error) {
      message.error(error.message, "Employee Update Failed");
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
        navigate={navigate}
        employeeDetails={employeeDetails}
      />
    </Layout>
  )
}

export default EditEmployee;