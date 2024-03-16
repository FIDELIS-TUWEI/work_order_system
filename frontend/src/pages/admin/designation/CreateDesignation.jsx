import PropTypes from 'prop-types';
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import LoadingBox from "@/components/LoadingBox";

const CreateDesignation = ({ loading, onFinishHandler, navigate }) => {
  return (
    <>
      <Typography
        style={{
          display: "flex", justifyContent: "center",
          alignItems: "center", fontSize: "1.5rem", fontWeight: "bold"
        }}
      >
        Create New Designation Form
      </Typography>
      <Card title="Add Designation" style={{ margin: '15px' }}>
        <Form layout="vertical" onFinish={onFinishHandler} >
          <Row gutter={16}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                name="designationName"
                label="Create Designation"
                required rules={[{ required: true, message: "Please Enter new Designation" }]}
              >
                <Input type="text" placeholder="New Designation" />
              </Form.Item>
            </Col>
          </Row>
          
          <div className="submit--btn">
            <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} htmlType="submit">Submit</Button>
          </div>
          <Col xs={24} md={24} lg={8}></Col>
          <div className="loader">
            { loading && <LoadingBox /> }
          </div>
        </Form>

        <div>
          <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} htmlType="submit" onClick={() => {navigate(-1)}}>Go Back</Button>
        </div>
      </Card>
    </>
  )
};

CreateDesignation.propTypes = {
  loading: PropTypes.bool,
  onFinishHandler: PropTypes.func,
  navigate: PropTypes.func
}

export default CreateDesignation;