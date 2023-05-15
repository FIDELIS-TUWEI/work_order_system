import { Container, Typography } from "@mui/material";
import TaskForm from "./TaskForm";
import Task from "./Task";

const TaskList = () => {

    return ( 
        <>
            <Container>
                <Typography variant="h5">Work Order Manager</Typography>
                <TaskForm />
                 <Task />
            </Container>
        </>
     );
}
 
export default TaskList;