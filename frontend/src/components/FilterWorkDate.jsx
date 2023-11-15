import { Card, DatePicker } from "antd";
import LoadingBox from "./LoadingBox";


const FilterWorkDate = () => {
  return (
    <Card title="Filter Work Orders By Date Created" style={{ margin: "15px" }} loading={loading}>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: "20px" }}>
        <DatePicker />
        
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
                
              </tbody>
            </table>
        )}
    </Card>
  )
};

export default FilterWorkDate;