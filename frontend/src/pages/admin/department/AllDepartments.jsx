import Layout from "@/components/Layout";
import ViewAllDepartments from "@/pages/admin/department/ViewAllDepartments";
import { useEffect, useState } from 'react';
import {GrFormNext, GrFormPrevious} from "react-icons/gr";

import { useAllDepartmentsQuery } from '@/features/departments/departmentSlice';
import { Button } from "antd";

const AllDepartments = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading: loading, error, refetch } = useAllDepartmentsQuery(page);

  const { data: departments, pages } = data || {};
  
  useEffect(() => {
    if (error) {
      message.error(error.message);
    }
  }, [error])

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
    refetch();
  }

  return (
    <Layout>

      <ViewAllDepartments 
        departments={departments}
        loading={loading}
        refetch={refetch}
      />

      <div className="pagination">
        <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'darkgrey' }}>
          <GrFormPrevious />
        </Button>
        <span> Page {page} of {pages}</span>
        <Button disabled={page === pages} onClick={() => handlePageChange(page + 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'darkgrey' }}>
          <GrFormNext />
        </Button>
      </div>

    </Layout>
  )
};

export default AllDepartments;