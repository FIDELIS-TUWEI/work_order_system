import PropTypes from "prop-types";
import { Button, Card, DatePicker } from "antd";
import LoadingBox from "./LoadingBox";


const FilterWorkDate = ({ loading, workOrders, handleDateChange, getWorkOrders }) => {
  return (
    <Card title="Filter Work Orders By Date Created" style={{ margin: "15px" }} loading={loading}>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: "20px" }}>
        <DatePicker onChange={(date) => {handleDateChange(date); getWorkOrders();}} />
        
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
                </tr>
              </thead>
              <tbody>
                {workOrders.map((workOrder) => (
                  <tr key={workOrder._id}>
                    <td>{workOrder.title}</td>
                    <td>{workOrder.serviceType}</td>
                    <td>{workOrder.category ? workOrder.category.categoryTitle : ''}</td>
                    <td>{workOrder.priority}</td>
                    <td>{workOrder.assignedTo ? workOrder.assignedTo.firstName : 'Not Assigned'}</td>
                    <td>{workOrder.requestedBy ? workOrder.requestedBy.username : 'Not Requested'}</td>
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
  getWorkOrders: PropTypes.func
}

export default FilterWorkDate;