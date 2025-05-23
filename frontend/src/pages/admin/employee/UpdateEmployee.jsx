import PropTypes from "prop-types";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import LoadingBox from "@/components/LoadingBox";
import { useNavigate } from "react-router-dom";

const UpdateEmployee = ({ onFinishHandler, employeeDetails, loading }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>Edit Employee Details</Typography>
      <Card title="Edit Employee Details" style={{ margin: '15px' }}>
        <Form onFinish={onFinishHandler} layout="vertical" style={{ margin: "18px" }}>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                name="firstName"
                label="First Name"
              >
                <Input type="text" placeholder={employeeDetails?.firstName}/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                name="lastName"
                label="Last Name"
              >
                  <Input type="text" placeholder={employeeDetails?.lastName} />
                </Form.Item>
              </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                name="username"
                label="Username"
              >
                  <Input type="text" placeholder={employeeDetails?.username} />
                </Form.Item>
              </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                name="phone"
                label="Phone Number"
              >
                <Input type="text" placeholder={employeeDetails?.phone} />
              </Form.Item>
            </Col>
          </Row>

          <div className="submit--btn">
            <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} htmlType="submit">Update</Button>
          </div>
          <Col xs={24} md={24} lg={8}></Col>
          <div className="loader">
            { loading && <LoadingBox /> }
          </div>
        </Form>
        <div>
            <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} onClick={() => {navigate(-1)}}>Go Back</Button>
          </div>
      </Card>
    </div>
  )
};

UpdateEmployee.propTypes = {
  onFinishHandler: PropTypes.func,
  employeeDetails: PropTypes.object,
  loading: PropTypes.bool
};

export default UpdateEmployee;