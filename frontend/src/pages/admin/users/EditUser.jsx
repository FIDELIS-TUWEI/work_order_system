import { Button, Col, Form, Input, Row, Select, TimePicker, Typography, message } from "antd";
import Layout from "../../../components/Layout";
import { useSelector } from "react-redux";
import { selectToken, selectUserInfo } from "../../../utils/redux/slices/authSlice";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getUserInfo } from "../../../services/usersApi";
import { useEffect, useState } from "react";
const USERS_URL = "/hin";


const EditUser = () => {
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const [userDetails, setUserDetails] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();


  useEffect(() => {
    if (id) {
      getUserDetails(id);
    }
  }, [id]);


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
  };

  // Function to get single user details
  const getUserDetails = async (id) => {
    const res = await getUserInfo(id, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setUserDetails({...res.data});
  }

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>Edit User Details</Typography>
      <Typography>
        Username: {userDetails && userDetails.username}
      </Typography>
        <Form onFinish={onFinishHandler} layout="vertical" style={{ margin: "18px"}}>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item 
                name="firstName" 
                label="First Name"
              > 
                <Input type='text' placeholder={userDetails && userDetails.firstName} />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item 
                name="lastName" 
                label="Last Name" 
              >
                <Input type='text' placeholder={userDetails && userDetails.lastName} />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item 
                  name="password" 
                  label="Password" 
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
                  options={[
                    { value: 'admin', label: 'Admin' }, { value: 'user', label: 'User' }, 
                    { value: 'hod', label: 'HoD' }, { value: 'superadmin', label: 'Super Admin' },
                    { value: 'supervisor', label: 'Supervisor' }, { value: 'reviewer', label: 'Reviewer' }
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item 
                  name="status" 
                  label="Status" 
                  required rules={[{ required: true, message: 'Please Enter a status!' }]}>
                <Select
                  placeholder="Select Status"
                  allowClear
                  style={{ width: '100%' }}
                  options={[
                    { value: true, label: 'Active' }, { value: false, label: 'Inactive' }, 
                  ]}
                />
              </Form.Item>
            </Col>
            </Row>
            <div>
              <Button type="primary" htmlType="submit" onClick={() => {navigate(-1)}}>Go Back</Button>
            </div>
            <div className="user_submit">
              <Button type="primary" htmlType="submit">Update</Button>
            </div>
        </Form>
    </Layout>
  )
}

export default EditUser