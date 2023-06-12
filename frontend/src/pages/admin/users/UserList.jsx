import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const UserList = () => {
    // navigate
    const navigate = useNavigate();

    return ( 
        <>
        <AppBar position="static">
                <Toolbar>
                    
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Work Order System
                    </Typography>
                    <Button color="inherit" onClick={() => navigate("/allusers")}>Users</Button>
                </Toolbar>
            </AppBar>
        </>
            
    );
}

export default UserList;