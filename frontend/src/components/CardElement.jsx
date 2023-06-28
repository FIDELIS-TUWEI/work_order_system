import { IconButton, useTheme } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcon from "@mui/icons-material/Add"
import { Link } from "react-router-dom";


const CardElement = ({ taskTitle, description, category, location, id }) => {
    const { palette } = useTheme();
  return (
    <Card sx={{ minWidth: 275, mb: 3, mt: 3 }}>
        <CardContent>
            <Typography sx={{ fontSize: 15, color: palette.secondary.main, fontWeight: 500 }} gutterBottom>
                <IconButton>
                    <LocationOnIcon sx={{ color: palette.secondary.main, fontSize: 18 }} />
                </IconButton> 
                {location}
            </Typography>
            <Typography variant="h5" component="div">
                {taskTitle}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {category}
            </Typography>
            <Typography variant="body2">
                Description: {description.split(" ").slice(0, 15).join(" ") + "..."}
            </Typography>
        </CardContent>
        <CardActions>
            <Button disableElevation variant='contained' size='small' startIcon={<AddIcon />}>
                <Link style={{ textDecoration: "none", color: "white", boxShadow: 0 }} to={`/task/${id}`}>More Details</Link>
            </Button>
        </CardActions>
    </Card>
  )
}

export default CardElement;