
import { Card, DatePicker } from "antd";
import LoadingBox from "./LoadingBox";


const FilterWorkDate = ({ selectedDate, handleDateChange, workOrders, loading }) => {
  return (
    <Card title="Filter Work Orders By Date Created" style={{ margin: "15px" }} loading={loading}>
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
                </tr>
              </thead>
              <tbody>
                {
                  workOrders.map((workOrder) => (
                    <tr key={workOrder._id}>
                      <td>{workOrder.title}</td>
                      <td>{workOrder.serviceType}</td>
                      <td>{workOrder?.category.categoryTitle}</td>
                      <td>{workOrder.priority}</td>
                      <td>{workOrder?.assignedTo.firstName} {workOrder.assignedTo.lastName}</td>
                      <td>{workOrder?.requestedBy.username}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
        )}
    </Card>
  )
};

export default FilterWorkDate;