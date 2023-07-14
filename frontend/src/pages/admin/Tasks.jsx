import { Box, Button, Paper, Typography } from "@mui/material"
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { getTasks } from "../../utils/redux/slice/taskSlice";
//import dayjs from "dayjs"

// backend url endpoint
const URL = 'http://localhost:5000/hin'

const Tasks = () => {

  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);

  const navigate = useNavigate();

  // function to handle onclick event to create task
  const handleCreateTask = () => {
    navigate("/tasks/create");
  }

  // hook to fetch all tasks from DB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/tasks/getall`);
        if(tasks.length === 0) dispatch(getTasks(response.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, []);
  
  const columns = [
    {
      field: "id",
      headerName: "TASK ID",
      width: 150,
      editable: true,
    },
    {
      field: "title",
      headerName: "Task Name",
      width: 150,
    },
    {
      field: "taskType",
      headerName: "Task Type",
      width: 150,
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
    },
    {
      field: "location",
      headerName: "Location",
      width: 150,
    },
    {
      field: "assignedTo",
      headerName: "Assigned To",
      width: 150,
    },
    {
      field: "assignedBy",
      headerName: "Assigned By",
      width: 150,
    },
    {
      field: "status",
      headerName: "Task Status",
      width: 150,
    },
    {
      field: "date",
      headerName: "Date Assigned",
      width: 150,
    },
    {
      field: "Actions",
      width: 200,
      renderCell: () => (
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
          <Button variant="contained">
            <Link style={{ color: "white", textDecoration: "none" }} to={`/edit/task`}>Edit</Link>
          </Button>
          <Button variant="contained" color="error">Delete</Button>
        </Box>
      )
    },
  ]

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
          Task List
        </Typography>
        <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
          <Button onClick={handleCreateTask} variant="contained" color="success" startIcon={<AddIcon />} sx={{ mr: 3 }}> 
            <Link style={{ color: "white", textDecoration: "none" }}>Create Task</Link>
          </Button>
        </Box>
        <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>

          <Box sx={{ height:400, width: "100%" }}>
            <DataGrid
              rows={tasks}
              columns={columns}
              getRowId={(row) => row.id}
              sx={{
                "& .MuiTablePagination-displayedRows": {
                  color: "white",
                },
                color: "white",
                [`& .${gridClasses.row}`]: {
                  bgcolor: (theme) => theme.palette.secondary.main
                },
                button: {
                  color: "#ffffff",
                }

              }}
              
              pageSize={5}
              rowsPerpageOptions={[5]}
              checkboxSelection
            />
          </Box>
        </Paper>
      </Box>
      <Footer />
    </>
  )
}

export default Tasks;