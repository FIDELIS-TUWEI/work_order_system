import { Button, Card, Col, Form, Input, Row, Typography } from "antd"

const EditUserPassword = ({ onFinishHandler }) => {
  return (
    <>
        <Typography>
            Change User Password Form
        </Typography>

        <Card title="Change Password" style={{ margin: "15px" }}>
            <Form onFinish={onFinishHandler} layout="vertical" style={{ margin: '18px' }}>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            name="oldPassword"
                            label="Old Password"
                            required rules={[{ required: true, message: "Please Enter your Old Password" }]}
                        >
                            <Input type="password" value="" onChange={(e) => setOldPassword(e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            name="newPassword"
                            label="New Password"
                            required rules={[
                                { required: true, message: "Please Enter your New Password" },
                                { min: 8, message: "Password must be atleast 8 characters long" },
                            ]}
                        >
                            <Input type="password" value="" onChange={(e) => setNewPassword(e.target.value)} />
                        </Form.Item>
                    </Col>
                </Row>
                <div className="user_submit">
                    <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} htmlType="submit">Change Password</Button>
                </div>
            </Form>
        </Card>
    </>
  )
}

export default EditUserPassword