import PropTypes from "prop-types";
import { Button, Card, Modal, Table, Tooltip, message } from "antd";
import { useNavigate } from "react-router-dom";
import {MdDelete} from "react-icons/md";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "@/features/auth/authSlice";
import { deleteDepartment } from "../../../services/departmentApi";


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
  };

  // Antd Table Columns
  const columns = [
    {
      title: "Departments",
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "departmentName",
      key: "departmentName",
    },
    {
      title: "Action",
      align: "center",
      responsive: ["md", "lg"],
      key: "action",
      render: (_, department) => (
        <Tooltip title="Delete Department">
          <Button
            danger
            style={{ border: "none" }}
            onClick={() => showModal(department)}
          >
            <MdDelete />
          </Button>
        </Tooltip>
      ),
    }
  ]

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

      <Card>
        <Table 
          loading={loading}
          columns={columns}
          dataSource={departments}
          rowKey="_id"
          pagination={false}
        />
      </Card>

      <Modal
        title="Delete Department"
        open={isModalVisible}
        onOk={handleDelete} 
              onCancel={handleCancel}
              okText="Delete"
              okButtonProps={{ style: { backgroundColor: 'green', border: 'none' } }}
              cancelButtonProps={{ style: { backgroundColor: 'red', border: 'none', color: 'white' } }}
      >
        <p>Are you sure you want to delete a department titled: {selectedDepartmentToDelete?.departmentName}?</p>
      </Modal>

      <div className="pagination">
        <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'darkgrey' }}>
          <GrFormPrevious />
        </Button>
        <span> Page {page} of {pages}</span>
        <Button disabled={page === pages} onClick={() => handlePageChange(page + 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'darkgrey' }}>
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
};

ViewAllDepartments.propTypes = {
  departments: PropTypes.array,
  loading: PropTypes.bool,
  handlePageChange: PropTypes.func,
  page: PropTypes.number,
  pages: PropTypes.number,
  getDepartments: PropTypes.func
};

export default ViewAllDepartments;