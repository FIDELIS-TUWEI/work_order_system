import PropTypes from "prop-types";
import { Button, Card, Modal, Table, Tooltip, message } from "antd";
import {BiSolidEditAlt} from "react-icons/bi";
import {AiFillEye} from "react-icons/ai";
import {MdDelete} from "react-icons/md";
import { selectToken } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteUserMutation } from "@/features/users/userSlice";


const AllUsers = ({ allUsersArray, loading, refetch}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation(id);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUserToDelete, setSelectedUserToDelete] = useState(null);
  const token = useSelector(selectToken);

  // determine whether edit or delete button should be disabled for none admin or superadmin roles
  const currentUserRole = token.role;

  // Fucntion to show modal to delete user
  const showModal = async (user) => {
    setSelectedUserToDelete(user);
    setIsModalVisible(true);
  };

  // Function to confirm modal delete
  const handleDelete = async () => {
      try {
         const { error } = await deleteUser(selectedUserToDelete._id).unwrap();

         if (error) {
          if (error.status === 400 && error.data && error.data.message) {
            message.error(error.data.message);
          } else {
            message("Failed to delete the User")
          }
         } else {
          message.success("User deleted successfully");
          setIsModalVisible(false);
          refetch();
         }
      } catch (error) {
          message.error("An error occurred while deleting the user", error);
      }
  };

  // Function to handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // antD columns
  const columns = [
    {
      title: "First Name",
      width: 100,
      fixed: "left",
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      width: 100,
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Username",
      width: 100,
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      width: 100,
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      fixed: "right",
      width: 120,
      align: "center",
      responsive: ["md", "lg"],
      render: (_, user) => (
        <>
          <Tooltip title="View User Details">
            <Button
              style={{ color: "grey", border: "none", margin: "0 5px" }}
              onClick={() => navigate(`/user/details/${user._id}`)}
            >
              <AiFillEye />
            </Button>
          </Tooltip>
          {(currentUserRole === "admin" || user.role !== "superadmin") ? (
            <>
              <Tooltip title="Edit User">
                <Button
                  style={{ color: "green", border: "none", margin: "0 5px" }}
                  onClick={() => navigate(`/edit/user/${user._id}`)}
                >
                  <BiSolidEditAlt />
                </Button>
              </Tooltip>
        
              <Tooltip title="Delete User">
                <Button
                  style={{ color: "red", border: "none", margin: "0 5px" }}
                  onClick={() => showModal(user)}
                >
                  <MdDelete />
                </Button>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Edit User">
                <Button
                  style={{ color: "green", border: "none", margin: "0 5px" }}
                  onClick={() => navigate(`/edit/user/${user._id}`)}
                  disabled={ currentUserRole !== "superadmin" }
                >
                  <BiSolidEditAlt />
                </Button>
              </Tooltip>
        
              <Tooltip title="Delete User">
                <Button
                  style={{ color: "red", border: "none", margin: "0 5px" }}
                  onClick={() => showModal(user)}
                  disabled={ currentUserRole !== "superadmin" }
                >
                  <MdDelete />
                </Button>
              </Tooltip>
            </>
          )}
        </>
      )
    }
  ]

  

  return (
    <div>
        <div className="add-btn">
          <Button 
            style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} 
            onClick={() => navigate("/users/register")}
          >
            Add User
          </Button>  
      </div>

      <Card>
        <Table 
          loading={loading}
          dataSource={allUsersArray}
          columns={columns}
          pagination={false}
          rowKey="_id"
          scroll={{ x: 600, y: 300 }}
        />
      </Card>

      <Modal
        title="Delete User"
        open={isModalVisible}
        onOk={handleDelete} 
        onCancel={handleCancel}
        okText="Delete"
        okButtonProps={{ style: { backgroundColor: 'green', border: 'none' } }}
        cancelButtonProps={{ style: { backgroundColor: 'red', border: 'none', color: 'white' } }}
      >
        <p>Are you sure you want to delete {selectedUserToDelete?.username}?</p>
      </Modal>

      <div className="add-btn">
        <Button 
          onClick={() => navigate(-1)} 
          style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} 
        >
          Go Back
        </Button>
      </div>
    </div>
  )
};

AllUsers.propTypes = {
  loading: PropTypes.bool,
  allUsersArray: PropTypes.array,
  refetch: PropTypes.func
}

export default AllUsers;