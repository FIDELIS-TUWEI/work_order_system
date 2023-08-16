import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import { Button, Col, DatePicker, Form, Input, Row, Select, Typography, message } from 'antd'
import { useSelector } from 'react-redux'
import { selectToken, selectUserInfo } from '../../../utils/redux/slices/authSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleWorkOrder, updateWorkOrder } from '../../../services/workApi'

const EditWorkOrder = () => {
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const [workDetails, setWorkDetails] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      getWorkOrderDetails(id);
    }
  }, [id]);

  // Function to handle form submit
  const onFinishHandler = async (values) => {
    await updateWorkOrder(id, values);
    navigate('/work/list');
    message.success('Work Order Updated Successfully');
  }

  // Function to get work order details
  const getWorkOrderDetails = async (id) => {
    const res = await getSingleWorkOrder(id, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setWorkDetails({...res.data});
  }
  
  return (
    <Layout>
        <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Edit Work Order
        </Typography>
        <Form onFinish={onFinishHandler} layout='vertical' style={{ margin: '18px' }}>
            <Typography style={{ fontSize: '1rem', fontWeight: '500', textDecoration: 'underline', marginBottom: '10px' }}>
              Task Title: {workDetails && workDetails.title}
            </Typography>
            
            {
              user && user.role === 'admin' || user && user.role === 'hod' || user && user.role === 'superadmin' || user && user.role === 'supervisor' ? (
                <></>
              ) : (
                <></>
              )
            }
            <Row gutter={20}>
            {
              workDetails && workDetails.status === 'Pending' ? (
                <>
                  <Col xs={24} md={24} lg={8}>
                    <Form.Item
                      label="Assigned To"
                      name="assignedTo"
                      rules={[{ required: true, message: 'Please Enter Employee Name!' }]}
                    >
                      <Input type='text' placeholder='Enter employee name to assign' />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={8}>
                    <Form.Item
                      label="Status"
                      name="status"
                      rules={[{ required: true, message: 'Please Select Work Status!' }]}
                    >
                      <Select 
                        placeholder='Select Status'
                        allowClear
                        style={{ width: '100%' }}
                        options={[
                          { value: 'Pending', label: 'Pending' }, { value: 'In_Progress', label: 'In Progress' }, 
                          { value: 'Complete', label: 'Complete' }, { value: 'Reviewed', label: 'Reviewed' }
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={8}>
                    <Form.Item
                      label="Date Assigned"
                      name="dateAssigned"
                      rules={[{ required: true, message: 'Please Enter Date Assigned!' }]}
                    >
                      <DatePicker format='YYYY-MM-DD' />
                    </Form.Item>
                  </Col>
                </>
              ) : workDetails && workDetails.status === 'In_Progress' ? (
                <>
                  <Col xs={24} md={24} lg={8}>
                      <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: 'Please Select Work Status!' }]}
                      >
                        <Select 
                          placeholder='Select Status'
                          allowClear
                          style={{ width: '100%' }}
                          options={[
                            { value: 'Pending', label: 'Pending' }, { value: 'In_Progress', label: 'In Progress' }, 
                            { value: 'Complete', label: 'Complete' }, { value: 'Reviewed', label: 'Reviewed' }
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                      <Form.Item
                        label="Comments"
                        name="comments"
                        rules={[{ required: true, message: 'Please Enter Comments!' }]}
                      >
                        <Input type='text' placeholder='Enter comments' />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                      <Form.Item
                        label="Date Completed"
                        name="dateCompleted"
                        rules={[{ required: true, message: 'Please Enter Date Completed!' }]}
                      >
                        <DatePicker format='YYYY-MM-DD' />
                      </Form.Item>
                    </Col>
                </>
              ) : (
                <>
                {
                  user && user.role === 'admin' || user && user.role === 'reviewer' ? (
                    <>
                      <Col xs={24} md={24} lg={8}>
                        <Form.Item
                          label="Reviewed"
                          name="reviewed"
                          rules={[{ required: true, message: 'Please Select Work Review Status!' }]}
                        >
                          <Select 
                            placeholder='Select Review Status'
                            allowClear
                            style={{ width: '100%' }}
                            options={[
                              { value: true, label: 'Reviewed' }, { value: false, label: 'Not Reviewed' }
                            ]}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={8}>
                        <Form.Item
                          label="Reviewed By"
                          name="reviewedBy"
                          rules={[{ required: true, message: 'Please Enter Your Name!' }]}
                        >
                          <Input type='text' placeholder='Enter your name' />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={8}>
                        <Form.Item
                          label="Review Comments"
                          name="reviewComments"
                          rules={[{ required: true, message: 'Please Enter Review Comments!' }]}
                        >
                          <Input type='text' placeholder='Enter comments' />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={8}>
                        <Form.Item
                          label="Date Reviewed"
                          name="dateReviewed"
                          rules={[{ required: true, message: 'Please Enter Date Reviewed!' }]}
                        >
                          <DatePicker format='YYYY-MM-DD' />
                        </Form.Item>
                      </Col>
                    </>
                  ) : ''}
                </>
              )
            }
                
                
                
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

export default EditWorkOrder