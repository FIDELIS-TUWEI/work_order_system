import { message } from 'antd'
import Layout from '../../../components/Layout';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { selectToken, selectUserInfo } from '../../../utils/redux/slices/authSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CreateUser from '../../../components/CreateUser';
const USERS_URL = "/hin";


const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userInfo = useSelector(selectUserInfo);
  const token = useSelector(selectToken);


  // useEffect to check if user is logged in
  useEffect(() => {
    if (!userInfo && !token) {
      navigate('/login');
    }
  }, [userInfo, navigate, token]);

// function to create user
const onFinishHandler = async (values) => {
  try {
    setLoading(true);
    const res = await axios.post(`${USERS_URL}/register`, values);
    if (res.data) {
      message.success("User Registered Succesfully");
      navigate('/users/all');
      setLoading(false);
    } else {
      message.error("User Registration Failed");
    }
  } catch (error) {
    setLoading(false);
    message.error("User Registration Failed:", error);
  }
}

  return (
    <Layout>
      <CreateUser 
        onFinishHandler={onFinishHandler}
        loading={loading}
      />
    </Layout>
  )
}

export default Register