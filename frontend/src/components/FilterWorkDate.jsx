import PropTypes from "prop-types";
import { Button, Card, DatePicker } from "antd";
import LoadingBox from "./LoadingBox";

const FilterWorkDate = ({ loading, workOrders, handleDateChange, selectedDate }) => {
  return (
    <Card title="Filter Work Orders By Date Created" style={{ margin: "15px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: "20px" }}>
        <DatePicker onChange={handleDateChange} />
        
      </div>
        
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
            <LoadingBox />
          </div>
        ) : (
            <table id="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Service Type</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Assigned To</th>
                  <th>Requested By</th>
                  <th>Date Completed</th>
                </tr>
              </thead>
              <tbody>
                {workOrders.map((workOrder) => (
                  <tr key={workOrder._id}>
                    <td>{workOrder.title}</td>
                    <td>{workOrder.serviceType}</td>
                    <td>{workOrder.category}</td>
                    <td>{workOrder.priority}</td>
                    <td>{workOrder.assignedTo}</td>
                    <td>{workOrder.requestedBy}</td>
                    <td>{workOrder.dateCompleted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        )}
    </Card>
  )
};

FilterWorkDate.propTypes = {
  loading: PropTypes.bool,
  workOrders: PropTypes.array,
  handleDateChange: PropTypes.func,
}

export default FilterWorkDate;