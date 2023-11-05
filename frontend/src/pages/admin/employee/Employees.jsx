import Layout from "../../../components/Layout";
import AllEmployees from "../../../components/AllEmployees";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getAllEmployees } from "../../../services/employeeApi";

const Employees = () => {
  const token = useSelector(selectToken);
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to get all employees
  const getEmployees = useCallback (async () => {
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