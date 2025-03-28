import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd"
import { useNavigate } from "react-router-dom";
import LoadingBox from "@/components/LoadingBox";

const EditUserPassword = ({ onFinishHandler, password, setPassword, loading }) => {
  const navigate = useNavigate();

  const passwordRules = [
    { required: true, message: "Enter your new password" },
    { min: 8, message: "Password must be at least 8 characters long" },
  ];

  const titleStyle = {
    display: "flex", justifyContent: "center",
    alignItems: "center", fontSize: "1.5rem", fontWeight: "bold"
  };

  const cardStyle = { margin: "15px" };
  const formStyle = { margin: '18px' };
  const submitStyle = { className: "submit--btn" };

  return (
    <>
      <Typography style={titleStyle}>
        Change User Password Form
      </Typography>

      <Card title="Change Password" style={cardStyle}>
        <Form onFinish={onFinishHandler} layout="vertical" style={formStyle}>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                name="password"
                label="New Password"
                required
                rules={passwordRules}
              >
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter New Password"
                />
              </Form.Item>
            </Col>
          </Row>
          
          <div {...submitStyle}>
            <Button
              style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}
              htmlType="submit"
            >
              Change Password
            </Button>
          </div>
          <Col xs={24} md={24} lg={8}></Col>
          <div className="loader">
            { loading && <LoadingBox /> }
          </div>
        </Form>
        <div className="add-btn">
          <Button
            onClick={() => navigate(-1)}
            style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none', marginLeft: '10px' }} 
          >
            Back
          </Button>
        </div>
      </Card>
    </>
  )
};

EditUserPassword.propTypes = {
  onFinishHandler: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default EditUserPassword;