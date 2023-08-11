import { Button, Col, DatePicker, Form, Input, Row, TimePicker, Typography } from 'antd'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { selectToken, selectUserInfo, setCredentials } from '../utils/redux/slices/authSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useRegisterMutation } from '../utils/redux/slices/authApiSlice';
import LoadingBox from '../components/LoadingBox';
import axios from 'axios';
const USERS_URL = "/hin";


const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector(selectUserInfo);
  const token = useSelector(selectToken);

  const [register, { isLoading }] = useRegisterMutation();

  // useEffect to check if user is logged in
  useEffect(() => {
    if (!userInfo && !token) {
      navigate('/login');
    }
  }, [userInfo, navigate, token]);

// function to create user
const onFinishHandler = async (values) => {
  try {
    const res = await axios.post(`${USERS_URL}/register`, values);
    if (res.data) {
      toast.success("User Registered Succesfully");
      navigate('/users/all');
    } else {
      toast.error("User Registration Failed");
    }
  } catch (error) {
    toast.error("User Registration Failed:", error);
  }
}

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>User Registration</Typography>
      <Form onFinish={onFinishHandler} layout='vertical' style={{ margin: '18px' }}>
        <Typography style={{ fontSize: '1rem', fontWeight: '500' }}>User Details: </Typography>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item 
                name="firstName" 
                label="First Name" 
                required rules={[{ required: true, message: 'Please Enter First Name!' }]}>
              <Input type='text' placeholder='First Name' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item 
                name="lastName" 
                label="Last Name" 
                required rules={[{ required: true, message: 'Please Enter Last Name!' }]}>
              <Input type='text' placeholder='Last Name' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item 
                name="username" 
                label="Userame" 
                required rules={[{ required: true, message: 'Please Enter a username!' }]}>
              <Input type='text' placeholder='Enter Username' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item 
                name="password" 
                label="Password" 
                required rules={[{ required: true, message: 'Please Enter a password!' }]}>
              <Input type='password' placeholder='Enter Password' />
            </Form.Item>  
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item 
                name="date" 
                label="Date" 
                required rules={[{ required: true, message: 'Please Select a date!' }]}>
              <DatePicker format={'YYYY-MM-DD'} />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item 
                name="time" 
                label="Time" 
                required rules={[{ required: true, message: 'Please Select time!' }]}>
              <TimePicker format={'HH:mm:ss'} />
            </Form.Item>
          </Col>
        </Row>
        <div className="user_submit">
          <Button type="primary" htmlType="submit">Submit</Button>
        </div>
        <Col xs={24} md={24} lg={8}></Col>
        <div className="loader">
          { isLoading && <LoadingBox /> }
        </div>
      </Form>
    </Layout>
  )
}

export default Register