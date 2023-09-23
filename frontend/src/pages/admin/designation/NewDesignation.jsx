import { useSelector } from 'react-redux';
import CreateDesignation from '../../../components/CreateDesignation';
import Layout from '../../../components/Layout';
import { selectToken } from '../../../utils/redux/slices/authSlice';

const NewDesignation = () => {
  const token = useSelector(selectToken);
  return (
    <Layout>
      <CreateDesignation />
    </Layout>
  )
}

export default NewDesignation;