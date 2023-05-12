import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, TextField, Typography } from "@mui/material";
import HolidayLogo from "../assets/HolidayLogo.png";
import { useState } from "react";

// Initial State
const initialState = {
    name: "",
    email: "",
    phone: "",
    bio: "",
    role: "",
    isVerified: false,
}

const ProfileComponent = () => {

    // state for profile
    const [profile, setProfile] = useState(initialState);
    const {name, email, phone, bio, role, isVerified} = profile;

    // Handle Image change
    const handleImageChange = () => {

    }

    // function to handle Input change
    const handleInputChange = () => {

    }
    return ( 
        <>

            <Container>
                <Typography>Profile</Typography>
                <Card sx={{ maxWidth: 400 }}>
                    <CardMedia
                    sx={{ height: 350 }}
                        image={HolidayLogo}
                        title="Holiday Inn Logo"
                    />

                    <CardContent>
                        <Typography gutterBottom variant='small' component='div'>
                            Role: admin
                        </Typography>
                        
                        <Box sx={{ m: '1rem'}}>
                            <TextField 
                                type="file"
                                accept="image/*"
                                name="image"
                                onChange={handleImageChange}
                            />
                        </Box>
                        <Box sx={{ m: '1rem'}}>
                            <TextField 
                                label="Name"
                                onChange={handleInputChange}
                                value={name}
                            />
                        </Box>
                        <Box sx={{ m: '1rem'}}>
                            <TextField 
                                label="Email"
                                onChange={handleInputChange}
                                value={email}
                            />
                        </Box>
                        <Box sx={{ m: '1rem'}}>
                            <TextField 
                                label="Phone"
                                onChange={handleInputChange}
                                value={phone}
                            />
                        </Box>
                        <Box sx={{ m: '1rem'}}>
                            <TextField 
                                label="Bio"
                                onChange={handleInputChange}
                                value={bio}
                                rows={4}
                            />
                        </Box>
                    </CardContent>

                    <CardActions>
                        <Button variant="contained" fullWidth color="success">Update Profile</Button>
                    </CardActions>
                </Card>
            </Container>
        </>
     );
}
 
export default ProfileComponent;