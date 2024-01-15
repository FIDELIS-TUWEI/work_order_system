import { Typography, message } from 'antd'
import Layout from '../../../components/Layout'
import { useSelector } from 'react-redux';
import { selectToken, selectUserInfo } from "@/features/auth/authSlice";

import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { getUserInfo } from '../../../services/usersApi';
import ViewProfile from './ViewProfile';


const Profile = () => {
  const {id} = useParams();
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  // Function to get user data
  const getUserData = useCallback (async (id) => {
    try {
      const res = await getUserInfo(id, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(res.data);
    } catch (error) {
      message.error("Failed to fetch user details", error.message);
    }
  }, [token]);

  // useEffect hook
  useEffect(() => {
    if (id) {
      getUserData(id);
    }
  }, [id, getUserData]);


  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
        Profile Details
      </Typography>

      <ViewProfile 
        user={user}
        userData={userData}
        navigate={navigate}
      />
    </Layout>
  )
};

export default Profile;