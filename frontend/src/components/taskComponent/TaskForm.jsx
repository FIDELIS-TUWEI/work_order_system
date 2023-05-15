import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const TaskForm = () => {
    // state
    const [work, setWork] = useState();

    // function to create Task
    const createTask = (e) => {
        e.preventDefault()
    }
    return ( 
        <>
            <Box component="div">
                <form action="" onSubmit={createTask}>
                    <Box>
                        <TextField 
                            name="addWork"
                            label="Add Work"
                            margin="normal"
                            variant="outlined"
                            required
                            id="addWork"
                            onChange={(e) => setWork({...work, work: e.target.value})}
                        />

                        <Button variant="contained" color="success">Add</Button>
                    </Box>
                </form>
            </Box>
        </>
     );
}
 
export default TaskForm;