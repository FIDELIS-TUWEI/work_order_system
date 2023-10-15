import { Button, Card, Modal, message } from "antd";
import {BiSolidEditAlt} from "react-icons/bi";
import {AiFillEye} from "react-icons/ai";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import {MdDelete} from "react-icons/md";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../utils/redux/slices/authSlice";
import { deleteEmployee } from "../services/employeeApi";


const AllEmployees = ({ navigate, loading, employees, handlePageChange, page, pages, getEmployees }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmployeeToDelete, setSelectedEmployeeToDelete] = useState(null);
  const token = useSelector(selectToken);

  // Function to show modal to delete employee
  const showModal = async (employee) => {
    setSelectedEmployeeToDelete(employee);
    setIsModalVisible(true);
  };

  // Function to confirm modal delete
  const handleDelete = async () => {
      try {
          await deleteEmployee(selectedEmployeeToDelete._id, {
              withCredentials: true,
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          message.success("Employee deleted successfully");
          setIsModalVisible(false);
          getEmployees();
      } catch (error) {
          message.error("An error occurred while deleting the employee:", error);
      }
  };

  // Function to handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  }

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

      <Card
        loading={loading}
        title="All Employees"
        style={{ margin: "15px" }}
      >
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.username}</td>
                <td>{employee.phone}</td>
                <td className="actions__btn">
                  <Button style={{ color: 'green', border: 'none', margin: '0 5px' }} onClick={() => navigate(`/employee/details/${employee._id}`)}>
                    <AiFillEye />
                  </Button>
                  <Button danger style={{ border: 'none', marginRight: "5px" }} onClick={() => navigate(`/update/employee/${employee._id}`)}>
                    <BiSolidEditAlt />
                  </Button>
                  <Button danger style={{ border: 'none' }} onClick={() => showModal(employee)}>
                    <MdDelete />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          title="Delete Employee"
          open={isModalVisible}
          onOk={handleDelete}
          onCancel={handleCancel}
          okText="Delete"
          okButtonProps={{ style: { backgroundColor: 'green', border: 'none' } }}
          cancelButtonProps={{ style: { backgroundColor: 'red', border: 'none', color: 'white' } }}
        >
          <p>Are you sure you want to delete {selectedEmployeeToDelete?.firstName} {selectedEmployeeToDelete?.lastName}?</p>
        </Modal>
      </Card>
      <div className="pagination">
        <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} style={{ border: 'none', margin: '0 5px' }}>
          <GrFormPrevious />
        </Button>
        <span>Page {page} of {pages}</span>
        <Button disabled={page === pages} onClick={() => handlePageChange(page + 1)} style={{ border: 'none', margin: '0 5px' }}>
          <GrFormNext />
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

export default AllEmployees;