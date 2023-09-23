import { useSelector } from 'react-redux';
import Layout from '../../../components/Layout';
import ViewAllDesignations from '../../../components/ViewAllDesignations';
import { selectToken } from '../../../utils/redux/slices/authSlice';
import { useEffect, useState } from 'react';
import { allDesignations } from '../../../services/designation';

const AllDesignations = () => {
  const token = useSelector(selectToken);
  const [designations, setDesignations] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Function to get all designations
  const getDesignations = async () => {
    setLoading(true);
    const { data, pages } = await allDesignations(page, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDesignations(data);
    setPages(pages);
    setLoading(false);
  };

  // UseEffect hook
  useEffect(() => {
    getDesignations();
  }, [page]);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  return (
    <Layout>
      <ViewAllDesignations 
        designations={designations}
        loading={loading}
        handlePageChange={handlePageChange}
        page={page}
        pages={pages}
        getDesignations={getDesignations}
      />
    </Layout>
  )
}

export default AllDesignations;