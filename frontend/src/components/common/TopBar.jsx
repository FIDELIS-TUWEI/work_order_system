import { AppBar, Box, Toolbar, Typography, Button}from '@mui/material';

const TopBar = () => {
    return ( 
        <Box sx={{ flexGrow: 1}}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6' component="div" sx={{flexGrow: 1}}>
                        Work Order System
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
     );
}
 
export default TopBar;