import { 
  Assignment, ChevronLeft, Dashboard, 
  HowToReg, Login, 
  PeopleAlt 
} from '@mui/icons-material';
import { 
  Box, Divider, IconButton, 
  List, ListItem, ListItemButton, 
  ListItemIcon, ListItemText, 
  styled 
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { useMemo, useState } from 'react';
import Main from './Main/Main';
import Users from './users/Users';
import Tasks from './tasks/Tasks';
import Auth from '../Auth';
import Register from '../Register';
import { Link, useNavigate } from 'react-router-dom';



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

// eslint-disable-next-line react/prop-types
const SideBar = ({ open, setOpen}) => {
  // state for selected links
  const [selectedLink, setSelectedLink] = useState();
  
  // List Icons
  const list = useMemo(() => [
    { 
      title: 'Main', 
      icon: <Dashboard />, 
      link: '/profile', 
      component: <Main { ...{setSelectedLink, link: '/profile'} } /> },
    { 
      title: 'Users', 
      icon: <PeopleAlt />, 
      link: '/allusers', 
      component: <Users { ...{setSelectedLink, link: '/allusers'} } /> },
    { 
      title: 'Tasks', 
      icon: <Assignment />, 
      link: '/alltasks', 
      component: <Tasks { ...{setSelectedLink, link: '/alltasks'} } /> },
    { 
      title: 'Login', 
      icon: <Login />, 
      link: '/login', 
      component: <Auth { ...{setSelectedLink, link: '/login'} } /> },
    { 
      title: 'Register', 
      icon: <HowToReg />, 
      link: '/register', 
      component: <Register { ...{setSelectedLink, link: '/register'} } /> },

  ], []);

  // navigate
  const navigate = useNavigate();

    return ( 
        <>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={() => setOpen(false)}>
                        <ChevronLeft />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                    <List>
                    {list.map((item) => (
                        <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            }}
                            onClick={() => navigate(item.link)}
                            selected={selectedLink === item.link}
                        >
                            <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                            >
                            {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                        </ListItem>
                    ))}
                    </List>
                <Divider />
            
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                
                <Link>
                    {list.map(item => {
                      <Link key={list.title} path={item.link} element={list.component} />
                    })}
                </Link>
            </Box>
        </>
     );
}
 
export default SideBar;