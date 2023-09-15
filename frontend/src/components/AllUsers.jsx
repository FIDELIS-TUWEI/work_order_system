import { Button, Card } from "antd";
import {BiSolidEditAlt} from "react-icons/bi";
import {AiFillEye} from "react-icons/ai";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";


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
        <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} style={{ border: 'none', margin: '0 5px' }}>
          <GrFormPrevious />
        </Button>
        <span> Page {page} of {pages}</span>
        <Button disabled={page === pages} onClick={() => handlePageChange(page + 1)} style={{ border: 'none', margin: '0 5px' }}>
          <GrFormNext />
        </Button>
      </div>
    </div>
  )
}

export default AllUsers