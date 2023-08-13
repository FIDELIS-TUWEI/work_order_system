import React from 'react'
import Layout from '../../../components/Layout'
import { Col, Form, Row, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { selectUserInfo } from '../../../utils/redux/slices/authSlice'

const EditWorkOrder = () => {
  const user = useSelector(selectUserInfo);
  
  return (
    <Layout>
        <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Edit Work Order
        </Typography>
        <Form layout='vertical' style={{ margin: '18px' }}>
            <Typography style={{ fontSize: '1rem', fontWeight: '500' }}>Work Details: </Typography>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={8}></Col>
                <Col xs={24} md={24} lg={8}></Col>
                <Col xs={24} md={24} lg={8}></Col>
                <Col xs={24} md={24} lg={8}></Col>
            </Row>
        </Form>
    </Layout>
  )
}

export default EditWorkOrder