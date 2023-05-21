import { useEffect, useState } from "react";

import { Button, Table, TableBody, TableCell, TableHead, TableRow, styled } from "@mui/material";

import { getUsers, deleteUser } from "../../api/api";
import { useNavigate } from "react-router-dom";

// MUI custom styles
const StyledTable = styled(Table) `
    width: 90%;
    margin: 50px auto 0 auto;
`;

const THead = styled(TableRow)`
    background: #000;
    & > th {
        color: #fff;
        font-size: 20px;
    }
`;

const TBody = styled(TableRow)`
    & > td {
        font-size: 14px;
    }
`

const GetAllUsers = () => {
    // state 
    const [users, setUsers] = useState([]);

    // navigate
    const navigate = useNavigate();

    // useEffect hook to mount data
    useEffect(() => {
        getAllUsers();
        deleteUserDetails();
    }, [])

    // function to get users fro database
    const getAllUsers = async () => {
        let response = await getUsers();
        setUsers(response.data)
    }

    // function to delete user
    const deleteUserDetails = async (id) => {
        await deleteUser(id);
        getUsers();
    }

    return ( 
        <StyledTable>
            <TableHead>
                <THead>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Action</TableCell>

                </THead>
            </TableHead>
            <TableBody>
                {
                    users.map(user => {
                        return <TBody key={user._id}>
                            <TableCell>{user._id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>
                                <Button 
                                    variant="contained" 
                                    color="success" 
                                    sx={{ mr: '10px' }}
                                    onClick={() => navigate(`/edit/${user._id}`)}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    variant="contained" 
                                    color="error"
                                    onClick={() => deleteUserDetails(user._id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>

                        </TBody>
                    })
                }
            </TableBody>
        </StyledTable>
    );
}
 
export default GetAllUsers;