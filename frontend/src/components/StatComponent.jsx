import { Card, CardContent, IconButton, Typography, useTheme } from "@mui/material";


const StatComponent = ({ icon, description }) => {
    const palette = useTheme();

  return (
    <>
        <Card sx={{ bgcolor: palette.secondary.main, width: "100%" }}>
            <CardContent>
                <IconButton sx={{ bgcolor: palette.primary.main, mb: 2 }}>
                    {icon}
                </IconButton>
                <Typography variant="body2" sx={{ color: palette.primary.main, mb: 0 }}>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    </>
  )
}

export default StatComponent