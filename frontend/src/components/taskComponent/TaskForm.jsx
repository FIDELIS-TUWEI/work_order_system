import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
    name: "",
    employee: "",
    priority: "",
    location: "",
    issueIdentified: "",
    completed: "",
    dateCompleted: "",
    comments: "",
    authorised: "",
};

const TaskForm = () => {
    // useState
    const [formData, setFormData] = useState(initialState)
    const { name } = formData;

    // useNavigate hook
    const navigate = useNavigate()

    // function to create task
    const createTask = async(e) => {
        e.preventDefault();
        console.log("data submit");
        navigate("/users");
    }

    return ( 
        <>
            <Box component="div">
                <form action="" onSubmit={createTask}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField 
                            name="addWork"
                            label="Add Work"
                            margin="normal"
                            variant="outlined"
                            value={name}
                            required
                            fullWidth
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />

                        <Button variant="contained" color="success" type="submit">Add</Button>
                    </Box>
                </form>
            </Box>
        </>
     );
}
 
export default TaskForm;