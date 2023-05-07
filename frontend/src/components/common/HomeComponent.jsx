import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {
    // navigate 
    const navigate = useNavigate();

    // function to navigate to register page
    const handleRegister = () => {
        navigate('/register');
    }

    return ( 
        <>
            <CssBaseline />
            <Container fixed>
                <Box sx={{ height: '50vh' }}>
                    <Typography>
                        Ultimate Work Order system for Holiday Inn Maintenace Department
                    </Typography>
                </Box>
                
                <Button variant="contained" color="error" onClick={handleRegister}>Register</Button>
            </Container>
        </>
    );
}
export default HomeComponent;