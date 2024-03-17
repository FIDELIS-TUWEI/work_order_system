import LoadingBox from "@/components/LoadingBox";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import PropTypes from "prop-types";

const UpdateCategory = ({ onFinishHandler, categoryInfo, loading, navigate }) => {
  return (
    <div>
        <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Edit Category Details
        </Typography>
        <Card title="Edit category Details" style={{ margin: "18px" }}>
            <Form layout="vertical" onFinish={onFinishHandler} style={{ margin: "18px" }}>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            name="categoryTitle"
                            label="Category Title"
                        >
                            <Input type="text" placeholder={categoryInfo?.categoryTitle} />
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
                <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} htmlType="submit" onClick={() => {navigate(-1)}}>Go Back</Button>
            </div>
        </Card>
    </div>
  )
};

UpdateCategory.propTypes = {
    onFinishHandler: PropTypes.func,
    categoryInfo: PropTypes.object,
    loading: PropTypes.bool,
    navigate: PropTypes.func
}

export default UpdateCategory