import { Button, Card, Modal, message } from "antd";
import {BiSolidEditAlt} from "react-icons/bi";
import {AiFillEye} from "react-icons/ai";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import {MdDelete} from "react-icons/md";
import { selectToken } from "../utils/redux/slices/authSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { deleteUser } from "../services/usersApi";


const AllUsers = ({ allUsers, loading, page, pages, handlePageChange, navigate, getUsers}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUserToDelete, setSelectedUserToDelete] = useState(null);
  const token = useSelector(selectToken);


  // Fucntion to show modal to delete user
  const showModal = async (user) => {
    setSelectedUserToDelete(user);
    setIsModalVisible(true);
  };

  // Function to confirm modal delete
  const handleDelete = async () => {
      try {
         await deleteUser(selectedUserToDelete._id, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
         });
         message.success("User deleted successfully");
         setIsModalVisible(false);
         getUsers();
      } catch (error) {
          console.error(error);
          message.error("An error occurred while deleting the user", error);
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
            onClick={() => navigate("/users/register")}
          >
            Add User
          </Button>

          
      </div>

      <Card
        loading={loading}
        title="All Users"
        style={{ margin: "15px" }}
      >
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td className="actions__btn">
                <Button style={{ color: 'green', border: 'none', margin: '0 5px'}} onClick={() => {navigate(`/user/details/${user._id}`)}}>
                  <AiFillEye/>
                </Button>
                <Button danger style={{ border: 'none', marginRight: "5px"}} onClick={() => {navigate(`/edit/user/${user._id}`)}}>
                  <BiSolidEditAlt/>
                </Button>
                <Button danger style={{ border: 'none'}} onClick={() => showModal(user)}>
                  <MdDelete/>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
      </Card>
      <div className="pagination">
        <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} style={{ border: 'none', margin: '0 5px' }}>
          <GrFormPrevious />
        </Button>
        <span> Page {page} of {pages}</span>
        <Button disabled={page === pages} onClick={() => handlePageChange(page + 1)} style={{ border: 'none', margin: '0 5px' }}>
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
    </div>
  )
}

export default AllUsers