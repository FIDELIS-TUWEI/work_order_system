import PropTypes from 'prop-types';
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import LoadingBox from './LoadingBox';

const CreateEmployee = ({ onFinishHandler, loading, navigate }) => {

  return (
    <div>
      <Typography
        style={{ 
          display: "flex", justifyContent: "center",
          alignItems: "center", fontSize: "1.5rem", fontWeight: "bold"
         }}
      >
        New Employee Form
      </Typography>
      <Card title="Add Employee" style={{ margin: '15px' }} loading={loading}>
        <Form layout="vertical" onFinish={onFinishHandler}>
          <Row gutter={16}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                name="firstName"
                label="First Name"
                required rules={[{ required: true, message: 'Please Enter Employee First Name!' }]}
              >
                <Input type="text" placeholder="Enter Employee First Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                name="lastName"
                label="Last Name"
                required rules={[{ required: true, message: 'Please Enter Employee Last Name!' }]}
              >
                <Input type="text" placeholder="Enter Employee Last Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                name="phone"
                label="Phone Number"
                required rules={[{ required: true, message: 'Please Enter Employee Phone Number!' }]}
              >
                <Input type="text" placeholder="Enter Employee Phone Number" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                name="username"
                label="Username"
                required rules={[{ required: true, message: 'Please Enter Employee Username!' }]}
              >
                <Input type="text" placeholder="Enter Employee Username" />
              </Form.Item>
            </Col>
          </Row>
          <div>
            <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} onClick={() => {navigate(-1)}}>Go Back</Button>
          </div>
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

CreateEmployee.propTypes = {
  loading: PropTypes.bool,
  onFinishHandler: PropTypes.func,
  navigate: PropTypes.func,
};

export default CreateEmployee;