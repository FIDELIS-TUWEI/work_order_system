import { Card, CardContent, CardMedia, Container, Typography } from "@mui/material";
import HolidayLogo from "../assets/HolidayLogo.png";

const ProfileComponent = () => {
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
                    </CardContent>
                </Card>
            </Container>
        </>
     );
}
 
export default ProfileComponent;