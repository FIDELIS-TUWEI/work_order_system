import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd'

const { Option } = Select;

const UpdateWork = ({ workDetails, onFinishHandler, user, navigate, employees, selectedEmployee, handleEmployeeChange }) => {
  // to render edit columns based on work status and user role
  const isWorkPending = workDetails?.status === 'Pending';
  const isWorkInProgress = workDetails?.status === 'In_Progress';
  const isWorkCompleted = workDetails?.status === 'Complete';
  const isRoleAuthorized = ["reviewer", "admin", "superadmin", "supervisor"].includes(user?.role);

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
          label="Date Assigned"
          name="dateAssigned"
          rules={[{ required: true, message: 'Please Enter Date Assigned!' }]}
        >
          <DatePicker format='YYYY-MM-DD' disabledDate={disabledDate} />
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
            label="Date Completed"
            name="dateCompleted"
            rules={[{ required: true, message: 'Please Enter Date Completed!' }]}
          >
            <DatePicker format='YYYY-MM-DD' disabledDate={disabledDate} />
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
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Review Date"
              name="dateReviewed"
              rules={[{ required: true, message: 'Please Select Review Date!' }]}
            >
              <DatePicker format='YYYY-MM-DD' disabledDate={disabledDate} />
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

  
  // Function to disable past dates and future dates. Allow only today
  const today = new Date();

  const disabledDate = current => !current.isSame(today, 'day');

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
  }
  
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
                  isWorkInProgress ? renderInProgressFields() : 
                  isWorkCompleted && isRoleAuthorized ? renderReviewFields() :  
                  "You are not authorised to edit this work"
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
}

export default UpdateWork;