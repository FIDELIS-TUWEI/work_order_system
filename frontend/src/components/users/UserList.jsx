import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

import AddUser from "./AddUser";
import DeleteUser from "./DeleteUsers";
import UpdateUser from "./UpdateUsers";

const UserList = () => {
    return ( 
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Username</TableCell>

                </TableRow>
            </TableHead>
            <TableBody>

            </TableBody>
            <AddUser />
            <UpdateUser />
            <DeleteUser />
        </Table>
     );
}
 
export default UserList;