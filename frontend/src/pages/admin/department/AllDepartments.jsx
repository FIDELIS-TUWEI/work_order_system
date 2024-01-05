import { useSelector } from 'react-redux';
import Layout from '../../../components/Layout';
import ViewAllDepartments from '../../../components/ViewAllDepartments';
import { selectToken } from '../../../features/auth/authSlice';
import { useCallback, useEffect, useState } from 'react';
import { allDepartments } from '../../../services/departmentApi';
import { Typography, message } from 'antd';

const AllDepartments = () => {
  const token = useSelector(selectToken);
  const [departments, setDepartments] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Function to get all departments
  const getDepartments = useCallback (async () => {
    try {
      setLoading(true);
      const { data, pages } = await allDepartments(page, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDepartments(data);
      setPages(pages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Error while fetching all departments', error.message);
    }
  }, [token, page]);

  // UseEffect hook
  useEffect(() => {
    getDepartments();
  }, [page, getDepartments]);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>All Departments</Typography>
      <ViewAllDepartments 
        departments={departments}
        loading={loading}
        handlePageChange={handlePageChange}
        page={page}
        pages={pages}
        getDepartments={getDepartments}
      />
    </Layout>
  )
}

export default AllDepartments;