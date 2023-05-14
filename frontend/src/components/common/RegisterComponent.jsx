import { CssBaseline, Grid, 
    ThemeProvider, createTheme, 
    Box, Avatar, Paper, Typography, 
    TextField, Button, Link,
    InputAdornment, IconButton
} from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from "react";
import { useNavigate } from "react-router-dom";


// theme
const theme = createTheme();

// form initial state
const initialState = {
    name: "",
    email: "",
    password: "",
    password2: "",
};

const RegisterComponent = () => {
    // usestate
    const [showPassword, setShowPassword] = useState();
    const [formData, setFormData] = useState(initialState);

    // destructure initialstate
    const { name, email, password, password2 } = formData;

    // useNavigate
    const navigate = useNavigate();

    // function to login user
    const registerUser = (e) => {
        e.preventDefault();

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
                            <PersonAddAltIcon />
                        </Avatar>

                        <Typography>Register Page</Typography>

                        <Box
                            component='form'
                            sx={{ mt: 1 }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField 
                                margin="normal"
                                fullWidth
                                id="name"
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

                            <TextField
                                margin='normal'
                                fullWidth
                                id="password2"
                                label="Confirm your Password"
                                variant="outlined"
                                type={ showPassword ? 'text' : "password" }
                                required
                                value={password2}
                                onChange={(e) => setFormData({...formData, password2: e.target.value})}
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
                                onClick={registerUser}
                            >
                                Register
                            </Button>
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
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default RegisterComponent;