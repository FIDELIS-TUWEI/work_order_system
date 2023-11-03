import { Button, Typography } from 'antd'
import Layout from '../../../components/Layout'
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../../utils/redux/slices/authSlice';

import { useNavigate } from 'react-router-dom';
import Logo from "../../../assets/logo.png"


const Profile = () => {
  const user = useSelector(selectUserInfo);
  const navigate = useNavigate();


  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>Profile Details</Typography>

      <div className="details--card">
          <div className="company--logo">
              <img src={Logo} alt="Logo" />
          </div>

          <div className="details--header">
            <div className="details--header1">
              <h2>First Name: {user?.firstName}</h2>
              <p>Department: {user?.department?.departmentName}</p>
            </div>
            <div className="details--header2">
              <h2>Last Name: {user?.lastName}</h2>
              <p>Designation: {user?.designation?.designationName}</p>
            </div>
          </div>

          <hr />
        <div className="details--grid">
          <div className="details">
            <span>Username:</span>
            <span>{user?.username}</span>
          </div>
          <div className="details">
            <span>Email:</span>
            <span>{user?.email}</span>
          </div>
          <div className="details">
            <span>Role:</span>
            <span>{user?.role}</span>
          </div>
          <div className="details">
            <span>Active</span>
            <span>{user?.active === true ? "Active" : "Not Active"}</span>
          </div>
        </div>
        {
          user?.role === "admin" || user?.role === "superadmin" ? (
            <Button 
              style={{ 
                color: 'white', backgroundColor: 'darkgreen', 
                border: 'none', marginTop: "10px" 
              }} 
              onClick={() => {navigate(`/edit/user/${user._id}`)}}
            >
              Edit
            </Button>
          ) : null
        }
      </div>
    </Layout>
  )
}

export default Profile;