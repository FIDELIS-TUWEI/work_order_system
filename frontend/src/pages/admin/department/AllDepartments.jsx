import { useSelector } from 'react-redux';
import Layout from '../../../components/Layout';
import ViewAllDepartments from '../../../components/ViewAllDepartments';
import { selectToken } from '../../../utils/redux/slices/authSlice';
import { useEffect, useState } from 'react';
import { allDepartments } from '../../../services/departmentApi';

const AllDepartments = () => {
  const token = useSelector(selectToken);
  const [departments, setDepartments] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Function to get all departments
  const getDepartments = async () => {
    setLoading(true);
    const { data, pages } = await allDepartments(page, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setDepartments(data);
    setPages(pages);
    setLoading(false);
  };

  // UseEffect hook
  useEffect(() => {
    getDepartments();
  }, [page]);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  return (
    <Layout>
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