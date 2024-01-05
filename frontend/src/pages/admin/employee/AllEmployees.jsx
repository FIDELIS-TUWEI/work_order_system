import PropTypes from "prop-types";
import { Button, Modal, Table, Tooltip, message } from "antd";
import {BiSolidEditAlt} from "react-icons/bi";
import {AiFillEye} from "react-icons/ai";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import {MdDelete} from "react-icons/md";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectToken, selectUserInfo } from "../../../features/auth/authSlice";
import { deleteEmployee } from "../../../services/employeeApi";


const AllEmployees = ({ navigate, loading, employees, handlePageChange, page, pages, getEmployees }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmployeeToDelete, setSelectedEmployeeToDelete] = useState(null);
  const user = useSelector(selectUserInfo);
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

  // Function to determine authorised user roles
  const isAuthorised = [
    "admin", "superadmin", "supervisor"
  ].includes(user?.role);


  // Function to check if user is authorised to view, edit or delete employee
  const isEditAllowed = () => {
    if (isAuthorised) {
        return true;
    }
  };

  // Antd table columns
  const columns = [
    {
      title: "First Name",
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Username",
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Phone",
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Actions",
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "actions",
      key: "actions",
      render: (_, employee) => (
        <>
          <Tooltip title="View Employee Details">
            <Button style={{ color: "grey", border: "none", margin: "0 5px" }} onClick={() => navigate(`/employee/details/${employee._id}`)}>
              <AiFillEye />
            </Button>
          </Tooltip>
          {isEditAllowed() && (
            <>
              <Tooltip title="Edit Employee">
                <Button
                  style={{ color: "green", border: "none", margin: "0 5px" }}
                  onClick={() => navigate(`/update/employee/${employee._id}`)}
                >
                  <BiSolidEditAlt />
                </Button>
              </Tooltip>
              <Tooltip title="Delete Employee">
                <Button
                  style={{ color: "red", border: "none", margin: "0 5px" }}
                  onClick={() => showModal(employee)}
                >
                  <MdDelete />
                </Button>
              </Tooltip>
            </>
          )}
        </>
      )
    }
  ];

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

      <Table 
        loading={loading}
        columns={columns}
        dataSource={employees}
        pagination={false}
        rowKey="_id"
      />

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
      
      <div className="pagination">
        <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'lightgrey' }}>
          <GrFormPrevious />
        </Button>
        <span>Page {page} of {pages}</span>
        <Button disabled={page === pages} onClick={() => handlePageChange(page + 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'lightgrey' }}>
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
};

AllEmployees.propTypes = {
  navigate: PropTypes.func,
  loading: PropTypes.bool,
  employees: PropTypes.array,
  handlePageChange: PropTypes.func,
  page: PropTypes.number,
  pages: PropTypes.number,
  getEmployees: PropTypes.func,
};

export default AllEmployees;