import PropTypes from "prop-types";
import { Button, Modal, Table, Tooltip, message } from "antd";
import { useNavigate } from "react-router-dom";
import {MdDelete} from "react-icons/md";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "@/features/auth/authSlice";
import { deleteDesignation } from "../../../services/designation";


const ViewAllDesignations = ({ designations, loading, handlePageChange, page, pages, getDesignations }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDesignationToDelete, setSelectedDesignationToDelete] = useState(null);
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  // Function to show modal to delete designation
  const showModal = async (designation) => {
    setSelectedDesignationToDelete(designation);
    setIsModalVisible(true);
  };

  // Function to confirm modal delete designation
  const handleDelete = async () => {
    try {
      await deleteDesignation(selectedDesignationToDelete._id, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Designation deleted successfully");
      setIsModalVisible(false);
      getDesignations();
    } catch (error) {
      console.error(error);
      message.error("An error occurred while deleting the designation", error);
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
      <div className="add-btn">
      <Button
          style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}
          onClick={() => navigate("/create/designation")}
      >
          Add Designation
      </Button>
      </div>

      <Table 
        loading={loading}
        columns={columns}
        dataSource={designations}
        rowKey="_id"
        pagination={false}
      />

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

      <div className="pagination">
        <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'lightgrey' }}>
          <GrFormPrevious />
        </Button>
        <span> Page {page} of {pages}</span>
        <Button disabled={page === pages} onClick={() => handlePageChange(page + 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'lightgrey' }}>
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

ViewAllDesignations.propTypes = {
  designations: PropTypes.array,
  loading: PropTypes.bool,
  handlePageChange: PropTypes.func,
  page: PropTypes.number,
  pages: PropTypes.number,
  getDesignations: PropTypes.func
};

export default ViewAllDesignations;