import PropTypes from "prop-types";
import { Button, Card, Col, Form, Input, Row, Select, Typography } from "antd";
import LoadingBox from "@/components/LoadingBox";

const { Option } = Select;

const NewWork = ({ 
  loading, locationsArray, categoriesArray, 
  onFinishHandler, selectedLocation, 
  selectedCategory, handleLocationChange, 
  handleCategoryChange, navigate
}) => {

  return (
    <>
    <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>New Work Order</Typography>
      <Card style={{ margin: '15px' }}>
      <Form onFinish={onFinishHandler} layout='vertical' style={{ margin: '18px' }}>
        <Typography style={{ fontSize: '1rem', fontWeight: '500' }}>Work Details: </Typography>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item 
                name="location" 
                label="Work Location" 
                required rules={[{ required: true, message: 'Please Select Work Location!' }]}>
              <Select 
                mode="multiple"
                placeholder='Select Work Location'
                onChange={handleLocationChange}
                value={selectedLocation}
                allowClear
                style={{ width: '100%' }}
                showSearch
                filterOption={false}
              >
                {locationsArray.map((location) => (
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
                  { value: 'Replace', label: 'Replace' }, { value: 'Install', label: 'Install' },
                  { value: 'Upgrade', label: 'Upgrade' }, { value: 'Remove', label: 'Remove' },
                  { value: 'Touchup', label: 'Touchup' }, { value: 'Move', label: 'Move' },
                  { value: 'Paint', label: 'Paint' }, { value: 'Prune', label: 'Prune' },
                  { value: 'Clean', label: 'Clean' }, { value: 'Check', label: 'Check' },
                  { value: 'Service', label: 'Service' }, { value: 'Arrange', lable: 'Arrange' }
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
                showSearch
                filterOption={false}
              >
                {categoriesArray.map((category) => (
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
                name="description" 
                label="Work Description" 
                required 
                rules={[
                  { required: true, message: 'Please Enter Work Description!' },
                  { min: 10, message: 'Work Description must be at least 10 characters' },
                  { max: 80, message: "Description can only be 80 characters long!" }
                ]}
            >
              <Input type='text' placeholder='Work Description' />
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

NewWork.propTypes = {
  locationsArray: PropTypes.array,
  categoriesArray: PropTypes.array,
  handleLocationChange: PropTypes.func,
  handleCategoryChange: PropTypes.func,
  onFinishHandler: PropTypes.func,
  selectedLocation: PropTypes.string,
  selectedCategory: PropTypes.string,
  loading: PropTypes.bool,
  navigate: PropTypes.func
};

export default NewWork;