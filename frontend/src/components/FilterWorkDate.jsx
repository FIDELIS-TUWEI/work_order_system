import { Button, Card, DatePicker } from "antd";
import LoadingBox from "./LoadingBox";

const FilterWorkDate = () => {
  return (
    <Card title="Filter Work Orders By Date Created" style={{ margin: "15px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: "20px" }}>
        <DatePicker.RangePicker />
        <Button
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
                
              </tbody>
            </table>
        )}
    </Card>
  )
};

export default FilterWorkDate;