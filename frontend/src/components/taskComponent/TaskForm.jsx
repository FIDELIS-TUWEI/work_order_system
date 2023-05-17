import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";

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
    const { name, employee, priority, location, issueIdentified, completed, dateCompleted, comments, authorised } = formData;

    // useNavigate hook
    const navigate = useNavigate()

    // function to create task
    const createTask = async(e) => {
        e.preventDefault();
        console.log(formData)
        if (name || employee || priority || location || issueIdentified || completed || dateCompleted || comments || authorised) {
            return toast.success("Task added");
        }
        navigate("/users");


        // post request
        try {
            await axios.post("http://localhost:5000/api/tasks", formData);
            setFormData({...formData, name: "", employee: "", priority: "", location: "", issueIdentified: "", authorised: ""})
        } catch (error) {
            toast.error(error.message)
        }
    }

    return ( 
        <>
            <Box component="div">
                <form onSubmit={createTask}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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

                        <TextField 
                            name="addWork"
                            label="Employee Assigned"
                            margin="normal"
                            variant="outlined"
                            value={employee}
                            required
                            fullWidth
                            onChange={(e) => setFormData({...formData, employee: e.target.value})}
                        />

                        <TextField 
                            name="addWork"
                            label="Priority"
                            margin="normal"
                            variant="outlined"
                            value={priority}
                            required
                            fullWidth
                            onChange={(e) => setFormData({...formData, priority: e.target.value})}
                        />

                        <TextField 
                            name="addWork"
                            label="Location"
                            margin="normal"
                            variant="outlined"
                            value={location}
                            required
                            fullWidth
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                        />

                        <TextField 
                            name="addWork"
                            label="Issue Identified"
                            margin="normal"
                            variant="outlined"
                            value={issueIdentified}
                            required
                            fullWidth
                            onChange={(e) => setFormData({...formData, issueIdentified: e.target.value})}
                        />

                        <TextField 
                            name="addWork"
                            label="Completed"
                            margin="normal"
                            variant="outlined"
                            value={completed}
                            required
                            fullWidth
                            onChange={(e) => setFormData({...formData, completed: e.target.value})}
                        />

                        <TextField 
                            name="addWork"
                            label="Date Completed"
                            margin="normal"
                            variant="outlined"
                            value={dateCompleted}
                            required
                            fullWidth
                            onChange={(e) => setFormData({...formData, dateCompleted: e.target.value})}
                        />

                        <TextField 
                            name="addWork"
                            label="Comments"
                            margin="normal"
                            variant="outlined"
                            value={comments}
                            required
                            fullWidth
                            onChange={(e) => setFormData({...formData, comments: e.target.value})}
                        />

                        <TextField 
                            name="addWork"
                            label="Authorised"
                            margin="normal"
                            variant="outlined"
                            value={authorised}
                            required
                            fullWidth
                            onChange={(e) => setFormData({...formData, authorised: e.target.value})}
                        />

                        <Button variant="contained" color="success" type="submit">Add</Button>
                    </Box>
                </form>
            </Box>
        </>
     );
}
 
export default TaskForm;