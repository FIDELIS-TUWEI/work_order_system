import Layout from '../../../components/Layout'
import { useSelector } from 'react-redux';
import { selectUserInfo } from "@/features/auth/authSlice";

import { useNavigate, useParams } from 'react-router-dom';
import ViewProfile from './ViewProfile';
import { useGetSingleUserQuery } from '@/features/users/userSlice';


const Profile = () => {
  const {id} = useParams();
  const { data: userInfo, isLoading: loading, error } = useGetSingleUserQuery(id);
  const user = useSelector(selectUserInfo);
  const navigate = useNavigate();

  const userInfoArray = userInfo?.data || [];

  return (
    <Layout>

      <ViewProfile 
        loading={loading}
        error={error}
        id={id}
        user={user}
        userInfoArray={userInfoArray}
        navigate={navigate}
      />

    </Layout>
  )
};

export default Profile;