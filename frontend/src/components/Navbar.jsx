import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import WorkIcon from '@mui/icons-material/Work';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';

import { useLogoutMutation } from '../utils/redux/slices/usersApiSlice';
import { logout } from '../utils/redux/slices/authSlice';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { userInfo } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ logoutApiCall ] = useLogoutMutation();

  const [anchorElUser, setAnchorElUser] = useState(null);


  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success("Logout Succesful");
      navigate('/');
    } catch (error) {
      toast.error(error.data.error);
    }
    //dispatch(userLogoutAction());
    //window.location.reload(true);
    //setTimeout(() => {
    //  navigate('/');
    //}, 500);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'green' }}>
      <Container>
        <Toolbar disableGutters>
          <WorkIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            WORK ORDER
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              sx={{ my: 2, color: 'white', display: 'block' }}
              component={Link}
              to="/"
              style={{ color: 'white', textDecoration: 'none' }}
            >
              Home
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="user-profile" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!userInfo ? (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Button onClick={handleLogin}>
                      <Link style={{ textDecoration: 'none', color: 'green' }}>Log In</Link>
                    </Button>
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={logoutHandler}>
                  <Typography textAlign="center" style={{ textDecoration: 'none', color: 'green' }}>
                    Log Out
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;