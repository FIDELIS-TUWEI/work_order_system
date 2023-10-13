import { Button, Card, Col, Form, Input, Row, Typography } from "antd"
import LoadingBox from "./LoadingBox"

const CreateLocation = ({ loading, onFinishHandler, navigate }) => {
  return (
    <>
        <Typography
            style={{
                display: "flex", justifyContent: "center",
                alignItems: "center", fontSize: "1.5rem", fontWeight: "bold"
            }}
        > 
            Create Location Form
        </Typography>
        <Card title="Add Location" style={{ margin: '15px' }}>
            <Form layout="vertical" onFinish={onFinishHandler}>
                <Row gutter={16}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            name="locationTitle"
                            label="Create Location"
                            required rules={[{ required: true, message: "Please Enter new Location" }]}
                        >
                            <Input type="text" placeholder="New Location" />
                        </Form.Item>
                    </Col>
                </Row>
                <div>
                    <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} htmlType="submit" onClick={() => {navigate(-1)}}>Go Back</Button>
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
    </>
  )
}

export default CreateLocation;