import { Button, Card, Col, Form, Input, Row, Typography } from "antd"

const EditUserPassword = ({ onFinishHandler, newPassword, setNewPassword }) => {
  return (
    <>
        <Typography
            style={{
                display: "flex", justifyContent: "center",
                alignItems: "center", fontSize: "1.5rem", fontWeight: "bold"
            }}
        >
            Change User Password Form
        </Typography>

        <Card title="Change Password" style={{ margin: "15px" }}>
            <Form onFinish={onFinishHandler} layout="vertical" style={{ margin: '18px' }}>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            name="password"
                            label="New Password"
                            required rules={[
                                { required: true, message: "Please Enter your New Password" },
                                { min: 8, message: "Password must be atleast 8 characters long" },
                            ]}
                        >
                            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter New Password" />
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