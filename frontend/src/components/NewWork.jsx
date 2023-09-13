import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography } from "antd";
import LoadingBox from "./LoadingBox";

const { Option } = Select;
const { RangePicker } = DatePicker;

const NewWork = ({ 
  loading, location, category, 
  onFinishHandler, selectedLocation, 
  selectedCategory, handleLocationChange, 
  handleCategoryChange 
}) => {

  const [selectedDate, setSelectedDate] = useState([]);


  // Function to handle date change
  const handleDateChange = (dateRange) => {
    setSelectedDate(dateRange);
  }

  return (
    <>
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
          <Col xs={24} md={24} lg={8}>
            <Form.Item 
              name="dueDate" 
              label="Due Date" 
              required rules={[{ required: true, message: 'Please Select a Due Date!' }]}>
              <RangePicker style={{ width: '100%' }} format={"YYYY-MM-DD"} onChange={handleDateChange} value={selectedDate} />
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

export default NewWork