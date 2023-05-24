import { useState } from "react";

import { FormControl, FormGroup, InputLabel, Input, Typography, styled, Button, Select, MenuItem } from "@mui/material";

import { addTask } from "../../api/taskApi";
import { useNavigate } from "react-router-dom";


const Container = styled(FormGroup) `
    width: 50%;
    margin: 5% auto 0 auto;
    &  > div {
        margin-top: 20px
    }
`

// initialState values
const initialState = {
    userAssigned: "",
    issueIdentified: "",
    location: "",
    assignedBy: "",
    status: "",
    date: "",
}

const AddTask = () => {

    // state
    const [task, setTask] = useState(initialState);

    const navigate = useNavigate()

    // function to handle input change
    const onValueChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }

    // function to add task
    const addTaskDetails = async () => {
        await addTask(task);
        navigate("/alltasks");
    }

    return ( 
        <Container>
            <Typography variant="h5">New Task</Typography>
            <FormControl variant="standard">
                <InputLabel>User Assigned:</InputLabel>
                <Select onChange={(e) => onValueChange(e)} name="userAssigned" value={task.userAssigned}>
                    <MenuItem value="Victor">Victor</MenuItem>
                    <MenuItem value="Kessinger">Kessinger</MenuItem>
                    <MenuItem value="George">George</MenuItem>
                    <MenuItem value="Tito">Tito</MenuItem>
                    <MenuItem value="Bonventure">Bonventure</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel>issueIdentified:</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="issueIdentified" />
            </FormControl>
            <FormControl>
                <InputLabel>Location</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="location" />
            </FormControl>
            <FormControl variant="standard">
                <InputLabel>Assigned By:</InputLabel>
                <Select onChange={(e) => onValueChange(e)} name="assignedBy" value={task.assignedBy}>
                    <MenuItem value="Supervisor">Edwin</MenuItem>
                    <MenuItem value="Supervisor">Michael</MenuItem>
                    <MenuItem value="Supervisor">Peter</MenuItem>
                    <MenuItem value="Supervisor">Julius</MenuItem>
                    <MenuItem value="Supervisor">David</MenuItem>
                    <MenuItem value="Supervisor">Ezekiel</MenuItem>
                    <MenuItem value="Supervisor">Supervisor</MenuItem>
                    <MenuItem value="Solomon">Solomon</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard">
                <InputLabel>Status</InputLabel>
                <Select onChange={(e) => onValueChange(e)} name="status" value={task.status}>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="complete">Complete</MenuItem>
                    <MenuItem value="inspected">Inspected</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel>Date Allocated:</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="date" />
            </FormControl>
            <FormControl>
                <Button variant="contained" onClick={() => addTaskDetails()}>Add Task</Button>
            </FormControl>
            
        </Container>
    );
}
 
export default AddTask;