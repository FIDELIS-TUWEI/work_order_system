import { Card, Col, DatePicker, Form, Input, Row, Typography } from "antd"
import Layout from "../../../components/Layout"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import axios from "axios";
const WORK_URL = "/hin";


const WorkDetails = () => {
    const dispatch = useDispatch();
    const [workDetails, setWorkDetails] = useState([]);
    const token = useSelector(selectToken);

    useEffect(() => {
        getWorkDetails();
    }, []);

    const getWorkDetails = async () => {
        try {
            const res = await axios.get(`${WORK_URL}/getall/work`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setWorkDetails(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(workDetails);

  return (
    <Layout>
        <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
           Manage Work Details
        </Typography>
        <Card title="Work Details" style={{ width: "700px", margin: "auto", textAlign: "center " }}>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item 
                        label="Title" 
                        name="title" 
                    >
                        <Input type='text' placeholder="Enter Work Title" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item 
                        label="Location" 
                        name="location" 
                    >
                        <Input type='text' placeholder="Enter Work Location" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item 
                        label="Service Type" 
                        name="serviceType" 
                    >
                        <Input type='text' placeholder="Enter Service Type" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item 
                        label="Status" 
                        name="status" 
                    >
                        <Input type='text' placeholder="Enter Status" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item 
                        label="Date Requested" 
                        name="date" 
                    >
                        <Input type='text' placeholder="Enter Date Requested" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item
                        label="Assigned To"
                        name="assignedTo"
                    >
                        <Input type='text' placeholder="Enter Assigned To" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item
                        label="Date Completed"
                        name="dateCompleted"
                    >
                        <Input type='text' placeholder="Date Completed" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item
                        label="Reviewed"
                        name="reviewedBy"
                    >
                        <Input type='text' placeholder="Enter Reviewed" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item
                        label="Reviewed By"
                        name="reviewedBy"
                    >
                        <Input type='text' placeholder="Enter Reviewed By" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item
                        label="Reviewed Date"
                        name="reviewedDate"
                    >
                        <DatePicker format={'YYYY-MM-DD'} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item
                        label="Review Comments"
                        name="reviewComments"
                    >
                        <Input type='text' placeholder="Enter Review Comments" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}></Col>
                <Col xs={24} md={24} lg={8}></Col>


            </Row>
        </Card>
    </Layout>
  )
}

export default WorkDetails