import { Button, Card, Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import {MdDelete} from "react-icons/md";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../utils/redux/slices/authSlice";
import { deleteDepartment } from "../services/departmentApi";


const ViewAllDepartments = ({ departments, loading, handlePageChange, page, pages, getDepartments }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDepartmentToDelete, setSelectedDepartmentToDelete] = useState(null);
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  // Function to show modal to delete department
  const showModal = async (department) => {
    setSelectedDepartmentToDelete(department);
    setIsModalVisible(true);
  }

  // Function to confirm modal delete department
  const handleDelete = async () => {
    try {
      await deleteDepartment(selectedDepartmentToDelete._id, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Department deleted successfully");
      setIsModalVisible(false);
      getDepartments();
    } catch (error) {
      console.error(error);
      message.error("An error occurred while deleting the department", error);
    }
  };

  // Function to handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  }

  return (
    <>
      <div className="add-btn">
            <Button
                style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}
                onClick={() => navigate("/create/department")}
            >
                Add Department
            </Button>
        </div>

      <Card loading={loading} title="All Departments">
        <table>
          <thead>
            <tr>
              <th>Departments</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department._id}>
                <td>{department.departmentName}</td>
                <td className="actions__btn">
                  <Button danger style={{ border: "none" }}
                    onClick={() => showModal(department)}
                  >
                    <MdDelete />
                  </Button>  
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          title="Delete Department"
          open={isModalVisible}
          onOk={handleDelete} 
                onCancel={handleCancel}
                okText="Delete"
                okButtonProps={{ style: { backgroundColor: 'green', border: 'none' } }}
                cancelButtonProps={{ style: { backgroundColor: 'red', border: 'none', color: 'white' } }}
        >
          <p>Are you sure you want to delete this department?</p>
        </Modal>
      </Card>
      <div className="pagination">
        <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} style={{ border: 'none', margin: '0 5px' }}>
          <GrFormPrevious />
        </Button>
        <span> Page {page} of {pages}</span>
        <Button disabled={page === pages} onClick={() => handlePageChange(page + 1)} style={{ border: 'none', margin: '0 5px' }}>
          <GrFormNext />
        </Button>
      </div>

      <div className="add-btn">
        <Button 
          onClick={() => navigate(-1)} 
          style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} 
        >
          Go Back
        </Button>
      </div>
    </>
  )
}

export default ViewAllDepartments;