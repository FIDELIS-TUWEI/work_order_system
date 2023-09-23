import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import {MdDelete} from "react-icons/md";


const ViewAllDepartments = ({ departments, loading, handlePageChange, page, pages }) => {
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

      <Card loading={loading} title="All Departments" style={{ margin: "auto", width: "500px" }}>
        <table>
          <thead>
            <tr>
              <th>DepartmentS</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department._id}>
                <td>{department.departmentName}</td>
                <td className="actions__btn">
                  <Button danger style={{ border: "none" }}
                  >
                    <MdDelete />
                  </Button>  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  )
}

export default ViewAllDepartments