import { CssBaseline, Grid, 
    ThemeProvider, createTheme, 
    Box, Avatar, Paper, Typography, 
    TextField, Button, Link,
} from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useNavigate } from "react-router-dom";

// theme
const theme = createTheme();

const LoginWithCode = () => {

    // useNavigate
    const navigate = useNavigate();

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
                            <LockOpenIcon />
                        </Avatar>

                        <Typography>Enter Access Code</Typography>

                        <Box
                            component='form'
                            sx={{ mt: 1 }}
                            noValidate
                            autoComplete="off"
                        >

                            <TextField
                                margin='normal'
                                fullWidth
                                id="access code"
                                label="Access Code"
                                variant="outlined"
                                required
                            />

                            <Button 
                                color='success' 
                                variant="contained" 
                                fullWidth 
                            >
                                Proceed to Login
                            </Button>
                            <Typography>Check your email for login access code</Typography>
                            <Box sx={{ 
                                mt: 1, display: 'flex', 
                                justifyContent: 'space-between', 
                                }}
                            >
                                    <Link 
                                        onClick={() => navigate('/home')} 
                                        sx={{ cursor: 'pointer'}}
                                    >
                                        - Home
                                    </Link>

                                    <Link
                                        onClick={() => navigate('/')}
                                        sx={{ cursor: 'pointer'}}
                                    >
                                        Resend Code
                                    </Link>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default LoginWithCode;