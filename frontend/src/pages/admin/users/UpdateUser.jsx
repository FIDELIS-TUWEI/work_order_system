import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/features/auth/authSlice";
import { Button, Card, Col, Form, Input, Row, Select, Typography, message } from "antd";
import LoadingBox from "@/components/LoadingBox";

const { Option } = Select;

const UpdateUser = ({ onFinishHandler, userDataArray, navigate, loading, departmentsArray, selectedDepartment, handleDepartmentChange, designationsArray, selectedDesignation, handleDesignationChange }) => {

  const user = useSelector(selectUserInfo);

  // Conditionally exclude  the "superadmin" role value if the user logged in is not an "superadmin"
  const isSuperAdmin = user?.role === "superadmin";

  return (
    <div>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>Edit User Details</Typography>
      <Card title={userDataArray?.username} style={{ margin: '15px' }}>
        <Form onFinish={onFinishHandler} layout="vertical" style={{ margin: "18px"}}>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item 
                name="firstName" 
                label="First Name"
              > 
                <Input type='text' placeholder={userDataArray?.firstName} />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item 
                name="lastName" 
                label="Last Name" 
              >
                <Input type='text' placeholder={userDataArray?.lastName} />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item 
                name="email" 
                label="Email Address" 
              >
                <Input type='text' placeholder={userDataArray?.email} />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
            <Form.Item
                name="department"
                label="Department"
                required
                rules={[{ required: true, message: 'Please Select a department!' }]}
            >
              <Select
                placeholder="Select User Department"
                onChange={handleDepartmentChange}
                value={selectedDepartment}
                allowClear
                style={{ width: '100%' }}
              >
                {departmentsArray.map((department) => (
                  <Option key={department._id} value={department._id}>{department.departmentName}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item 
                name="designation" 
                label="Designation" 
                required rules={[{ required: true, message: 'Please select a designation!' }]}>
              <Select
                placeholder="Select User Designation"
                onChange={handleDesignationChange}
                value={selectedDesignation}
                allowClear
                style={{ width: '100%' }}
              >
                {designationsArray.map((designation) => (
                  <Option key={designation._id} value={designation._id}>{designation.designationName}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                name="role"
                label="Role"
                required
                rules={[{ required: true, message: isSuperAdmin ? 'Please Enter a role !' : 'You don\'t have permission to select this role' }]}
              >
                <Select 
                  placeholder="Select Role"
                  allowClear
                  style={{ width: '100%' }}
                  options={[
                    { value: 'admin', label: 'Admin' }, { value: 'user', label: 'User' }, { value: 'engineer', label: 'Engineer' }, 
                    { value: 'hod', label: 'HoD' }, { value: isSuperAdmin ? 'superadmin' : "", label: 'Super Admin' },
                    { value: 'supervisor', label: 'Supervisor' }, { value: 'reviewer', label: 'Reviewer' }, { value: 'maintenance', label: 'Maintenance' }
                  ]}
                  onChange={(value) => {
                    if (value === "superadmin" && !isSuperAdmin) {
                      message.error("You don't have permission to select this role")                    }
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item 
                  name="status" 
                  label="Status" 
                  required rules={[{ required: true, message: 'Please Enter a status!' }]}>
                <Select
                  placeholder="Select Status"
                  allowClear
                  style={{ width: '100%' }}
                  options={[
                    { value: true, label: 'Active' }, { value: false, label: 'Inactive' }, 
                  ]}
                />
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

// Props validation
UpdateUser.propTypes = {
  onFinishHandler: PropTypes.func,
  userDataArray: PropTypes.array,
  navigate: PropTypes.func,
  loading: PropTypes.bool,
  departmentsArray: PropTypes.array,
  selectedDepartment: PropTypes.string,
  handleDepartmentChange: PropTypes.func,
  designationsArray: PropTypes.array,
  selectedDesignation: PropTypes.string,
  handleDesignationChange: PropTypes.func
};

export default UpdateUser;