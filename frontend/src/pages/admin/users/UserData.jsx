import PropTypes from "prop-types";
import { Button, Tooltip, Typography } from 'antd';
import Logo from "@/assets/images/logo.png";
import LoadingBox from "@/components/LoadingBox";


const UserData = ({ userInfoArray, navigate, user, loading, error }) => {
  // Conditional statement to display loading and error messages
  if (loading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <LoadingBox />
    </div>;
  };

  if (error) {
    return message.error(error);
  };

  const departmentTitle = userInfoArray.department 
    ? `${userInfoArray.department.departmentName}`
    : "No department";

  const designationTitle = userInfoArray.designation
    ? `${userInfoArray.designation.designationName}`
    : "No designation";

  return (
    <>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
        User Details
      </Typography>
      <div className="details--card">
        <div className="company--logo">
            <img src={Logo} alt="Logo" />
        </div>

        <div className="details--header">
          <div className="details--header1">
            <h2>First Name: {userInfoArray?.firstName}</h2>
            <p>Department: {departmentTitle}</p>
          </div>
          <div className="details--header2">
            <h2>Last Name: {userInfoArray?.lastName}</h2>
            <p>Designation: {designationTitle}</p>
          </div>
        </div>

        <hr />
        <div className="details--grid">
          <div className="details">
            <span>Username:</span>
            <span>{userInfoArray?.username}</span>
          </div>
          <div className="details">
            <span>Email:</span>
            <span>{userInfoArray?.email}</span>
          </div>
          <div className="details">
            <span>Role:</span>
            <span>{userInfoArray?.role}</span>
          </div>
          <div className="details">
            <span>Active:</span>
            <span>{userInfoArray?.active === true ? "Active" : "Not Active"}</span>
          </div>
        </div>
        <div className="add-btn">
          <Tooltip title="Back">
            <Button 
              style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none', marginLeft: '10px' }} 
              onClick={() => {navigate(-1)}}
            >
              Back
            </Button>
          </Tooltip>
          <Tooltip title={user?.role !== "superadmin" ? "Only System admin can change password" : "Edit Password"}>
            <Button 
              onClick={() => {navigate(`/updatePassword/${userInfoArray?._id}`)}} 
              disabled={user?.role !== "superadmin"}
              style={{ color: 'black', backgroundColor: 'white', border: '1px solid black', marginLeft: '10px' }}
            >
              Change Password
            </Button>
          </Tooltip>
        </div>
      </div>
    </>
  )
};

UserData.propTypes = {
  userInfoArray: PropTypes.array,
  navigate: PropTypes.func,
  user: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.object,
};

export default UserData;