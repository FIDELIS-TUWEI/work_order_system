import Layout from "@/components/Layout";
import ViewAllDesignations from "@/pages/admin/designation/ViewAllDesignations";
import { useEffect, useState } from 'react';
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import { Button, message } from 'antd';
import { useAllDesignationsQuery } from '@/features/designations/designationSlice';

const AllDesignations = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading: loading, error, refetch } = useAllDesignationsQuery(page);

  const { data: designations, pages } = data || {};

  useEffect(() => {
    if (error) {
      message.error(error.message)
    }
  }, [error]);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
    refetch();
  }

  return (
    <Layout>

      <ViewAllDesignations 
        designations={designations}
        loading={loading}
        handlePageChange={handlePageChange}
        page={page}
        pages={pages}
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
}

export default AllDesignations;