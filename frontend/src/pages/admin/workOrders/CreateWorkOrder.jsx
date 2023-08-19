import { Button, Col, DatePicker, Form, Input, Row, Select, TimePicker, Typography, message } from 'antd'
import Layout from '../../../components/Layout'
import { useState } from 'react'
import { createWorkOrder } from '../../../services/workApi'
import { useNavigate } from 'react-router-dom'
import LoadingBox from '../../../components/LoadingBox'

const CreateWorkOrder = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // function to handle form submit
  const onFinishHandler = async (values) => {
    setLoading(true);
    await createWorkOrder(values);
    navigate('/work/list');
    message.success('Work Order Created Successfully');
    setLoading(false);
  }

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>New Work Order</Typography>
      <Form onFinish={onFinishHandler} layout='vertical' style={{ margin: '18px' }}>
        <Typography style={{ fontSize: '1rem', fontWeight: '500' }}>Work Details: </Typography>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item 
                name="title" 
                label="Title" 
                required rules={[{ required: true, message: 'Please Enter Work Title!' }]}>
              <Input type='text' placeholder='Work Title' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item 
                name="location" 
                label="Work Location" 
                required rules={[{ required: true, message: 'Please Select Work Location!' }]}>
              <Select 
                placeholder='Select Work Location' 
                allowClear
                style={{ width: '100%' }}
                options={[
                  { value: 'Room', label: 'Room' }, { value: 'Back-office', label: 'Back-Office' },
                  { value: 'Admin-Office', label: 'Admin-Office' }, { value: 'Pool-area', label: 'Pool-Area' }
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item 
                name="serviceType" 
                label="Service Type" 
                required rules={[{ required: true, message: 'Please Select a service type!' }]}>
              <Select 
                placeholder='Select Service Type' 
                allowClear
                style={{ width: '100%' }}
                options={[
                  { value: 'Fix', label: 'Fix' }, { value: 'Repair', label: 'Repair' }, 
                  { value: 'Replace', label: 'Replace' }, { value: 'Install', label: 'Install' }
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item 
                name="category" 
                label="Select Category" 
                required rules={[{ required: true, message: 'Please Select a category!' }]}>
              <Select 
                placeholder='Select Category'
                allowClear
                style={{ width: '100%' }}
                options={[
                  { value: 'Electrical', label: 'Electrical' }, { value: 'Plumbing', label: 'Plumbing' },
                  { value: 'HVAC', label: 'HVAC' }, { value: 'Painting', label: 'Painting' },
                  { value: 'Door Lock', label: 'Door Lock' }, { value: 'Room-safe', label: 'Room-Safe' },
                  { value: 'IT', label: 'IT' }, { value: 'Other', label: 'Other' }
                ]} 
              />
            </Form.Item>  
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              name="priority"
              label="Priority"
              required
              rules={[{ required: true, message: 'Please Select a priority!' }]} 
            >
              <Select 
                  placeholder='Select Priority'
                  allowClear
                  style={{ width: '100%' }}
                  options={[
                    { value: 'Normal', label: 'Normal' }, { value: 'Urgent', label: 'Urgent' }
                  ]}
                />
            </Form.Item>
          </Col>
        </Row>
        <div>
          <Button type="primary" htmlType="submit" onClick={() => {navigate(-1)}}>Go Back</Button>
        </div>
        <div className="user_submit">
          <Button type="primary" htmlType="submit">Submit</Button>
        </div>
        <Col xs={24} md={24} lg={8}></Col>
        <div className="loader">
          { loading && <LoadingBox /> }
        </div>
      </Form>
    </Layout>
  )
}

export default CreateWorkOrder