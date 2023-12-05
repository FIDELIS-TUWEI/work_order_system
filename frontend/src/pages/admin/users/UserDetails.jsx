import { Button, Tooltip, Typography, message } from 'antd';
import Layout from '../../../components/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { getUserInfo } from '../../../services/usersApi';
import { useSelector } from 'react-redux';
import { selectToken, selectUserInfo } from '../../../utils/redux/slices/authSlice';
import Logo from "../../../assets/logo.png"

const UserDetails = () => {
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const [userDetails, setUserDetails] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();


  // function to get user details
  const getUserDetails = useCallback (async (id) => {
    try {
      const res = await getUserInfo(id, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserDetails(res.data);
    } catch (error) {
      message.error("Failed to fetch user details", error.message);
    }
  }, [token]);

  // UseEffect hook
  useEffect(() => {
    if (id) {
      getUserDetails(id);
    }
  }, [id, getUserDetails]);

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>User Details</Typography>
      <div className="details--card">
        <div className="company--logo">
            <img src={Logo} alt="Logo" />
        </div>

        <div className="details--header">
          <div className="details--header1">
            <h2>First Name: {userDetails?.firstName}</h2>
            <p>Department: {userDetails?.department?.departmentName}</p>
          </div>
          <div className="details--header2">
            <h2>Last Name: {userDetails?.lastName}</h2>
            <p>Designation: {userDetails?.designation?.designationName}</p>
          </div>
        </div>

        <hr />
        <div className="details--grid">
          <div className="details">
            <span>Username:</span>
            <span>{userDetails?.username}</span>
          </div>
          <div className="details">
            <span>Email:</span>
            <span>{userDetails?.email}</span>
          </div>
          <div className="details">
            <span>Role:</span>
            <span>{userDetails?.role}</span>
          </div>
          <div className="details">
            <span>Active:</span>
            <span>{userDetails?.active === true ? "Active" : "Not Active"}</span>
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
            onClick={() => {navigate(`/updatePassword/${userDetails?._id}`)}} 
            disabled={user?.role !== "superadmin"}
            style={{ color: 'black', backgroundColor: 'white', border: '1px solid black', marginLeft: '10px' }}
          >
            Change Password
          </Button>
        </Tooltip>
        
        </div>
        
        </div>
    </Layout>
  )
}

export default UserDetails;