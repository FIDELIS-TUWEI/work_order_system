import { Button, Card } from "antd";

const ViewEmployee = ({ employeeDetails, loading, navigate, getEmployeeDetails }) => {
  return (
    <div>
      <Card
        title="View Employee Details"
        loading={loading}
      >
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Total Work Pending</th>
              <th>Total Work In Progress</th>
              <th>Total Work Complete</th>
              <th>Total Work Assigned</th>
            </tr>
          </thead>
        </table>

      </Card>

      <div className="add-btn">
        <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none'}} onClick={() => navigate(-1)}>Back</Button>
      </div>
    </div>
  )
}

export default ViewEmployee;