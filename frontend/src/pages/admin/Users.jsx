import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, Typography, Paper } from "@mui/material"
import AddIcon from "@mui/icons-material/Add";
import axios from 'axios';

import { getUser } from '../../utils/redux/slice/userSlice';
import Footer from '../../components/Footer';

// backend url endpoint
const URL = 'http://localhost:5000/hin'

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const navigate = useNavigate();

  const handleCreateUser = () => {
    navigate('/users/create');
  };

  useEffect(() => {
const fetchData = async () => {
  try {
    const response = await axios.get(`${URL}/all-users`);
    dispatch(getUser(response.data));
  } catch (error) {
    console.log(error);
  }
};
    fetchData();
  }, []);


  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ color: 'white', pb: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          Users List
        </Typography>
        <Box sx={{ pb: 2, display: 'flex', justifyContent: 'right' }}>
          <Button onClick={handleCreateUser} variant="contained" color="success" startIcon={<AddIcon />} sx={{ mr: 3 }}>
            <Link style={{ color: 'white', textDecoration: 'none' }}>Create User</Link>
          </Button>
        </Box>
        <Paper sx={{ bgcolor: 'secondary.midNightBlue' }}>
          <Box sx={{ height: 400, width: '100%' }}>
            
          </Box>
        </Paper>
      </Box>
      <Footer />
    </>
  );
};

export default Users