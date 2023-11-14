import PropTypes from "prop-types";
import { Button, Card, DatePicker } from "antd";
import LoadingBox from "./LoadingBox";
import moment from "moment";

const FilterWorkDate = ({ filteredWorkOrders, fetchFilteredWorkOrders, handleDateChange, loading }) => {
  return (
    <Card title="Filter Work Orders By Date Created" style={{ margin: "15px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: "20px" }}>
        <DatePicker.RangePicker onChange={handleDateChange} />
        <Button
          onClick={fetchFilteredWorkOrders}
          style={{
            backgroundColor: "darkgreen",
            color: "white",
            border: "none",
            marginLeft: "10px",
          }}
        >
          Filter
        </Button>
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
                {filteredWorkOrders.map((workOrder) => (
                  <tr key={workOrder._id}>
                    <td>{workOrder.title}</td>
                    <td>{workOrder.serviceType}</td>
                    <td>{workOrder.category ? workOrder.category.categoryTitle : ''}</td>
                    <td>{workOrder.priority}</td>
                    <td>{workOrder.assignedTo}</td>
                    <td>{workOrder.requestedBy}</td>
                    <td>{workOrder.dateCompleted ? moment(workOrder.dateCompleted).format("DD/MM/YYYY, hh:mm a") : 'Not yet complete'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        )}
    </Card>
  )
};

FilterWorkDate.propTypes = {
  filteredWorkOrders: PropTypes.array,
  fetchFilteredWorkOrders: PropTypes.func,
  handleDateChange: PropTypes.func,
  loading: PropTypes.bool,
};

export default FilterWorkDate;