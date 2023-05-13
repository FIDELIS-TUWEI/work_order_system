import { Box, Container, Typography } from "@mui/material";
import PageMenu from "../../components/pageMenu/PageMenu";
import UserStats from "../../components/userStats/UserStats";

const UserList = () => {
    return ( 
        <Container>
            <PageMenu />
            <UserStats />

            <Box component="div">
                <Typography variant="h5">All Users</Typography>
            </Box>
        </Container>
     );
}
 
export default UserList;