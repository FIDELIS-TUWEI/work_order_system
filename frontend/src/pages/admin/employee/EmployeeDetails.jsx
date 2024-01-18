import Layout from "@/components/Layout";
import ViewEmployee from "@/pages/admin/employee/ViewEmployee";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { message } from "antd";
import { useSingleEmployeeQuery } from "@/features/employees/employeeSlice";

const EmployeeDetails = () => {
  const { id } = useParams();
  const { data: singleEmployee, isLoading: loading, error } = useSingleEmployeeQuery(id);
  const navigate = useNavigate();

  const employeeDetails = singleEmployee?.data || {};

  useEffect(() => {
    if (error) {
      message.error(error.message)
    }
  }, [error]);

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