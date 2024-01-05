import { useSelector } from 'react-redux';
import Layout from '../../../components/Layout';
import ViewAllDesignations from '../../../components/ViewAllDesignations';
import { selectToken } from '../../../features/auth/authSlice';
import { useCallback, useEffect, useState } from 'react';
import { allDesignations } from '../../../services/designation';
import { Typography, message } from 'antd';

const AllDesignations = () => {
  const token = useSelector(selectToken);
  const [designations, setDesignations] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Function to get all designations
  const getDesignations = useCallback (async () => {
    try {
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
    } catch (error) {
      setLoading(false);
      message.error('Error while fetching all designations', error.message);
    }
  }, [token, page]);

  // UseEffect hook
  useEffect(() => {
    getDesignations();
  }, [page, getDesignations]);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>All Designations</Typography>
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