import { Container, Typography } from "@mui/material";
import TaskForm from "./TaskForm";

const TaskList = () => {
    return ( 
        <>
            <Container>
                <Typography variant="h5">Work Order Manager</Typography>
                <TaskForm />
            </Container>
        </>
     );
}
 
export default TaskList;