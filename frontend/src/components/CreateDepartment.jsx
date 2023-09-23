import { Button, Card, Col, Form, Input, Row, Typography } from "antd"
import LoadingBox from "./LoadingBox"

const CreateDepartment = ({loading, onFinishHandler, navigate}) => {
  return (
    <>
      <Typography
        style={{
          display: "flex", justifyContent: "center",
          alignItems: "center", fontSize: "1.5rem", fontWeight: "bold"
        }}
      >
        Create New Department Form
      </Typography>
      <Card title="Add Department" style={{ margin: '15px' }}>
        <Form layout="vertical" onFinish={onFinishHandler}>
          <Row gutter={16}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                name="departmentName"
                label="Create Department"
                required rules={[{ required: true, message: "Please Enter new Department" }]}
              >
                <Input type="text" placeholder="New Department" />
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

export default CreateDepartment