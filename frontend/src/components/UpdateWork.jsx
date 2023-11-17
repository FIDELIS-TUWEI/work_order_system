import PropTypes from "prop-types"
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd'
import LoadingBox from "../components/LoadingBox";
import moment from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;

const UpdateWork = ({ workDetails, onFinishHandler, user, navigate, employees, selectedEmployee, handleEmployeeChange }) => {
  // Function to disable past dates and future dates in DatePicker
  const disabledDate = current => {
    return current && current < moment().startOf('day');
  }
  // to render edit columns based on work status and user role
  const isWorkPending = workDetails?.status === 'Pending';
  const isWorkInProgress = workDetails?.status === 'In_Progress';
  const isWorkCompleted = workDetails?.status === 'Complete';
  const isRoleAuthorized = ["reviewer", "admin", "superadmin", "supervisor"].includes(user?.role);

  // Check tracker selection
  const isWorkAttended = workDetails?.tracker === 'Attended';
  const isWorkInComplete = workDetails?.tracker === 'In_Complete';

   // Function to disable current status with disabled attribute
  const getStatusOptions = () => {
    const statusOptions = [
      { value: 'Pending', label: 'Pending' },
      { value: 'In_Progress', label: 'In Progress' },
      { value: 'Complete', label: 'Complete' },
      { value: 'Reviewed', label: 'Reviewed' },
    ];

    const currentIndex = statusOptions.findIndex(option => option.value === workDetails?.status);

    if (currentIndex !== -1 && currentIndex < statusOptions.length - 1) {
      return statusOptions.map((option, index) => ({
        ...option,
        disabled: index < currentIndex || index === currentIndex || index > currentIndex + 1
      }));
    }

    return statusOptions;
  };


  // If work is pending
  const renderPendingFields = () => (
    <>
      <Col xs={24} md={24} lg={8}>
        <Form.Item
          label="Assigned To"
          name="assignedTo"
          rules={[{ required: true, message: 'Please Select Employee to Assign!' }]}
        >
          <Select
            placeholder='Select Employee to Assign'
            allowClear
            style={{ width: '100%' }}
            value={selectedEmployee}
            onChange={handleEmployeeChange}
            filterOption={false}
          >
            {employees.map((employee) => (
              <Option key={employee._id} value={employee._id}>{employee.firstName} {employee.lastName}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col xs={24} md={24} lg={8}>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Please Select Work Status!' }]}
        >
          <Select 
            placeholder='Select Status'
            allowClear
            style={{ width: '100%' }}
            options={getStatusOptions()}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={24} lg={8}>
        <Form.Item 
          name="tracker" 
          label="Tracker" 
          required rules={[{ required: true, message: 'Please Select a Tracking Option!' }]}>
          <Select 
            placeholder='Select Tracker'
            allowClear
            style={{ width: '100%' }}
            options={[
              { value: 'In_Attendance', label: 'In Attendance' },
              { value: 'Attended', label: 'Attended' },
              { value: 'In_Complete', label: 'In Complete' },
            ]}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={24} lg={8}>
        <Form.Item
          label="Tracking Comments"
          name="trackerMessage"
          rules={[{ required: true, message: 'Please Enter Tracking Comments!' }]}
        >
          <Input type='text' placeholder='Enter Tracking comments' />
        </Form.Item>
      </Col>
      <Col xs={24} md={24} lg={8}>
        <Form.Item 
          name="dueDate" 
          label="Due Date" 
          required rules={[{ required: true, message: 'Please Select a Due Date!' }]}>
          <RangePicker style={{ width: '100%' }} format={"YYYY-MM-DD"} disabledDate={disabledDate} />
        </Form.Item>
      </Col>
    </>
  );

  // Check work tracker before rendering fields
  const renderTrackerFields = () => (
    <>
      <Col xs={24} md={24} lg={8}>
        <Form.Item
          label="Tracker"
          name="tracker"
          rules={[{ required: true, message: 'Please Select Work Tracker!' }]}
        >
          <Select 
            placeholder='Select Tracker'
            allowClear
            style={{ width: '100%' }}
            options={[
              { value: 'Attended', label: 'Attended' },
              { value: 'In_Complete', label: 'In Complete' },
            ]}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={24} lg={8}>
        <Form.Item
          label="Comments"
          name="trackerMessage"
          rules={[{ required: true, message: 'Please Enter Comments!' }]}
        >
          <Input type='text' placeholder='Enter comments' />
        </Form.Item>
      </Col>
    </>
  );

  // if Work is in progress
  const renderInProgressFields = () => (
    <>
      <Col xs={24} md={24} lg={8}>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please Select Work Status!' }]}
          >
            <Select 
              placeholder='Select Status'
              allowClear
              style={{ width: '100%' }}
              options={getStatusOptions()}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={8}>
          <Form.Item
            label="Comments"
            name="comments"
            rules={[{ required: true, message: 'Please Enter Comments!' }]}
          >
            <Input type='text' placeholder='Enter comments' />
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={8}>
          <Form.Item
            label="Supervised By"
            name="supervisedBy"
            rules={[{ required: true, message: `Please Enter Supervisor's Name!` }]}
          >
            <Input type='text' placeholder='Enter Supervisor Name' />
          </Form.Item>
        </Col>
    </>
  );

  // if Work is complete check if user is authprised
  const renderReviewFields = () => {
    if (isWorkCompleted && !workDetails?.reviewed) {
      return (
        <>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Reviewed"
              name="reviewed"
              rules={[{ required: true, message: 'Please Select Work Review Status!' }]}
            >
              <Select 
                placeholder='Select Review Status'
                allowClear
                style={{ width: '100%' }}
                options={[
                  { value: true, label: 'Reviewed' }, { value: false, label: 'Not Reviewed' }
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Review Comments"
              name="reviewComments"
              rules={[{ required: true, message: 'Please Enter Review Comments!' }]}
            >
              <Input type='text' placeholder='Enter comments' />
            </Form.Item>
          </Col>      
        </>
      );
    } else {
      return (
        <Typography.Text style={{ fontSize: '1.5rem', fontWeight: '500', marginBottom: '1rem' }}>
          This work is already reviewed, no need to review again.
        </Typography.Text>
      )
    }
    
  };

  // Render loader when fetching form to update work
  const renderLoader = () => (
    <div className='loader'>
      <LoadingBox />
    </div>
  )
  
  return (
    <div>
        <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Edit Work Order
        </Typography>
        <Card title={workDetails?.title} style={{ margin: '15px' }}>
        <Form onFinish={onFinishHandler} layout='vertical'>
            
            <Row gutter={20}>
                {
                  isWorkPending ? renderPendingFields() : 
                  isWorkInComplete ? renderTrackerFields() :
                  isWorkAttended && isWorkInProgress ? renderInProgressFields() : 
                  isWorkCompleted && isRoleAuthorized ? renderReviewFields() : renderLoader()
                }
            </Row>
            <div>
              <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} htmlType="submit" onClick={() => {navigate(-1)}}>Go Back</Button>
            </div>
            <div className="user_submit">
              <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} htmlType="submit">Update</Button>
            </div>
        </Form>
        </Card>
    </div>
  )
};

UpdateWork.propTypes = {
  onFinishHandler: PropTypes.func,
  navigate: PropTypes.func,
  workDetails: PropTypes.array,
  user: PropTypes.object,
  employees: PropTypes.array,
  selectedEmployee: PropTypes.string,
  handleEmployeeChange: PropTypes.func
}

export default UpdateWork;