import { Button, Col, DatePicker, Form, Input, Row, Select, TimePicker, Typography, message } from "antd";
import Layout from "../../../components/Layout";
import { useSelector } from "react-redux";
import { selectToken, selectUserInfo } from "../../../utils/redux/slices/authSlice";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const USERS_URL = "/hin";


const EditUser = () => {
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const navigate = useNavigate();



  // function to handle form submit
  const onFinishHandler = async (values) => {
    try {
      const res = await axios.put(`${USERS_URL}/edit/${user._id}`,{
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }, values);
      if (res.data) {
        message.success("User details updated successfully");
        navigate('/users/all');
      } else {
        message.error("Error while updating user details");
      }
      console.log(res);
    } catch (error) {
      message.error("Error while updating user details");
    }
  }

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>User Details</Typography>
      {user &&  ( 
        <Form onFinish={onFinishHandler} layout="vertical" style={{ margin: "18px"}} initialValues={user}>
          <Typography style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '10px' }}>Edit User Details: </Typography>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item 
                name="firstName" 
                label="First Name" 
                required rules={[{ required: true, message: 'Please Enter First Name!' }]}>
                <Input type='text' placeholder="Enter First Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item 
                name="lastName" 
                label="Last Name" 
                required rules={[{ required: true, message: 'Please Enter Last Name!' }]}>
                <Input type='text' placeholder="Enter Last Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                name="username"
                label="Userame"
                required
                rules={[{ required: true, message: 'Please Enter a username!' }]}
              >
                <Input type='text' placeholder='Enter Username' />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item 
                  name="password" 
                  label="Password" 
                  //required rules={[{ required: true, message: 'Please Enter a password!' }]}
                >
                <Input type='password' placeholder='Enter Password' />
              </Form.Item>  
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                name="role"
                label="Role"
                required
                rules={[{ required: true, message: 'Please Enter a role !' }]}
              >
                <Select 
                  placeholder="Select Role"
                  allowClear
                  style={{ width: '100%' }}
                  options={[{ value: 'admin', label: 'Admin' }, { value: 'user', label: 'User' }, { value: 'hod', label: 'HoD' }]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item 
                  name="status" 
                  label="Status" 
                  required rules={[{ required: true, message: 'Please Enter a status!' }]}>
                <Input type='text' placeholder='Enter Status' />
              </Form.Item>
            </Col>
            </Row>
            <div className="user_submit">
              <Button type="primary" htmlType="submit">Update</Button>
            </div>
        </Form>
      )}
    </Layout>
  )
}

export default EditUser