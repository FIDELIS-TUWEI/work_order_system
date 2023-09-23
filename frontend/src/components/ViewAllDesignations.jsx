import { Button, Card, Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import {MdDelete} from "react-icons/md";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../utils/redux/slices/authSlice";
import { deleteDesignation } from "../services/designation";


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
  }

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

      <Card loading={loading} title="All Designations" style={{ margin: "auto", width: "500px" }}>
        <table>
          <thead>
            <tr>
              <th>Designation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {designations.map((designation) => (
              <tr key={designation._id}>
                <td>{designation.designationName}</td>
                <td className="actions__btn">
                  <Button danger style={{ border: "none" }}
                    onClick={() => showModal(designation)}
                  >
                    <MdDelete />
                  </Button>  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal
        title="Delete Designation"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleDelete}>
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this designation?</p>
      </Modal>

      <div className="pagination">
        <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} style={{ border: 'none', margin: '0 5px' }}>
          <GrFormPrevious />
        </Button>
        <span> Page {page} of {pages}</span>
        <Button disabled={page === pages} onClick={() => handlePageChange(page + 1)} style={{ border: 'none', margin: '0 5px' }}>
          <GrFormNext />
        </Button>
      </div>
    </>
  )
}

export default ViewAllDesignations;