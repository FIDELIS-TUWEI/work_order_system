import { Button, Card, Col, DatePicker, Form, Input, Row, TimePicker, Typography, message } from 'antd'
import Layout from '../../../components/Layout';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { selectToken, selectUserInfo } from '../../../utils/redux/slices/authSlice';
import { useEffect, useState } from 'react';
import LoadingBox from '../../../components/LoadingBox';
import axios from 'axios';
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
      <Typography
        style={{ 
          display: 'flex', justifyContent: 'center', 
          alignItems: 'center', fontSize: '1.5rem', fontWeight: 'bold' 
        }}
      >
        Register New User Form
      </Typography>
      <Card title="User Details" 
        style={{ margin: '15px' }}
      >
      <Form onFinish={onFinishHandler} layout='vertical' style={{ margin: '18px' }}>
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
          <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} htmlType="submit">Submit</Button>
        </div>
        <Col xs={24} md={24} lg={8}></Col>
        <div className="loader">
          { loading && <LoadingBox /> }
        </div>
      </Form>
      </Card>
    </Layout>
  )
}

export default Register