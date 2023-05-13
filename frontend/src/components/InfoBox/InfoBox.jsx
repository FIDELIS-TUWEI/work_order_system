import { Card, Container, Box, Typography } from "@mui/material";


const InfoBox = ({ icon, title, count}) => {
    return ( 
        <>
            <Container>
                <Card sx={{ m: '1rem', p: '1rem' }}>
                    {icon}
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="p">{title}</Typography>      
                        <Typography variant="h4">{count}</Typography>
                    </Box>
                </Card>
            </Container>
        </>
     );
}
 
export default InfoBox;