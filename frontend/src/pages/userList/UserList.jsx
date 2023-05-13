import { Box, Container, Typography } from "@mui/material";
import PageMenu from "../../components/pageMenu/PageMenu";
import UserStats from "../../components/userStats/UserStats";
import SearchBar from "../../components/search/SearchBar";
import UserTable from "../../components/table/UserTable";

const UserList = () => {
    return ( 
        <Container>
            <PageMenu />
            <UserStats />

            <Box>
                <Typography variant="h5">All Users</Typography>
                <SearchBar />
            </Box>
            <Box component="div" sx={{ display: 'flex', flexDirection: 'column', m: '0.5rem' }}>
                <UserTable />
            </Box>
        </Container>
     );
}
 
export default UserList;