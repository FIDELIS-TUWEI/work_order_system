import { Button, Col, Form, Input, Row, Select, Typography, message } from "antd";
import Layout from "../../../components/Layout";
import { useSelector } from "react-redux";
import { selectToken, selectUserInfo } from "../../../utils/redux/slices/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { editUser, getUserInfo } from "../../../services/usersApi";
import { useEffect, useState } from "react";


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
    const res = await editUser(id, values, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res) {
      message.success("User Updated Successfully");
      navigate("/users/all");
    } else {
      message.error("User Update Failed");
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
                name="department"
                label="Department"
                required
                rules={[{ required: true, message: 'Please Select a department!' }]}
            >
              <Select
                placeholder="Select User Department"
                allowClear
                style={{ width: '100%' }}
                options={[
                  { value: 'Front-Desk', label: 'Front Desk' },
                  { value: 'House-Keeper', label: 'House Keeper' },
                  { value: 'F&B', label: 'Food & Beverages' },
                  { value: 'FP', label: 'Food Production' },
                  { value: 'IT', label: 'IT' },
                  { value: 'HR', label: 'Human Resource' },
                  { value: 'Security', label: 'Security' },
                  { value: 'Engineering', label: 'Engineering' },
                  { value: 'Management', label: 'Management' },
                  { value: 'Sales', label: 'Sales' },
                  { value: 'Finance', label: 'Finance' },
                  { value: 'Marketing', label: 'Marketing' },
                  { value: 'Laundry', label: 'Laundry' },
                ]}
              ></Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item 
                name="designation" 
                label="Designation" 
                required rules={[{ required: true, message: 'Please select a designation!' }]}>
              <Select
                placeholder="Select User Designation"
                allowClear
                style={{ width: '100%' }}
                options={[
                  { value: 'GM', label: 'General Manager' }, { value: 'Asst. GM', label: 'Asst General Manager' },  
                  { value: 'Hod', label: 'HoD' }, { value: 'Room Attendant', label: 'Room Attendant' },
                  { value: 'Supervisor', label: 'Supervisor' }, { value: 'Security', label: 'Security' },
                  { value: 'Receptionist', label: 'Receptionist' }, { value: 'Chef', label: 'Chef' },
                  { value: 'Waiter', label: 'Waiter' }, { value: 'Laundry', label: 'Laundry' },
                  { value: 'Engineer', label: 'Engineer' }, { value: 'IT Manager', label: 'IT Manager' },
                  { value: 'Hr', label: 'HR' }, { value: 'Finance', label: 'Finance' },
                  { value: 'Marketing', label: 'Marketing' }, { value: 'Sales', label: 'Sales' },
                  { value: 'Executive Chef', label: 'Executive Chef' }, { value: 'IT Support', label: 'IT Support' },
                  { value: 'Operations Technician', label: 'Operations Technician' },
                ]}
              />
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
              <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} htmlType="submit" onClick={() => {navigate(-1)}}>Go Back</Button>
            </div>
            <div className="user_submit">
              <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} htmlType="submit">Update</Button>
            </div>
        </Form>
    </Layout>
  )
}

export default EditUser