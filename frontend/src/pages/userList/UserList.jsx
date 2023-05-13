import { Box, Container, Typography } from "@mui/material";
import PageMenu from "../../components/pageMenu/PageMenu";
import UserStats from "../../components/userStats/UserStats";
import SearchBar from "../../components/search/SearchBar";

const UserList = () => {
    return ( 
        <Container>
            <PageMenu />
            <UserStats />

            <Box component="div">
                <Typography variant="h5">All Users</Typography>
            </Box>
            <SearchBar />
        </Container>
     );
}
 
export default UserList;