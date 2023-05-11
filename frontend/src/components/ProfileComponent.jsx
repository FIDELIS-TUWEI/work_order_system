import { Box, Card, CardContent, CardMedia, Container, TextField, Typography } from "@mui/material";
import HolidayLogo from "../assets/HolidayLogo.png";

// Initial State
const initialState = {
    name: "",
    email: "",
    phone: "",
    bio: "",
    role: "",
    isVerified: "",
}

const ProfileComponent = () => {

    // state for profile
    const [profile, setProfile] = useState(initialState);
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
                        
                        <Box>
                            <TextField 
                                label="Name"
                            />

                            <TextField 
                                label="Email"
                            />

                            <TextField 
                                label="Phone"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </>
     );
}
 
export default ProfileComponent;