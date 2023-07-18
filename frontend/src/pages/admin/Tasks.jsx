import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, styled } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

import Footer from "../../components/Footer";
import { getTasks } from "../../utils/redux/slice/taskSlice";

const StyledTable = styled(Table)`
  width: '90%',
  margin: '50px 0 0 50px',
`

const THead = styled(TableRow)`
  & > th {
    font-size: 20px,
    background: #000000,
    color: #FFFFFF
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 18px,
  }
`;

// backend url endpoint
const URL = 'http://localhost:5000/hin'

const Tasks = () => {

  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const navigate = useNavigate();

  // hook to fetch all tasks from DB
  useEffect(() => {
const fetchData = async () => {
  try {
    const response = await axios.get(`${URL}/tasks/getall`);
      dispatch(getTasks(response.data));
  } catch (error) {
    console.error(error);
  }
};
    fetchData()
  }, []);
  

  return (
    <>
      <Typography variant="h4" sx={{ color: "white", pb: 3, display: "flex", justifyContent: "center", alignItems: "center" }}>
          Tasks List
      </Typography>
      <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
        <Button onClick={() => navigate("/tasks/create")} variant="contained" color="success" startIcon={<AddIcon />} sx={{ mr: 3 }}> 
          <Link style={{ color: "white", textDecoration: "none" }}>Create Task</Link>
        </Button>
      </Box>
      <StyledTable>
        <TableHead>
          <THead>
            <TableCell>Title</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Assigned To</TableCell>
            <TableCell>Assigned By</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell>Actions</TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TRow key={task._id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.taskType}</TableCell>
              <TableCell>{task.category}</TableCell>
              <TableCell>{task.location}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.assignedTo}</TableCell>
              <TableCell>{task.assignedBy}</TableCell>
              <TableCell>{task.date}</TableCell>
              <TableCell sx={{ gap: 2 }}>
                <Button variant="contained" color="primary" style={{ marginRight: 10 }} onClick={() => navigate(`/tasks/edit/${task._id}`)}>
                  Edit
                </Button>
              </TableCell>
            </TRow>
          ))}
        </TableBody>
      </StyledTable>
      <Footer />
    </>
  )
}

export default Tasks;