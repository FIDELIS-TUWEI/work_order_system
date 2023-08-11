import { Button, Card, Typography } from 'antd'
import Layout from '../../../components/Layout'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectToken, selectUserInfo } from '../../../utils/redux/slices/authSlice';
const USERS_URL = "/hin";

import { RxAvatar } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const navigate = useNavigate();


  return (
    <Layout>
      <Typography>Manage Profile</Typography>
      <Card title="Profile">
        <RxAvatar />
        <p>
          FirstName: {user && user.firstName}
        </p>
        <p>
          LastName: {user && user.lastName}
        </p>
        <p>
          Username: {user && user.username}
        </p>
        <p>
          Role: {user && user.role}
        </p>
        <p>
          Status: {user && user.active === true ? "Active" : "Not Active"}
        </p>

        {user && user.role === "admin" ? (
          <Button onClick={() => {navigate(`/edit/user/${user._id}`)}}>Edit</Button>
        )
        : null}
      </Card>
    </Layout>
  )
}

export default Profile