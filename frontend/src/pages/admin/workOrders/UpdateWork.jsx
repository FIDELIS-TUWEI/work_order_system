import PropTypes from "prop-types"
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd'
import LoadingBox from "@/components/LoadingBox";
import moment from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;

const UpdateWork = ({ singleWorkArray, onFinishHandler, user, navigate, employeesArray, selectedEmployee, handleEmployeeChange, isLoading }) => {
  // Function to disable past dates and future dates in DatePicker
  const disabledDate = current => {
    return current && current < moment().startOf('day');
  }
  // to render edit columns based on work status and user role
  const isWorkPending = singleWorkArray?.status === 'Pending';

  // Check work tracker status
  const isNotAttended = singleWorkArray?.tracker === 'Not_Attended';
  const isInAttendance = singleWorkArray?.tracker === 'In_Attendance';
  const isAttended = singleWorkArray?.tracker === 'Attended';
  const isInComplete = singleWorkArray?.tracker === 'In_Complete';


   // Function to disable current status with disabled attribute
  const getStatusOptions = () => {
    const statusOptions = [
      { value: 'Pending', label: 'Pending' },
      { value: 'Complete', label: 'Complete' },
    ];

    const currentIndex = statusOptions.findIndex(option => option.value === singleWorkArray?.status);

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
            showSearch
            onChange={handleEmployeeChange}
            filterOption={false}
          >
            {employeesArray.map((employee) => (
              <Option key={employee._id} value={employee._id}>{employee.firstName} {employee.lastName}</Option>
            ))}
          </Select>
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
              { value: 'In_Attendance', label: 'In-attendance' }
            ]}
          />
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
            name="checkedBy"
            label="Checked By"
            rules={[{ required: true, message: "Please Enter HoD name!" }]}
          >
            <Input type="text" placeholder="Enter the relevant department HoD name" />
          </Form.Item>
        </Col>
    </>
  );

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
      case isInAttendance && isWorkPending:
        return renderTrackerFields();
      case isAttended && isWorkPending:
        return renderCompleteFormFields();
      case isInComplete:
        redirectToWorkList();
        break;
      
      default:
        return renderLoader();
    }
  }
  
  return (
    <div>
        <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Edit Work Order
        </Typography>
        <Card title={singleWorkArray?.description} style={{ margin: '15px' }}>
        <Form onFinish={onFinishHandler} layout='vertical'>
            
            <Row gutter={20}>
                {renderFormFields()}
            </Row>
            
            <div className="submit--btn">
              <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} htmlType="submit">Update</Button>
            </div>
            <Col xs={24} md={24} lg={8}></Col>
            <div className="loader">
              { isLoading && <LoadingBox /> }
            </div>
        </Form>

        <div>
          <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} htmlType="submit" onClick={() => {navigate(-1)}}>Go Back</Button>
        </div>
        </Card>
    </div>
  )
};

UpdateWork.propTypes = {
  onFinishHandler: PropTypes.func,
  navigate: PropTypes.func,
  singleWorkArray: PropTypes.array,
  user: PropTypes.object,
  employeesArray: PropTypes.array,
  selectedEmployee: PropTypes.string,
  handleEmployeeChange: PropTypes.func,
  isLoading: PropTypes.bool
};

export default UpdateWork;