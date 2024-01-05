import PropTypes from 'prop-types'
import { Button, Card, Col, Form, Input, Row, Select, Typography } from 'antd'
import LoadingBox from "../../../components/LoadingBox"

const {Option} = Select;

const CreateUser = ({ 
  onFinishHandler, loading, allDepartments, allDesignations,
  selectedDepartment, selectedDesignation,
  handleDepartmentChange, handleDesignationChange 
}) => {
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
                onChange={handleDepartmentChange}
                value={selectedDepartment}
                allowClear
                style={{ width: '100%' }}
              >
                {allDepartments.map((department) => (
                  <Option key={department._id} value={department._id}>{department.departmentName}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item 
                name="designation" 
                label="Designation" 
                required rules={[{ required: true, message: 'Please select a designation!' }]}>
              <Select
                placeholder="Select User Designation"
                onChange={handleDesignationChange}
                value={selectedDesignation}
                allowClear
                style={{ width: '100%' }}
              >
                {allDesignations.map((designation) => (
                  <Option key={designation._id} value={designation._id}>{designation.designationName}</Option>
                ))}
              </Select>
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
};

CreateUser.propTypes = {
  loading: PropTypes.bool,
  onFinishHandler: PropTypes.func,
  allDepartments: PropTypes.array,
  allDesignations: PropTypes.array,
  selectedDepartment: PropTypes.string,
  selectedDesignation: PropTypes.string,
  handleDepartmentChange: PropTypes.func,
  handleDesignationChange: PropTypes.func
}

export default CreateUser;