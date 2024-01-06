import PropTypes from "prop-types"
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd'
import LoadingBox from "@/components/LoadingBox";
import moment from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;

const UpdateWork = ({ workDetails, onFinishHandler, user, navigate, employees, selectedEmployee, handleEmployeeChange, isLoading }) => {
  // Function to disable past dates and future dates in DatePicker
  const disabledDate = current => {
    return current && current < moment().startOf('day');
  }
  // to render edit columns based on work status and user role
  const isWorkPending = workDetails?.status === 'Pending';
  const isWorkInProgress = workDetails?.status === 'In_Progress';
  const isWorkCompleted = workDetails?.status === 'Complete';
  const isRoleAuthorized = ["reviewer", "admin", "superadmin", "supervisor", "hod", "engineer"].includes(user?.role);

  // Check work tracker status
  const isNotAttended = workDetails?.tracker === 'Not_Attended';
  const isInAttendance = workDetails?.tracker === 'In_Attendance';
  const isAttended = workDetails?.tracker === 'Attended';
  const isInComplete = workDetails?.tracker === 'In_Complete';


   // Function to disable current status with disabled attribute
  const getStatusOptions = () => {
    const statusOptions = [
      { value: 'Pending', label: 'Pending' },
      { value: 'In_Progress', label: 'In-progress' },
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
  const renderAssignFields = () => (
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
              { value: 'In_Attendance', label: 'In-attendance' },
              { value: 'Attended', label: 'Attended' },
              { value: 'In_Complete', label: 'In-complete' },
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
                { value: 'In_Attendance', label: 'In-attendance' },
                { value: 'Attended', label: 'Attended' },
                { value: 'In_Complete', label: 'In-complete' },
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

  // Navigate to work list if work tracker is in complete
  const redirectToWorkList = () => {
    return navigate("/work-list");
  };

  // if Work is in progress
  const renderCompleteFormFields = () => (
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
  const renderReviewFormFields = () => {
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
                  { value: true, label: 'Reviewed' }
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Verify Comments"
              name="verifyComments"
              rules={[{ required: true, message: 'Please Enter verify Comments!' }]}
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
  );

  // Rendering form fields using switch case condition to check work status and work tracker
  const renderFormFields = () => {
    switch (true) {
      case isNotAttended && isWorkPending:
        return renderAssignFields();
      case isInAttendance && isWorkInProgress:
        return renderTrackerFields();
      case isAttended && isWorkInProgress:
        return renderCompleteFormFields();
      case isInComplete && isWorkInProgress:
        redirectToWorkList();
        break;
      case isWorkCompleted && isRoleAuthorized: 
        return renderReviewFormFields();
      default:
        return renderLoader();
    }
  }
  
  return (
    <div>
        <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Edit Work Order
        </Typography>
        <Card title={workDetails?.title} style={{ margin: '15px' }}>
        <Form onFinish={onFinishHandler} layout='vertical'>
            
            <Row gutter={20}>
                {renderFormFields()}
            </Row>
            <div>
              <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} htmlType="submit" onClick={() => {navigate(-1)}}>Go Back</Button>
            </div>
            <div className="user_submit">
              <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} htmlType="submit">Update</Button>
            </div>
            <Col xs={24} md={24} lg={8}></Col>
            <div className="loader">
              { isLoading && <LoadingBox /> }
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
  handleEmployeeChange: PropTypes.func,
  isLoading: PropTypes.bool
};

export default UpdateWork;