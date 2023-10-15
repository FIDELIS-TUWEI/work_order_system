import { Card } from "antd";

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
            </tr>
          </thead>
        </table>

      </Card>
    </div>
  )
}

export default ViewEmployee;