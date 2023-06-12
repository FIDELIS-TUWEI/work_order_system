import { useEffect, useState } from "react";

import { FormControl, FormGroup, InputLabel, Typography, styled, Button, Select, MenuItem } from "@mui/material";

import { editTask, getTask } from "../../../api/taskApi";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled(FormGroup) `
    width: 50%;
    margin: 5% auto 0 auto;
    &  > div {
        margin-top: 20px
    }
`

// initialState values
const initialState = {
    status: "",
}

const UpdateTask = () => {

    // state
    const [task, setTask] = useState(initialState);

    const navigate = useNavigate();

    // useParams
    const { id } = useParams()

    // useEeffect hook DidMount 
    useEffect(() => {
        loadTaskDetails();
    }, []);

    // function to load task details
    const loadTaskDetails = async () => {
        const response = await getTask(id);
        setTask(response.data);
    }


    // function to handle input change
    const onValueChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }

    // function to edit task
    const editTaskDetails = async () => {
        await editTask(task, id);
        navigate("/alltasks");
    }

    return ( 
        <Container>
            <Typography variant="h5">Edit Task</Typography>
            <FormControl variant="standard">
                <InputLabel>Status</InputLabel>
                <Select onChange={(e) => onValueChange(e)} name="status" value={task.status}>
                    <MenuItem value="pending">pending</MenuItem>
                    <MenuItem value="complete">Complete</MenuItem>
                    <MenuItem value="inspected">Inspected</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <Button variant="contained" onClick={() => editTaskDetails()}>Update Task</Button>
            </FormControl>
            
        </Container>
    );
}

export default UpdateTask;