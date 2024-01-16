import { Button, Tooltip, Typography, message } from 'antd';
import Layout from "@/components/Layout";
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { getUserInfo } from '../../../services/usersApi';
import { useSelector } from 'react-redux';
import { selectToken, selectUserInfo } from "@/features/auth/authSlice";
import Logo from "@/assets/images/logo.png";

const UserDetails = () => {
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const [userDetails, setUserDetails] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();


  // function to get user details
  const getUserDetails = useCallback (async (id) => {
    try {
      const res = await getUserInfo(id, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserDetails(res.data);
    } catch (error) {
      message.error("Failed to fetch user details", error.message);
    }
  }, [token]);

  // UseEffect hook
  useEffect(() => {
    if (id) {
      getUserDetails(id);
    }
  }, [id, getUserDetails]);

  return (
    <Layout>
      
    </Layout>
  )
}

export default UserDetails;