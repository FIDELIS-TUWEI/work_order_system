import { Box, Container, Typography } from "@mui/material";
import TaskList from "../../components/taskComponent/TaskList";
import Task from "../../components/taskComponent/Task";

const Tasks = () => {
    return ( 
        <Container>
            <TaskList />

            <Box component="div" sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                justifyContent: 'space-between' ,
                mt: '0.8rem'
                }}
            >
                <Typography>Total Tasks: 0 </Typography>
                <Typography>Completed Tasks: 0 </Typography>
            </Box>
            <hr />
            
            <Task />
        </Container>
    );
}
 
export default Tasks;