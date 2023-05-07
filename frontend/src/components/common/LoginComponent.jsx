import { CssBaseline, Grid, 
    ThemeProvider, createTheme, 
    Box, Avatar, Paper, Typography, 
    TextField, Button, Link,
    InputAdornment, IconButton
} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// theme
const theme = createTheme();

const LoginComponent = () => {
    // usestate
    const [showPassword, setShowPassword] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // useNavigate
    const navigate = useNavigate();

    // function to get email change password
    const getEmail = () => {
        
    }

    // function to handle IconButton Event
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    return ( 
        <ThemeProvider theme={theme}>
            <Grid container component='main' sx={{ height: '100vh' }}>
                <CssBaseline />

                <Grid item xs={12} sm={8} md={5} component={Paper} square elevation={6}>
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
                            <LoginIcon />
                        </Avatar>

                        <Typography>Login Page</Typography>

                        <Box
                            component='form'
                            sx={{ mt: 1 }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField 
                                margin="normal"
                                fullWidth
                                id="email"
                                label='Enter your email'
                                variant="outlined"
                                required
                                onChange={(e) => 
                                    setEmail({...email, email: e.target.value})}
                            />

                            <TextField
                                margin='normal'
                                fullWidth
                                id="password"
                                label="Enter your Password"
                                variant="outlined"
                                type={ showPassword ? 'text' : "password" }
                                required
                                onChange={(e) => 
                                    setPassword({...password, password: e.target.value})}
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
                                fullWidth 
                                onClick={() =>getEmail()}
                            >
                                Login
                            </Button>
                            <Box sx={{ mt: 1 }}>
                                <Typography>
                                    Dont have an account?
                                    <Link 
                                        onClick={() => navigate('/register')} 
                                        sx={{ cursor: 'pointer'}}
                                    >
                                        Register
                                    </Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
 
export default LoginComponent;