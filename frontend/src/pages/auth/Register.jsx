import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, Input } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/authApi/registerUser';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.holidayinn.com/">
                Holiday Inn - Nairobi
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

// initialState values
const initialState = {
    name: "",
    username: "",
    password: ""
}

const Register = () => {
    // usestate
    const [user, setUser] = useState(initialState);

    const navigate = useNavigate();

     // function to handle input change
     const onValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    // function to add user
    const addUserDetails = async () => {
        await registerUser(user);
        navigate("/dashboard");
    }

    return ( 
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <FormControl>
                        <InputLabel>Name</InputLabel>
                        <Input onChange={(e) => onValueChange(e)} name="name" />
                    </FormControl>
                    <FormControl>
                        <InputLabel>Username</InputLabel>
                        <Input onChange={(e) => onValueChange(e)} name="username" />
                    </FormControl>
                    <FormControl>
                        <InputLabel>Password</InputLabel>
                        <Input 
                            onChange={(e) => onValueChange(e)} name="password"
                        />
                    </FormControl>
                    <FormControl>
                        <Button variant="contained" onClick={() => addUserDetails()} sx={{ mt: 4 }}>Register User</Button>
                    </FormControl>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
     );
}
 
export default Register;