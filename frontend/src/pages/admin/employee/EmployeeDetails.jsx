import { useSelector } from "react-redux";
import Layout from "../../../components/Layout";
import ViewEmployee from "../../../components/ViewEmployee";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleEmployee } from "../../../services/employeeApi";
import { message } from "antd";

const EmployeeDetails = () => {
  const token = useSelector(selectToken);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Function to get employee details
  const getEmployeeDetails = async (id) => {
    try {
      setLoading(true);
      const res = await getSingleEmployee(id, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployeeDetails(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error(error.message);
    }
  };

  // UseEffect hook
  useEffect(() => {
    if (id) {
      getEmployeeDetails(id);
    }
  }, [id]);

  return (
    <Layout>
      <ViewEmployee 
        employeeDetails={employeeDetails}
        loading={loading}
        navigate={navigate}
      />
    </Layout>
  )
}

export default EmployeeDetails;