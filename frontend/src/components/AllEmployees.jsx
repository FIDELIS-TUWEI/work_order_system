import { Button } from "antd"
import { useNavigate } from "react-router-dom";

const AllEmployees = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="add-btn">
        <Button
        style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}
          onClick={() => navigate("/new/employee")}
        >
          Add Employee
        </Button>
      </div>

      <div className="add-btn">
        <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    </div>
  )
}

export default AllEmployees