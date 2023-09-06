import { Button, Card, Typography } from 'antd'
import Layout from '../../../components/Layout'
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../../utils/redux/slices/authSlice';

import { RxAvatar } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const user = useSelector(selectUserInfo);
  const navigate = useNavigate();


  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>Manage Profile</Typography>
      <Card title="Profile" style={{ margin: 'auto', width: '300px' }}>
        <RxAvatar style={{ fontSize: '3rem' }} />
        <p>
          First Name: {user && user.firstName}
        </p>
        <p>
          Last Name: {user && user.lastName}
        </p>
        <p>
          Username: {user && user.username}
        </p>
        <p>
          Department: {user && user.department}
        </p>
        <p>
          Designation: {user && user.designation}
        </p>
        <p>
          Role: {user && user.role}
        </p>
        <p>
          Status: {user && user.active === true ? "Active" : "Not Active"}
        </p>

        {user && user.role === "admin" || user && user.role === "superadmin" ? (
          <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} onClick={() => {navigate(`/edit/user/${user._id}`)}}>Edit</Button>
        )
        : null}
      </Card>
    </Layout>
  )
}

export default Profile