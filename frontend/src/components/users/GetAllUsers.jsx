import { useEffect, useState } from "react";

import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

import { getUsers } from "../../api/api";

const GetAllUsers = () => {
    // state 
    const [users, setUsers] = useState([]);

    // useEffect hook to mount data
    useEffect(() => {
        getAllUsers();
    }, [])

    // function to get users fro database
    const getAllUsers = async () => {
        let response = await getUsers();
        setUsers(response.data)
    }
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
                {
                    users.map(user => {
                        return <TableRow key={user._id}>
                            <TableCell>{user._id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.username}</TableCell>


                        </TableRow>
                    })
                }
            </TableBody>
        </Table>
    );
}
 
export default GetAllUsers;