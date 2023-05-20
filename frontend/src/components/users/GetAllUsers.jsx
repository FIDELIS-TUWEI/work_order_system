import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const GetAllUsers = () => {
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
        </Table>
     );
}
 
export default GetAllUsers;