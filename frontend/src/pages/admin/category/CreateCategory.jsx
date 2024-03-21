import PropTypes from "prop-types"
import { Button, Card, Col, Form, Input, Row, Typography } from "antd"
import LoadingBox from "@/components/LoadingBox";

const CreateCategory = ({ loading, onFinishHandler, navigate }) => {
  return (
    <div>
        <Typography
            style={{
                display: "flex", justifyContent: "center",
                alignItems: "center", fontSize: "1.5rem", fontWeight: "bold"
            }}
        >
            New Category Form
        </Typography>
        <Card title="Add Category" style={{ margin: '15px' }}>
            <Form onFinish={onFinishHandler} layout="vertical">
                <Row gutter={16}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            name="categoryTitle"
                            label="Create Category"
                            required rules={[{ required: true, message: "Please Enter new Category" }]}
                        >
                            <Input type="text" placeholder="New Category" />
                        </Form.Item>
                    </Col>
                </Row>
                <div>
                    <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} onClick={() => {navigate(-1)}}>Go Back</Button>
                </div>
                <div className="submit--btn">
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

CreateCategory.propTypes = {
    loading: PropTypes.bool,
    onFinishHandler: PropTypes.func,
    navigate: PropTypes.func
}

export default CreateCategory;