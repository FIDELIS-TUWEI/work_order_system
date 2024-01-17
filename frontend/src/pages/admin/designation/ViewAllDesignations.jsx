import PropTypes from "prop-types";
import { Button, Card, Modal, Table, Tooltip, Typography, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {MdDelete} from "react-icons/md";
import { useState } from "react";
import { useDeleteDesignationMutation } from "@/features/designations/designationSlice";


const ViewAllDesignations = ({ designations, loading, refetch }) => {
  const { id } = useParams();
  const [deleteDesignation] = useDeleteDesignationMutation(id);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDesignationToDelete, setSelectedDesignationToDelete] = useState(null);
  const navigate = useNavigate();

  // Function to show modal to delete designation
  const showModal = async (designation) => {
    setSelectedDesignationToDelete(designation);
    setIsModalVisible(true);
  };

  // Function to confirm modal delete designation
  const handleDelete = async () => {
    try {
      const { error } = await deleteDesignation(selectedDesignationToDelete._id).unwrap();

      if (error) {
        if (error === 400 && error.data && error.data.message) {
          message.error(error.data.message);
        } else {
          message.error("Failed to delete designation");
        }
      } else {
        message.success("Designation deleted successfully");
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

  //Antd Table columns
  const columns = [
    {
      title: "Designation",
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "designationName",
      key: "designationName",
    },
    {
      title: "Action",
      align: "center",
      responsive: ["md", "lg"],
      key: "action",
      render: (_, designation) => (
        <Tooltip title="Delete Designation">
          <Button
            danger
            style={{ border: "none" }}
            onClick={() => showModal(designation)}
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
        All Designations
      </Typography>
      <div className="add-btn">
      <Button
          style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}
          onClick={() => navigate("/create/designation")}
      >
          Add Designation
      </Button>
      </div>

      <Card>
        <Table 
          loading={loading}
          columns={columns}
          dataSource={designations}
          rowKey="_id"
          pagination={false}
        />
      </Card>

      <Modal
        title="Delete Designation"
        open={isModalVisible}
        onOk={handleDelete} 
                onCancel={handleCancel}
                okText="Delete"
                okButtonProps={{ style: { backgroundColor: 'green', border: 'none' } }}
                cancelButtonProps={{ style: { backgroundColor: 'red', border: 'none', color: 'white' } }}
      >
        <p>Are you sure you want to delete a designation titled: {selectedDesignationToDelete?.designationName}?</p>
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

ViewAllDesignations.propTypes = {
  designations: PropTypes.array,
  loading: PropTypes.bool,
  refetch: PropTypes.func
};

export default ViewAllDesignations;