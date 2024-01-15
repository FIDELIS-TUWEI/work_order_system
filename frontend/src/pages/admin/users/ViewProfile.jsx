import PropTypes from "prop-types";
import { Button, Tooltip } from 'antd'
import Logo from "@/assets/images/logo.png"

const ViewProfile = ({ user, navigate, userData }) => {

  const designationTitle = userData.designation
    ? `${userData.designation.designationName}`
    : "No designation"

  return (
    <>
    <div className="details--card">
          <div className="company--logo">
              <img src={Logo} alt="Logo" />
          </div>

          <div className="details--header">
            <div className="details--header1">
              <h2>First Name: {userData?.firstName}</h2>
              <p>Department: {userData?.department?.departmentName}</p>
            </div>
            <div className="details--header2">
              <h2>Last Name: {userData?.lastName}</h2>
              <p>Designation: {designationTitle}</p>
            </div>
          </div>

          <hr />
        <div className="details--grid">
          <div className="details">
            <span>Username:</span>
            <span>{userData?.username}</span>
          </div>
          <div className="details">
            <span>Email:</span>
            <span>{userData?.email}</span>
          </div>
          <div className="details">
            <span>Role:</span>
            <span>{userData?.role}</span>
          </div>
          <div className="details">
            <span>Active:</span>
            <span>{userData?.active === true ? "Active" : "Not Active"}</span>
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
      <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '1rem' }}>
        <Tooltip title="Back">
          <Button 
            style={{ 
              color: 'white', backgroundColor: 'darkgreen', border: 'none'
              }} 
              onClick={() => navigate(-1)}
            >
              Back
          </Button>
        </Tooltip>
        <Tooltip title="Back">
          <Button 
            style={{ 
              color: 'white', backgroundColor: 'darkgreen', border: 'none'
              }} 
              onClick={() => navigate(`/user/work/history/${id}`)}
            >
              Work History
          </Button>
        </Tooltip>
        </div>
    </>
  )
};

ViewProfile.PropTypes = {
    user: PropTypes.object,
    navigate: PropTypes.func,
    userData: PropTypes.array
};

export default ViewProfile;