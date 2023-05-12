import { Container } from "@mui/material";
import PageMenu from "../../components/pageMenu/PageMenu";
import UserStats from "../../components/userStats/UserStats";

const UserList = () => {
    return ( 
        <Container>
            <PageMenu />
            <UserStats />
        </Container>
     );
}
 
export default UserList;