import PropTypes from "prop-types";
import { Button, Card, Modal, Table, Tooltip, Typography, message } from "antd";
import {BiSolidEditAlt} from "react-icons/bi";
import {AiFillEye} from "react-icons/ai";
import {MdDelete} from "react-icons/md";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/features/auth/authSlice";
import { useParams } from "react-router-dom";
import { useDeleteEmployeeMutation } from "@/features/employees/employeeSlice";


const AllEmployees = ({ navigate, loading, employees, refetch }) => {
  const { id } = useParams();
  const [deleteEmployee] = useDeleteEmployeeMutation(id);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmployeeToDelete, setSelectedEmployeeToDelete] = useState(null);
  const user = useSelector(selectUserInfo);

  // Function to show modal to delete employee
  const showModal = async (employee) => {
    setSelectedEmployeeToDelete(employee);
    setIsModalVisible(true);
  };

  // Function to confirm modal delete
  const handleDelete = async () => {
      try {
          const { error } = await deleteEmployee(selectedEmployeeToDelete._id).unwrap();

          if (error) {
            if (error === 400 && error?.data?.message) {
              message.error(error.data.message);
            } else {
              message.error("Failed to delete employee with ID!")
            }
          } else {
            message.success("Employee deleted successfully");
            setIsModalVisible(false);
            refetch();
          }
      } catch (error) {
          message.error("An Error occured, failed to delete employee with ID!");
      }
  };

  // Function to handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  }

  // Function to determine authorised user roles
  const isAuthorised = [
    "admin", "superadmin", "supervisor", "engineer"
  ].includes(user?.role);


  // Function to check if user is authorised to view, edit or delete employee
  const isEditAllowed = () => {
    if (isAuthorised) {
        return true;
    }
  };

  // Function to disable add employee button
  const isAllowed = [
    "admin", "superadmin", "engineer"
  ].includes(user?.role);

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
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
        All Employees
      </Typography>

      <div className="add-btn">
        <Tooltip title={isAllowed ? "Add Employee" : "Operation disabled"}>
          <Button
            style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}
            onClick={() => navigate("/new/employee")}
            disabled={!isAllowed}
          >
            Add Employee
          </Button>
        </Tooltip>
      </div>

      <Card>
        <Table 
          loading={loading}
          columns={columns}
          dataSource={employees}
          pagination={false}
          rowKey="_id"
        />
      </Card>

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

      <div className="add-btn">
        <Tooltip title="Go Back">
          <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Tooltip>
      </div>
    </div>
  )
};

AllEmployees.propTypes = {
  navigate: PropTypes.func,
  loading: PropTypes.bool,
  employees: PropTypes.array,
  refetch: PropTypes.func,
};

export default AllEmployees;