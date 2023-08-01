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
import WorkIcon from "@mui/icons-material/Work";
import Analytics from "@mui/icons-material/Analytics"
import { Avatar, Box, Tooltip, Typography, styled } from '@mui/material';
import Logout from "@mui/icons-material/Logout";
import Home from '../Home';
import DashUsers from '../admin/Users';
import DashTasks from '../admin/Tasks';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAction } from '../../utils/redux/actions/userAction';
import { useNavigate } from 'react-router-dom';


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
  const { userInfo } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuData, setMenuData] = useState("Home");

  const logOut = () => {
    dispatch(userLogoutAction());
    setTimeout(() => {
      window.location.reload(true);
      navigate("/");
    }, 500);
  };

  const renderMainListItem = (text, icon) => {
    return (
      <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setMenuData(text)}>
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
            {icon}
          </ListItemIcon>
          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    );
  };

  const renderMenuItems = () => {
    if (userInfo.role === "admin") {
      return (
        <>
          <List>
            {renderMainListItem("Main", <DashboardIcon />)}
          </List>
          <List>
            {renderMainListItem("Users", <GroupAddIcon />)}
          </List>
          <List>
            {renderMainListItem("Tasks", <WorkIcon />)}
          </List>
          <List>
            {renderMainListItem("Analysis", <Analytics />)}
          </List>
        </>
      );
    } else {
      return (
        <>
          <List>
            {renderMainListItem("Tasks", <WorkIcon />)}
          </List>
        </>
      );
    }
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
        {renderMenuItems()}
        <Divider />
        <Box sx={{ mx: "auto", mt: 3, mb: 1 }}>
          <Tooltip title="current user">
            <Avatar {...open && { sx: { width: 100, height: 100 } }} />
          </Tooltip>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          {open && <Typography>{userInfo.username}</Typography>}
          <Typography variant='body2'>role</Typography>
          <Tooltip title="logout" sx={{ mt: 1 }}>
            <IconButton onClick={logOut}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {menuData === "Home" && <Home />}
        {menuData === "Users" && <DashUsers />}
        {menuData === "Tasks" && <DashTasks />}
      </Box>
    </>
  );
};


export default SideNav;