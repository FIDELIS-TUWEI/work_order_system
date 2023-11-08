import { Button, Card, Tooltip, message } from 'antd';
import Layout from '../../../components/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { getUserInfo } from '../../../services/usersApi';
import { useSelector } from 'react-redux';
import { selectToken, selectUserInfo } from '../../../utils/redux/slices/authSlice';

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
      <Card title="User Details" style={{ margin: 'auto', width: '300px' }}>
        <p>
          First Name: {userDetails?.firstName}
        </p>
        <p>
          Last Name: {userDetails?.lastName}
        </p>
        <p>
          Username: {userDetails?.username}
        </p>
        <p>
          Department: {userDetails?.department?.departmentName}
        </p>
        <p>
          Designation: {userDetails?.designation?.designationName}
        </p>
        <p>
          Role: {userDetails?.role}
        </p>
        <p>
          Status: {userDetails?.active === true ? "Active" : "Not Active"}
        </p>
        <Tooltip title={user?.role !== "superadmin" ? "Only System admin can change password" : "Edit Password"}>
          <Button 
            onClick={() => {navigate(`/updatePassword/${userDetails?._id}`)}} 
            disabled={user?.role !== "superadmin"}
            style={{ color: 'black', backgroundColor: 'white', border: '1px solid black', marginLeft: '10px' }}
          >
            Change Password
          </Button>
        </Tooltip>
        <Tooltip title="Back">
          <Button 
            style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none', marginLeft: '10px' }} 
            onClick={() => {navigate(-1)}}
          >
            Back
          </Button>
        </Tooltip>
      </Card>
    </Layout>
  )
}

export default UserDetails;