import AddTask from "./AddTask";
import DeleteTask from "./DeleteTask";
import UpdateTask from "./UpdateTask";

const TaskList = () => {
    return ( 
        <>
            <AddTask />
            <UpdateTask />
            <DeleteTask />
        </>
     );
}
 
export default TaskList;