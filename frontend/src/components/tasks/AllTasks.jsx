import { useEffect, useState } from "react";

import {  Button, Table, TableBody, TableCell, TableHead, TableRow, styled } from "@mui/material";

import { getTasks } from "../../api/taskApi";

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


const AllTasks = () => {
    // state
    const [tasks, setTasks] = useState([]);

    // useEffect hook to mount data
    useEffect(() => {
        getAllTasks();
    }, [])

    // function to get tasks from database
    const getAllTasks = async () => {
        let response = await getTasks();
        setTasks(response.data);
    }


    return ( 
        <StyledTable>
            <TableHead>
                <THead>
                    <TableCell>Id</TableCell>
                    <TableCell>Employee Assigned</TableCell>
                    <TableCell>Task</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Assigned By</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                </THead>
            </TableHead>
            <TableBody>
                {
                    tasks.map(task => {
                        return <TBody key={task._id}>
                            <TableCell>{task._id}</TableCell>
                            <TableCell>{task.userAssigned}</TableCell>
                            <TableCell>
                                <Button 
                                    variant="contained" 
                                    color="success" 
                                    sx={{ mr: '10px' }}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    variant="contained" 
                                    color="error"
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

export default AllTasks;