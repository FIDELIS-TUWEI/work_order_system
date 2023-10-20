import moment from "moment";
import { Button, Card } from "antd";
import "jspdf-autotable";
import LoadingBox from "../components/LoadingBox";



const WorkReport = ({ workOrders, loading, setFilterStatus, exportPDF }) => {

  return (
    <Card title="Work Orders" style={{ margin: "15px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold" }}>Filter By Status:
          <select onChange={(e) => setFilterStatus(e.target.value)} style={{ marginLeft: "10px" }}>
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="In_Progress">In Progress</option>
            <option value="Complete">Completed</option>
          </select>
        </label>
      </div>
      

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
          <LoadingBox />
        </div>
      ) : (
        <>

          <table id="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Service Type</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Assigned To</th>
                <th>Date Requested</th>
                <th>Requested By</th>
                <th>Date Completed</th>
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
                  <td>{moment(workOrder.Date_Created).format("DD/MM/YYYY, hh:mm a")}</td>
                  <td>{workOrder.requestedBy ? workOrder.requestedBy.username : 'Not Requested'}</td>
                  <td>{workOrder.dateCompleted ? moment(workOrder.dateCompleted).format("DD/MM/YYYY, hh:mm a") : 'Not yet complete'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Total Work Orders: {workOrders.length}</p>
          <div className="button__container">
            <Button style={{ 
              color: 'white', 
              backgroundColor: 'darkgreen', 
              border: 'none' 
            }} 
              onClick={exportPDF}>
              Generate Report
            </Button>
          </div>
        </>
        )}
    </Card>
  )
};

export default WorkReport;