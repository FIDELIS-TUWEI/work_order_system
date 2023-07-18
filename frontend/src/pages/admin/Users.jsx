import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, styled } from '@mui/material'
import AddIcon from "@mui/icons-material/Add";
import axios from 'axios';

import { getUser } from '../../utils/redux/slice/userSlice';
import Footer from '../../components/Footer';

const StyledTable = styled(Table)`
  width: '90%',
  margin: '50px 0 0 50px',
`

const THead = styled(TableRow)`
  & > th {
    font-size: 20px,
    background: #000000,
    color: #FFFFFF
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 18px,
  }
`;

// backend url endpoint
const URL = 'http://localhost:5000/hin'

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const navigate = useNavigate();

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
      <Typography variant="h4" sx={{ color: 'white', pb: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          Users List
      </Typography>
      <Box sx={{ pb: 2, display: 'flex', justifyContent: 'right' }}>
        <Button onClick={() => navigate('/users/create')} variant="contained" color="success" startIcon={<AddIcon />} sx={{ mr: 3 }}>
          <Link style={{ color: 'white', textDecoration: 'none' }}>Create User</Link>
        </Button>
      </Box>
      <StyledTable>
        
        <TableHead>
          <THead>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell>Actions</TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.date}</TableCell>
              <TableCell sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                <Button variant='contained' color='primary' onClick={() => navigate(`/users/edit/${user._id}`)}>Edit</Button>
                <Button variant='contained' color='error' onClick={() => navigate(`/users/delete/${user._id}`)}>Delete</Button>
                </TableCell>
            </TRow>
          ))}
        </TableBody>
      </StyledTable>
      <Footer />
    </>
  );
};

export default Users