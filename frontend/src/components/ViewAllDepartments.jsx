import { Button } from "antd"
import { useNavigate } from "react-router-dom";

const ViewAllDepartments = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="add-btn">
            <Button
                style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}
                onClick={() => navigate("/new/department")}
            >
                Add Department
            </Button>
        </div>
    </>
  )
}

export default ViewAllDepartments