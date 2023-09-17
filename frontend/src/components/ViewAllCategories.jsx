import { Button } from "antd"

const ViewAllCategories = ({ navigate }) => {
  return (
    <div>
        <Button
            style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}
            onClick={() => navigate("/new/category")}
        >
            Add Category
        </Button>
        ViewAllCategories
    </div>
  )
}

export default ViewAllCategories