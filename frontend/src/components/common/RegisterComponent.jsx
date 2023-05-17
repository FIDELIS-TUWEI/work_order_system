import { CssBaseline,
    ThemeProvider, createTheme, 
    Box, Avatar, Typography, 
    TextField, Button, Link,
    InputAdornment, IconButton, Container
} from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


// theme
const theme = createTheme();

// form initial state
const initialState = {
    name: "",
    email: "",
    password: "",
};

const RegisterComponent = () => {
    // usestate
    const [showPassword, setShowPassword] = useState();
    const [formData, setFormData] = useState(initialState);

    // destructure initialstate
    const { name, email, password } = formData;

    // useNavigate
    const navigate = useNavigate();

    // register request
    const sendRequest = async () => {
        const res = await axios
            .post("http://localhost:5000/api/users/register", {
                name,
                email,
                password,
            })
            .catch(err => console.log(err)); 

        const data = await res.data;
        return data;
    }

    // function to register user
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)

        // send http request
        sendRequest().then(() => navigate("/profile"));
    }

    // function to handle IconButton Event
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    return ( 
        <ThemeProvider theme={theme}>
            <Container component='div'>
                <CssBaseline />

                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m:1, bgcolor: 'secondary-main' }}>
                            <PersonAddAltIcon />
                        </Avatar>

                        <Typography>Register Page</Typography>

                            <TextField 
                                margin="normal"
                                fullWidth
                                id="name"
                                type="text"
                                label='Name'
                                variant="outlined"
                                required
                                value={name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />

                            <TextField 
                                margin="normal"
                                fullWidth
                                id="email"
                                type="email"
                                label='Enter your email'
                                variant="outlined"
                                required
                                value={email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />

                            <TextField
                                margin='normal'
                                fullWidth
                                id="password"
                                label="Enter your Password"
                                variant="outlined"
                                type={ showPassword ? 'text' : "password" }
                                required
                                value={password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                { showPassword ? <Visibility /> : <VisibilityOff /> }
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />

                            <Button 
                                color='success' 
                                variant="contained" 
                                type="submit"
                            >
                                Register
                            </Button>
                    </Box>
                </form>
                <Box sx={{ mt: 1 }}>
                    <Typography>
                        Already have an account?
                        <Link 
                            onClick={() => navigate('/')} 
                            sx={{ cursor: 'pointer'}}
                        >
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default RegisterComponent;