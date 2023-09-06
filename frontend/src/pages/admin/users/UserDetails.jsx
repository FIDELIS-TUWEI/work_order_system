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

  useEffect(() => {
    if (id) {
      getUserDetails(id);
    }
  }, [id]);

  // function to get user details
  const getUserDetails = async (id) => {
    const res = await getUserInfo(id, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUserDetails({...res.data});
  }

  return (
    <Layout>
      <Card title="User Details" style={{ margin: 'auto', width: '300px' }}>
        <p>User Id: {id}</p>
        <p>
          First Name: {userDetails && userDetails.firstName}
        </p>
        <p>
          Last Name: {userDetails && userDetails.lastName}
        </p>
        <p>
          Username: {userDetails && userDetails.username}
        </p>
        <p>
          Department: {userDetails && userDetails.department}
        </p>
        <p>
          Designation: {userDetails && userDetails.designation}
        </p>
        <p>
          Role: {userDetails && userDetails.role}
        </p>
        <p>
          Status: {userDetails && userDetails.active === true ? "Active" : "Not Active"}
        </p>

        <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} onClick={() => {navigate(-1)}}>Back</Button>
      </Card>
    </Layout>
  )
}

export default UserDetails