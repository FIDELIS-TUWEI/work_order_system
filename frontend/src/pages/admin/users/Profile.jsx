import { Typography, message } from 'antd'
import Layout from '../../../components/Layout'
import { useSelector } from 'react-redux';
import { selectUserInfo } from "@/features/auth/authSlice";

import { useNavigate, useParams } from 'react-router-dom';
import ViewProfile from './ViewProfile';
import { useGetSingleUserQuery } from '@/features/users/userSlice';
import LoadingBox from '@/components/LoadingBox';


const Profile = () => {
  const {id} = useParams();
  const { data: userInfo, isLoading: loading, error } = useGetSingleUserQuery(id);
  const user = useSelector(selectUserInfo);
  const navigate = useNavigate();

  const userInfoArray = userInfo?.data || [];
  console.log("User Profile Info: ", userInfoArray);

  // Conditional statement to display loading and error messages
  if (loading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <LoadingBox />
    </div>;
};

if (error) {
    return message.error(error);
};

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
        Profile Details
      </Typography>

      <ViewProfile 
        user={user}
        userInfoArray={userInfoArray}
        navigate={navigate}
      />
    </Layout>
  )
};

export default Profile;