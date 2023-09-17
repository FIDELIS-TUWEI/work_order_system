import { Button, Card } from "antd"

const ViewAllCategories = ({ navigate, loading }) => {
  return (
    <div>
        <div className="add-btn">
            <Button
                style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}
                onClick={() => navigate("/new/category")}
            >
                Add Category
            </Button>
        </div>
        
        <Card loading={loading} title="All Categories" style={{ margin: "auto", width: "300px" }}></Card>
    </div>
  )
}

export default ViewAllCategories