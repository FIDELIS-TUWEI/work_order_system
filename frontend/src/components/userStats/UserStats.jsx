import { Box, Container, CssBaseline, Typography } from "@mui/material";
import InfoBox from "../InfoBox/InfoBox";
import GroupIcon from '@mui/icons-material/Group';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonOffIcon from '@mui/icons-material/PersonOff';


// Icons 
const groupIcon = <GroupIcon />
const verifiedUser = <VerifiedUserIcon />
const unverifiedUser = <PersonRemoveIcon />
const suspendedUser = <PersonOffIcon />

const UserStats = () => {
    return ( 
        <>
            <Container>
            <CssBaseline />
            <Box>
                <Typography variant="h5">UserStats</Typography>
                <InfoBox 
                    icon={groupIcon}
                    title={"Total Users"}
                    count={"3"}
                />

                <InfoBox 
                    icon={verifiedUser}
                    title={"Verified Users"}
                    count={"2"}
                />

                <InfoBox 
                    icon={unverifiedUser}
                    title={"Unverified User"}
                    count={"1"}
                />

                <InfoBox 
                    icon={suspendedUser}
                    title={"Suspended User"}
                    count={"0"}
                />
            </Box>
            </Container>
        </>
     );
}
 
export default UserStats;