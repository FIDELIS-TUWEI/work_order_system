import Layout from "@/components/Layout";
import AllEmployees from "@/pages/admin/employee/AllEmployees";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, message } from "antd";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import { useEmployeesQuery } from "@/features/employees/employeeSlice";

const Employees = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading: loading, error, refetch } = useEmployeesQuery(page);
  const navigate = useNavigate();

  const { data: employees, pages } = data || {};

  useEffect(() => {
    if (error) {
      message.error(error.message);
    }
  }, [error]);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
    refetch();
  }

  return (
    <Layout>

      <AllEmployees 
        navigate={navigate}
        loading={loading}
        employees={employees}
        handlePageChange={handlePageChange}
        refetch={refetch}
      />

      <div className="pagination">
        <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'darkgrey' }}>
          <GrFormPrevious />
        </Button>
        <span>Page {page} of {pages}</span>
        <Button disabled={page === pages} onClick={() => handlePageChange(page + 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'darkgrey' }}>
          <GrFormNext />
        </Button>
      </div>
    </Layout>
  )
}

export default Employees;