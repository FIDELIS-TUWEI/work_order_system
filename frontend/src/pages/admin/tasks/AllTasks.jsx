import { useEffect, useState } from "react";

import {  Box, Button, Table, TableBody, TableCell, TableHead, TableRow, styled } from "@mui/material";

import { deleteTask, getTasks } from "../../api/taskApi";
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

const refresh = () => window.location.reload(true);

const AllTasks = () => {
    // state
    const [tasks, setTasks] = useState([]);

    const navigate = useNavigate();

    // useEffect hook to mount data
    useEffect(() => {
        getAllTasks();
    }, [])

    // function to get tasks from database
    const getAllTasks = async () => {
        let response = await getTasks();
        setTasks(response.data);
    }

    // function to delete Task
    const deleteTaskDetails = async (id) => {
        await deleteTask(id);
        refresh();
        getAllTasks();
    }


    return ( 
        <>
        <Box sx={{ display: "flex", justifyContent: 'flex-end', m: 'auto' }}>
            <Button variant="contained" onClick={() => navigate("/addtasks")}>New Task</Button>
        </Box>
        <StyledTable>
            <TableHead>
                <THead>
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
                            <TableCell>{task.userAssigned}</TableCell>
                            <TableCell>{task.issueIdentified}</TableCell>
                            <TableCell>{task.location}</TableCell>
                            <TableCell>{task.assignedBy}</TableCell>
                            <TableCell>{task.status}</TableCell>

                            <TableCell>
                                <Button 
                                    variant="contained" 
                                    color="success" 
                                    sx={{ mr: '10px' }}
                                    onClick={() => navigate(`/update/${task._id}`)}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    variant="contained" 
                                    color="error"
                                    onClick={() => deleteTaskDetails(task._id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TBody>
                    })
                }
            </TableBody>
        </StyledTable>
        </>
    );
}

export default AllTasks;