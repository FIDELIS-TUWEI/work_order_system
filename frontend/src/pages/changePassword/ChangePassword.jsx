import TopBar from "../../components/common/TopBar";
import PageMenu from "../../components/pageMenu/PageMenu";

import { 
    Box, Container, 
    TextField, ThemeProvider, 
    Typography, InputAdornment, 
    IconButton, createTheme, Button 
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";


// theme
const theme = createTheme();

// form initial state
const initialState = {
    oldPassword: "",
    password: "",
    password2: "",
};

const ChangePassword = () => {

    // usestate
    const [showPassword, setShowPassword] = useState();
    const [formData, setFormData] = useState(initialState);
    const { oldPassword, password, password2 } = formData;

    // navigate
    const navigate = useNavigate();

    // function to handle IconButton Event
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    // function to change password
    const changePassword = (e) => {
        e.preventDefault();

        // navigate to profile page after password change
        navigate('/profile');
    };

    return ( 
        <ThemeProvider theme={theme}>
            <TopBar />
            <PageMenu />

            <Container>
                <Typography>Change Password</Typography>

                <Box>
                    <TextField 
                        margin='normal'
                        fullWidth
                        id="oldPassword"
                        label="Current Password"
                        variant="outlined"
                        type={ showPassword ? 'text' : "password" }
                        required
                        value={oldPassword}
                        onChange={(e) => setFormData({...formData, oldPassword: e.target.value})}
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
                        id="password"
                        label="New Password"
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
                        onClick={() => changePassword()}
                    >
                        Change Password
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default ChangePassword;