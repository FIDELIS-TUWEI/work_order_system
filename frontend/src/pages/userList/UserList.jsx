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

            <Box component="div" sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography variant="h5">All Users</Typography>
                <SearchBar />

                <Box>
                    <UserTable />
                </Box>
            </Box>
        </Container>
     );
}
 
export default UserList;