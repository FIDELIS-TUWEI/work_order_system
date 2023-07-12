import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from "@mui/icons-material/Home"
import Brightness7 from "@mui/icons-material/Brightness7";
import Brightness4 from "@mui/icons-material/Brightness4";
import { useState } from 'react';
import SideNav from './SideNav';
import { IconButton, ThemeProvider, Tooltip } from '@mui/material';
import { useMemo } from 'react';
import { createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  // Dark theme with useMemo
  const darkTheme = useMemo(() => createTheme({
    palette: {
        mode: dark ? "dark" : "light"
    }
  }), [dark]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // navigate hook
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Tooltip title="Go back home">
            <IconButton sx={{ mr: 1 }} onClick={() => navigate("/")}>
                <HomeIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Work Order System
          </Typography>
          <IconButton onClick={() => setDark(!dark)}>
            { dark ? <Brightness7 /> : <Brightness4 /> }
          </IconButton>
        </Toolbar>
      </AppBar>
      <SideNav {...{open, setOpen}}/>
    </Box>
    </ThemeProvider>
  );
}