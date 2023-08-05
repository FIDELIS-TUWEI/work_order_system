import { Button, Col, DatePicker, Form, Input, Row, TimePicker, Typography } from 'antd'
import Layout from '../components/Layout'

const Register = () => {
  // function to create user
  const onFinishHandler = async (values) => {
    console.log('Success:', values);
  }

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>Register Registration</Typography>
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