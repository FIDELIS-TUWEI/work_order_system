import PropTypes from "prop-types";
import { Button, Card } from "antd";

const ViewEmployee = ({ employeeDetails, loading, navigate }) => {

  // display pending work count summary
  const totalPendingWork = employeeDetails
    ? employeeDetails.pendingWorkCount
    : 0;

  // display In Progress work count summary
  const totalInProgressWork = employeeDetails
    ? employeeDetails.inProgressWorkCount
    : 0;

  // display completed work count summary
  const totalCompletedWork = employeeDetails
    ? employeeDetails.completedWorkCount
    : 0;

  // display reviewed work count summary
  const reviewedWork = employeeDetails
    ? employeeDetails.reviewedWorkCount
    : 0;

  // display total work count summary
  const totalWork = employeeDetails
    ? employeeDetails.totalWorkCount
    : 0;

  return (
    <div>
      <Card
        title="View Employee Details"
        loading={loading}
      >
        <table>
          <thead>
            <tr>
              <th>Total Work Pending</th>
              <th>Total Work In Progress</th>
              <th>Total Work Complete</th>
              <th>Total Work Reviewed</th>
              <th>Total Work Assigned</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{totalPendingWork}</td>
              <td>{totalInProgressWork}</td>
              <td>{totalCompletedWork}</td>
              <td>{reviewedWork}</td>
              <td>{totalWork}</td>
            </tr>
          </tbody>
        </table>

      </Card>

      <div className="add-btn">
        <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none'}} onClick={() => navigate(-1)}>Back</Button>
      </div>
    </div>
  )
};

ViewEmployee.propTypes = {
  employeeDetails: PropTypes.object,
  loading: PropTypes.bool,
  navigate: PropTypes.func
};

export default ViewEmployee;