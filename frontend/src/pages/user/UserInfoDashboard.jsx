import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { Card, CardContent, Typography } from "@mui/material"
import { useSelector } from "react-redux"


const UserInfoDashboard = () => {
    const { user } = useSelector(state => state.userProfile);
    const { palette } = useTheme();

  return (
    <>
        <Box sx={{ maxWidth: "50%", margin: "auto", pt: 10 }}>
            <Card sx={{ minWidth: 275, bgcolor: palette.secondary.midNightBlue }}>
                <CardContent>
                    <Typography sx={{ fontSize: 16 }} color="#fafafa" gutterBottom>
                        Personal Info
                    </Typography>
                    <hr style={{ marginBottom: "30px" }} />

                    <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
                        Name: { user && user.name }
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
                        User Name: { user && user.username }
                    </Typography>
                    <Typography sx={{ mb: 1.5, color: "grey", pt: "2" }} color="text.secondary">
                        Status: { user && user.role === 0 ? "User" : "Admin" }
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    </>
  )
}

export default UserInfoDashboard