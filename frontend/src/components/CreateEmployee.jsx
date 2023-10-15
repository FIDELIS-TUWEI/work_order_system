import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const navigate = useNavigate();

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
      <Card title="Add Employee" style={{ margin: '15px' }}>
        <Form layout="vertical">
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
                <Input type="email" placeholder="Enter Employee Username" />
              </Form.Item>
            </Col>
          </Row>
          <div>
            <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} onClick={() => {navigate(-1)}}>Go Back</Button>
          </div>
          <div className="user_submit">
            <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} htmlType="submit">Submit</Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default CreateEmployee;