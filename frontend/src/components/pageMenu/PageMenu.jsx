import { Box, Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const PageMenu = () => {
    // function to navigate
    const navigate = useNavigate();

    return ( 
        <Container maxWidth='md'>
            <Box 
                sx={{ 
                    m: '2rem',
                    bgcolor: 'success.main',
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    textAlign: 'center' 
                    }}
            >
                <Button color='inherit' onClick={() => navigate('/profile')}>Profile</Button>
                <Button color='inherit' onClick={() => navigate('/changepassword')}>Change password</Button>
                <Button color='inherit' onClick={() => navigate('/users')}>Users</Button>
            </Box>
        </Container>
     );
}
 
export default PageMenu;