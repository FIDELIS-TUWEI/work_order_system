import PropTypes from "prop-types";
import { Button, Card, Modal, Table, Tooltip, Typography, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {MdDelete} from "react-icons/md";
import { useState } from "react";
import { useDeleteDepartmentMutation } from "@/features/departments/departmentSlice";


const ViewAllDepartments = ({ departments, loading, refetch }) => {
  const { id } = useParams();
  const [deleteDepartment] = useDeleteDepartmentMutation(id);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDepartmentToDelete, setSelectedDepartmentToDelete] = useState(null);
  const navigate = useNavigate();

  // Function to show modal to delete department
  const showModal = async (department) => {
    setSelectedDepartmentToDelete(department);
    setIsModalVisible(true);
  }

  // Function to confirm modal delete department
  const handleDelete = async () => {
    try {
      const { error } = await deleteDepartment(selectedDepartmentToDelete._id).unwrap();

      if (error) {
        if (error === 400 && error.data && error.data.message) {
          message.error(error.data.message);
        } else {
          message.error("Failed to delete department")
        }
      } else {
        message.success("Department deleted successfully");
        setIsModalVisible(false);
        refetch();
      }
    } catch (error) {
      message.error(error.message);
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
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
        All Departments
      </Typography>
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
  refetch: PropTypes.func
};

export default ViewAllDepartments;