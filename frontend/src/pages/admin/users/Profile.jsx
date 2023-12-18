import { Button, Tooltip, Typography, message } from 'antd'
import Layout from '../../../components/Layout'
import { useSelector } from 'react-redux';
import { selectToken, selectUserInfo } from '../../../utils/redux/slices/authSlice';

import { useNavigate, useParams } from 'react-router-dom';
import Logo from "../../../assets/logo.png"
import { useCallback, useEffect, useState } from 'react';
import { getUserInfo } from '../../../services/usersApi';


const Profile = () => {
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();

  // Function to get user data
  const getUserData = useCallback (async (id) => {
    try {
      const res = await getUserInfo(id, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(res.data);
    } catch (error) {
      message.error("Failed to fetch user details", error.message);
    }
  }, [token]);

  // useEffect hook
  useEffect(() => {
    if (id) {
      getUserData(id);
    }
  }, [id, getUserData]);


  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>Profile Details</Typography>

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
              <p>Designation: {userData?.designation?.designationName}</p>
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
    </Layout>
  )
};

export default Profile;