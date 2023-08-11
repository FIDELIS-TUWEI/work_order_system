import { Typography } from 'antd'
import Layout from '../../../components/Layout'
import { selectUser } from '../../../utils/redux/slices/userSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
const USERS_URL = "/hin";


const Profile = () => {
  const userData = useSelector(selectUser);

  // getUserData
  const getUserData = async () => {
    try {
      const response = await axios.get(`${USERS_URL}/userInfo`, {
        withCredentials: true,
      });
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <Typography>Manage Profile</Typography>
    </Layout>
  )
}

export default Profile