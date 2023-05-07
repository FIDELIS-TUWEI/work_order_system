import { AppBar, Box, 
    Toolbar, Typography, 
    Button, IconButton, Container, 
    Tooltip, Menu, MenuItem
}from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// user settings
const settings = ['profile', 'Account', 'Dashboard', 'Logout']

const TopBar = () => {
    // state to handle settings
    const [anchorElUser, setAnchorElUser] = useState(null);

    // useNavigate
    const navigate = useNavigate();

    //function to handle userMenu
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // function to handle login event
    const handleLogin = () => {
        navigate('/');
    }
    return ( 
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>
                            Work Order System
                        </Typography>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title='Open settings'>
                                <IconButton
                                    size='large'
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <AccountCircle />
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
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>

                            <Button color='inherit' onClick={handleLogin}>Login</Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}
export default TopBar;