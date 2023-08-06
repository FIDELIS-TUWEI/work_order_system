import { Button, Col, DatePicker, Form, Input, Row, TimePicker, Typography } from 'antd'
import Layout from '../components/Layout'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../utils/redux/slices/authSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useRegisterMutation } from '../utils/redux/slices/usersApiSlice';

const Register = () => {
  const { userInfo } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register] = useRegisterMutation();

  // useEffect to check if user is logged in
  useEffect(() => {
    if (userInfo) {
      navigate('/users/register');
    }
  }, [userInfo, navigate]);

  // function to create user
  const onFinishHandler = async (values) => {
    try {
      const res = await register(values).unwrap();
      dispatch(setCredentials({ ...res.data }));
      setTimeout(() => {
        window.location.reload();
        toast.success("Registration Succesful");
      }, 500);
      localStorage.removeItem('userInfo');
      navigate('/');
    } catch (error) {
      console.log(error);
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
      </Form>
    </Layout>
  )
}

export default Register