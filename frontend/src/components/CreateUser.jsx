import { Button, Card, Col, Form, Input, Row, Select, Typography } from 'antd'
import LoadingBox from "./LoadingBox"

const CreateUser = ({ onFinishHandler, loading}) => {
  return (
    <div>
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
                name="email" 
                label="Email" 
                required rules={[{ required: true, message: 'Please Enter your Company email!' }]}>
              <Input type='text' placeholder='Enter Email' />
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
                required rules={[{ required: true, message: 'Please Enter a password!' }]}>
              <Input type='password' placeholder='Enter Password' />
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
    </div>
  )
}

export default CreateUser;