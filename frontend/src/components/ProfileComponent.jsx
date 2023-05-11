import { Card, CardMedia, Container, Typography } from "@mui/material";
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
                </Card>
            </Container>
        </>
     );
}
 
export default ProfileComponent;