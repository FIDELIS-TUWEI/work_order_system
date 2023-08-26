import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Card } from "antd";
import { getAllUsers } from "../../../services/usersApi";
import {BiSolidEditAlt} from "react-icons/bi";
import {AiFillEye} from "react-icons/ai";


const UsersAll = () => {
  const token = useSelector(selectToken);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    getUsers();
  }, [currentPage]);

  // Function to get all users from Api
const getUsers = async () => {
  setLoading(true);
  const { data, pages } = await getAllUsers(currentPage, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  setAllUsers(data);
  setTotalPages(pages);
  setLoading(false);
};

// function to handle page change
const handlePageChange = (newPage) => {
  setCurrentPage(newPage);
}

  return (
    <Layout>
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
                <Button danger style={{ border: 'none'}} onClick={() => {navigate(`/edit/user/${user._id}`)}}>
                  <BiSolidEditAlt/>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </Card>
      <div className="pagination">
        {Array.from({length: totalPages}, (_, index) => index + 1).map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page}
            style={{margin: '0 5px'}}
          >
            {page}
          </Button>
        ))}
      </div>
      
      
    </Layout>
  )
}

export default UsersAll