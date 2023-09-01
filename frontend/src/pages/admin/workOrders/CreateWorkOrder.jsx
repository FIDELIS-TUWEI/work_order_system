import { 
  Button, Card, Col, Form, Input, 
  Row, Select, Typography, message 
} from 'antd'
import Layout from '../../../components/Layout'
import { useEffect, useState } from 'react'
import { createWorkOrder, getWorkLocations } from '../../../services/workApi'
import { useNavigate } from 'react-router-dom'
import LoadingBox from '../../../components/LoadingBox'
import { useSelector } from 'react-redux'
import { selectToken } from '../../../utils/redux/slices/authSlice'
import { allWorkCategories } from '../../../services/categoryApi'

const { Option } = Select;

const CreateWorkOrder = () => {
  const token = useSelector(selectToken);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  // function to handle form submit
  const onFinishHandler = async (values) => {
    setLoading(true);
    await createWorkOrder(values);
    navigate('/work/list');
    message.success('Work Order Created Successfully');
    setLoading(false);
  };

  // Function to handle change in location
  const handleLocationChange = (value) => {
    setSelectedLocation(value);
  }

  // Function to get all work Locations from Services Api
  const workLocation = async () => {
    const response = await getWorkLocations({
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setLocation(response.data)
  };

  // Function to handle change in category
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  }

  // Function to get all categories from Services Api
  const getCategories = async () => {
    const response = await allWorkCategories({
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setCategory(response.data);
  }

  useEffect(() => {
    workLocation();
    getCategories();
  }, []);

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>New Work Order</Typography>
      <Card style={{ margin: '15px' }}>
      <Form onFinish={onFinishHandler} layout='vertical' style={{ margin: '18px' }}>
        <Typography style={{ fontSize: '1rem', fontWeight: '500' }}>Work Details: </Typography>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item 
                name="title" 
                label="Title" 
                required rules={[{ required: true, message: 'Please Enter Work Title!' }]}>
              <Input type='text' placeholder='Work Title' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item 
                name="location" 
                label="Work Location" 
                required rules={[{ required: true, message: 'Please Select Work Location!' }]}>
              <Select 
                placeholder='Select Work Location'
                onChange={handleLocationChange}
                value={selectedLocation}
                allowClear
                style={{ width: '100%' }}
              >
                {location.map((location) => (
                  <Option key={location._id} value={location._id}>{location.locationTitle}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item 
                name="serviceType" 
                label="Service Type" 
                required rules={[{ required: true, message: 'Please Select a service type!' }]}>
              <Select 
                placeholder='Select Service Type' 
                allowClear
                style={{ width: '100%' }}
                options={[
                  { value: 'Fix', label: 'Fix' }, { value: 'Repair', label: 'Repair' }, 
                  { value: 'Replace', label: 'Replace' }, { value: 'Install', label: 'Install' }
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item 
                name="category" 
                label="Select Category" 
                required rules={[{ required: true, message: 'Please Select a category!' }]}>
              <Select 
                placeholder='Select Category'
                onChange={handleCategoryChange}
                value={selectedCategory}
                allowClear
                style={{ width: '100%' }}
              >
                {category.map((category) => (
                  <Option key={category._id} value={category._id}>{category.categoryTitle}</Option>
                ))}
              </Select>
            </Form.Item>  
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              name="priority"
              label="Priority"
              required
              rules={[{ required: true, message: 'Please Select a priority!' }]} 
            >
              <Select 
                  placeholder='Select Priority'
                  allowClear
                  style={{ width: '100%' }}
                  options={[
                    { value: 'Normal', label: 'Normal' }, { value: 'Urgent', label: 'Urgent' }
                  ]}
                />
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
    </Layout>
  )
}

export default CreateWorkOrder