import Layout from "@/components/Layout";
import AllEmployees from "@/pages/admin/employee/AllEmployees";
import { useSelector } from "react-redux";
import { selectToken } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getAllEmployees } from "../../../services/employeeApi";
import { Typography, message } from "antd";

const Employees = () => {
  const token = useSelector(selectToken);
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to get all employees
  const getEmployees = useCallback (async () => {
    try {
      setLoading(true);
      const { data, pages } = await getAllEmployees(page, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(data);
      setPages(pages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Error while fetching all employees', error.message);
    }
  }, [token, page]);
  

  // UseEffect hook
  useEffect(() => {
    getEmployees();
  }, [page, getEmployees]);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>All Employees</Typography>
      <AllEmployees 
        navigate={navigate}
        loading={loading}
        employees={employees}
        handlePageChange={handlePageChange}
        page={page}
        pages={pages}
        getEmployees={getEmployees}
      />
    </Layout>
  )
}

export default Employees;