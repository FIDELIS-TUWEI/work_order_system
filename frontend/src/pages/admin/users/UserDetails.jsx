import { Button, Card } from 'antd';
import Layout from '../../../components/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../../../services/usersApi';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../utils/redux/slices/authSlice';

const UserDetails = () => {
  const token = useSelector(selectToken);
  const [userDetails, setUserDetails] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();


  // function to get user details
  const getUserDetails = async (id) => {
    const res = await getUserInfo(id, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUserDetails({...res.data});
  };

  // UseEffect hook
  useEffect(() => {
    if (id) {
      getUserDetails(id);
    }
  }, [id]);

  // display department name
  const departmentTitle = userDetails.department
      ? `${userDetails.department.departmentName}`
      : null

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
          Department: {departmentTitle}
        </p>
        <p>
          Designation: {userDetails?.designationName}
        </p>
        <p>
          Role: {userDetails?.role}
        </p>
        <p>
          Status: {userDetails?.active === true ? "Active" : "Not Active"}
        </p>
        <Button onClick={() => {navigate(`/updatePassword/${userDetails?._id}`)}}>Change Password</Button>
        <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none', marginLeft: '10px' }} onClick={() => {navigate(-1)}}>Back</Button>
      </Card>
    </Layout>
  )
}

export default UserDetails