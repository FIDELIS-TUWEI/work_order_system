import { CssBaseline, Grid, 
    ThemeProvider, createTheme, 
    Box, Avatar, Paper, Typography, 
    TextField, Button, Link,
} from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// theme
const theme = createTheme();

const ForgotComponent = () => {
    // state
    const [email, setEmail] = useState("");

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
                            <MailOutlineIcon />
                        </Avatar>

                        <Typography>Forgot Password</Typography>

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
                                onChange={(e) => {
                                    setEmail({...email, email: e.target.value})
                                }}
                            />

                            <Button 
                                color='success' 
                                variant="contained" 
                                fullWidth 
                                
                            >
                                Get Reset Email
                            </Button>
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
                                        - Login
                                    </Link>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
 
export default ForgotComponent;