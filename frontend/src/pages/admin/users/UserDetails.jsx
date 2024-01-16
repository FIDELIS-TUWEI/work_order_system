import Layout from "@/components/Layout";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserInfo } from "@/features/auth/authSlice";
import { useGetSingleUserQuery } from '@/features/users/userSlice';
import UserData from './UserData';

const UserDetails = () => {
  const {id} = useParams();
  const { data: userInfo, isLoading: loading, error } = useGetSingleUserQuery(id);
  const user = useSelector(selectUserInfo);
  const navigate = useNavigate();

  const userInfoArray = userInfo?.data || [];

  return (
    <Layout>

      <UserData 
        userInfoArray={userInfoArray}
        navigate={navigate}
        user={user}
        loading={loading}
        error={error}
      />

    </Layout>
  )
}

export default UserDetails;