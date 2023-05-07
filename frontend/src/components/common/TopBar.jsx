import { AppBar, Box, Toolbar, Typography, Button, IconButton}from '@mui/material';
import {AccountCircle} from '@mui/icons-material/AccountCircle';

const TopBar = () => {
    return ( 
        <Box sx={{ flexGrow: 1}}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6' component="div" sx={{flexGrow: 1}}>
                        Work Order System
                    </Typography>
                    <Button color='inherit'>Login</Button>

                    <IconButton>
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
     );
}
 
export default TopBar;