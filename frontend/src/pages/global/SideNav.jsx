import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Person3Icon from "@mui/icons-material/Person3";
import WorkIcon from "@mui/icons-material/Work";
import { Avatar, Box, Tooltip, Typography, styled } from '@mui/material';
import Logout from "@mui/icons-material/Logout";
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import Home from '../Home';
import DashUsers from '../admin/manager/DashUsers';
import DashTasks from '../admin/tasks/DashTasks';
import LogIn from '../../features/LogIn';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  
  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );

const SideNav = ({ open, setOpen }) => {
    
  const dispatch = useDispatch();

//const list = useMemo(() => [
//    { title: "Main", icon: <DashboardIcon />, link: "", component: <Home/> },
//    { title: "Users", icon: <GroupAddIcon />, link: "/users/list", component: <DashUsers/> },
//    { title: "Tasks", icon: <WorkIcon />, link: "tasks/list", component: <DashTasks/> },
//    { title: "Profile", icon: <Person3Icon />, link: "/info", component: <LogIn/> },
//], [])


  const navigate = useNavigate();

    // function to handle logout
    const handleLogout = () => {
        dispatch(userLogoutAction());
        window.location.reload(true);
        setTimeout(() => {
        navigate("/");
        }, 500)
    };

  return (
    <>
     <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Main" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <Box sx={{ mx: "auto", mt: 3, mb: 1 }}>
            <Tooltip title="current user">
                <Avatar {...open && {sx:{width:100, height:100}}}/>
            </Tooltip>
        </Box>
        <Box sx={{ textAlign: "center" }}>
            {open && <Typography>current user: Ftuwei</Typography>}
            <Typography variant='body2'>role: admin</Typography>
            <Tooltip title="logout" sx={{ mt: 1 }}>
                <IconButton onClick={handleLogout}>
                    <Logout />
                </IconButton>
            </Tooltip>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
                <Route path="" element={<Home />} />
        </Routes>
      </Box>
    </>
  )
}

export default SideNav