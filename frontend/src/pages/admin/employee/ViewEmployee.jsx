import PropTypes from "prop-types";
import { Button, Table } from "antd";

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

    // antD columns
    const columns = [
      {
        title: "Pending Work",
        align: "center",
        dataIndex: "totalPendingWork",
      },
      {
        title: "In_Progress Work",
        align: "center",
        dataIndex: "totalInProgressWork",
      },
      {
        title: "Completed Work",
        align: "center",
        dataIndex: "totalCompletedWork",
      },
      {
        title: "Reviewed Work",
        align: "center",
        dataIndex: "reviewedWork",
      },
      {
        title: "Total Work",
        align: "center",
        dataIndex: "totalWork",
      }
    ];

    const dataSource = [
      {
        key: "1",
        totalPendingWork,
        totalInProgressWork,
        totalCompletedWork,
        reviewedWork,
        totalWork
      }
    ]

  return (
    <div>
      <Table 
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey={"key"}
      />

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