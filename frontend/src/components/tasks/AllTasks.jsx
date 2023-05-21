import { useEffect } from "react";

import {  Table, TableBody, TableCell, TableHead, TableRow, styled } from "@mui/material";

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


const AllTasks = () => {

    // useEffect hook to mount data
    useEffect(() => {
        getAllTasks();
    }, [])

    // function to get tasks from database
    const getAllTasks = async () => {
        await getTasks();
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
                
            </TableBody>
        </StyledTable>
    );
}

export default AllTasks;