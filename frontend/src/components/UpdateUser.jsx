import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../utils/redux/slices/authSlice";
import { Button, Card, Col, Form, Input, Row, Select, Typography, message } from "antd";
import LoadingBox from "./LoadingBox";

const { Option } = Select;

const UpdateUser = ({ onFinishHandler, userDetails, navigate, loading, allDepartments, selectedDepartment, handleDepartmentChange, allDesignations, selectedDesignation, handleDesignationChange }) => {

  const user = useSelector(selectUserInfo);

  // Conditionally exclude  the "superadmin" role value if the user logged in is not an "superadmin"
  const isSuperAdmin = user?.role === "superadmin";

  return (
    <div>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>Edit User Details</Typography>
      <Card title={userDetails?.username} style={{ margin: '15px' }}>
        <Form onFinish={onFinishHandler} layout="vertical" style={{ margin: "18px"}}>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item 
                name="firstName" 
                label="First Name"
              > 
                <Input type='text' placeholder={userDetails?.firstName} />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item 
                name="lastName" 
                label="Last Name" 
              >
                <Input type='text' placeholder={userDetails?.lastName} />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item 
                name="email" 
                label="Email Address" 
              >
                <Input type='text' placeholder={userDetails?.email} />
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
                {allDepartments.map((department) => (
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
                {allDesignations.map((designation) => (
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
                    { value: 'supervisor', label: 'Supervisor' }, { value: 'reviewer', label: 'Reviewer' }
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
            <div>
              <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} htmlType="submit" onClick={() => {navigate(-1)}}>Go Back</Button>
            </div>
            <div className="user_submit">
              <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} htmlType="submit">Update</Button>
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

// Props validation
UpdateUser.propTypes = {
  onFinishHandler: PropTypes.func,
  userDetails: PropTypes.array,
  navigate: PropTypes.func,
  loading: PropTypes.bool,
  allDepartments: PropTypes.array,
  selectedDepartment: PropTypes.string,
  handleDepartmentChange: PropTypes.func,
  allDesignations: PropTypes.array,
  selectedDesignation: PropTypes.string,
  handleDesignationChange: PropTypes.func
};

export default UpdateUser;