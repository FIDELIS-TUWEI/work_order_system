import { Button, Card, Modal, message, Tooltip } from "antd"
import {AiFillEye} from "react-icons/ai"
import {BiSolidEditAlt} from "react-icons/bi"
import {MdDelete} from "react-icons/md";
import { useNavigate } from "react-router-dom"
import { selectToken } from "../utils/redux/slices/authSlice"
import { useSelector } from "react-redux"
import { deleteWorkOrder } from "../services/workApi"
import { useState } from "react";

const Work = ({allWork, user, loading, getAllWork}) => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedWorkToDelete, setSelectedWorkToDelete] = useState(null);
  const token = useSelector(selectToken);

  // Function to show modal to delete work
  const showModal = async (work) => {
      setSelectedWorkToDelete(work);
      setIsModalVisible(true);
  };

  // Function to confirm modal delete
  const handleDelete = async () => {
      try {
          await deleteWorkOrder(selectedWorkToDelete._id, {
              withCredentials: true,
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          message.success("Work deleted successfully");
          setIsModalVisible(false);
          getAllWork();
      } catch (error) {
          console.error(error);
          message.error("An error occurred while deleting the work order", error);
      }
  };

  // Function to handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Function to check if user is authorised to view, edit or delete work
  const isAuthorised = 
    user?.role === "admin" || 
    user?.role === "superadmin" || 
    user?.role === "hod" || 
    user?.role === "supervisor" || 
    user?.role === "reviewer" || 
    user?.role === "engineer";

    // Function to determine whether edit or delete button should be displayed
    const allowEditWork = (work) => {
        // check if work order status is not completed
        if (work.status !== "Reviewed") {
            // Allow edit button for authorised users
            return isAuthorised;
        } else {
            // Disable delete button for unauthorised users
            if (["engineer", "hod", "reviewer"].includes(user?.role)) {
                return false;
            }

            // Enable delete button for authorised users
            if (["admin", "superadmin"].includes(user?.role)) {
                return true;
            }
        }

    }

  return (
    <>
        <div className="add-btn">
            <Button 
            style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} 
            onClick={() => navigate("/new/work")}
            >
            New Work
            </Button>

        </div>

        <Card 
            loading={loading} 
            title="All Work Orders"
        >
            
        <table>
            <thead>
                <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Service Type</th>
                <th>Category</th>
                <th>Status</th>
                <th>Requested By</th>
                <th>Assigned To</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {allWork.map((work) => (
                <tr key={work._id}>
                    <td>{work.title}</td>
                    <td>{work.location?.locationTitle}</td>
                    <td>{work.serviceType}</td>
                    <td>{work.category?.categoryTitle}</td>
                    <td>{work.status}</td>
                    <td>{work.requestedBy?.username}</td>
                    <td>{work.assignedTo?.firstName} {work.assignedTo?.lastName}</td>
                    <td className="actions__btn">
                    <Button style={{ color: 'green', border: 'none', margin: '0 5px'}} onClick={() => navigate(`/work/details/${work._id}`)}><AiFillEye/></Button>
                    
                        {allowEditWork(work) && ( 
                            <Tooltip title={["admin", "superadmin", "engineer"].includes(user?.role) ? "Edit Work" : "You are not Authorised to edit this work"}>
                                <Button danger style={{ border: 'none', marginRight: "5px"}} 
                                    onClick={() => navigate(`/edit/work/${work._id}`)}
                                    disabled={work?.status === "Complete" && user?.role === "engineer"}
                                >
                                    <BiSolidEditAlt/>
                                </Button> 
                            </Tooltip>
                        )}
                        
                        { allowEditWork(work) && (
                            <Tooltip title={["admin", "superadmin"].includes(user?.role) ? "Delete Work" : "You are not authorised to delete this work order"}>
                                <Button danger style={{ border: 'none'}} onClick={() => showModal(work)} disabled={!["admin", "superadmin"].includes(user?.role)}>
                                    <MdDelete/>
                                </Button>
                            </Tooltip>
                        )}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>

            <Modal
                title="Delete Work"
                open={isModalVisible}
                onOk={handleDelete} 
                onCancel={handleCancel}
                okText="Delete"
                okButtonProps={{ style: { backgroundColor: 'green', border: 'none' } }}
                cancelButtonProps={{ style: { backgroundColor: 'red', border: 'none', color: 'white' } }}
            >
                <p>Are you sure you want to delete a work order titled: {selectedWorkToDelete?.title}?</p>
            </Modal>
            
        </Card>
        

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

export default Work;