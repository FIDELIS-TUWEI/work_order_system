import { Button, Card } from "antd";
import {BiSolidEditAlt} from "react-icons/bi";
import {AiFillEye} from "react-icons/ai";


const AllUsers = ({ allUsers, loading, page, pages, handlePageChange, navigate}) => {
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
    </div>
  )
}

export default AllUsers