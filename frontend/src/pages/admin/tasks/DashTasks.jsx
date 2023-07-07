import { Box, Button, Paper, Typography } from "@mui/material"
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";


const DashTasks = () => {
  
  const columns = [
    {
      field: "_id",
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
      field: "taskStatus",
      headerName: "Task Status",
      width: 150,
    },
    {
      field: "Actions",
      width: 200,
      renderCell: () => {
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
          <Button variant="contained"><Link style={{ color: "white", textDecoration: "none" }} to={`/edit/task`}>Edit</Link></Button>
          <Button variant="contained" color="error">Delete</Button>
        </Box>
      }
    },
  ]

  return (
    <>
    <Navbar />
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
          Task List
        </Typography>
        <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
          <Button variant="contained" color="success" startIcon={<AddIcon />}> <Link style={{ color: "white", textDecoration: "none" }} to={`/tasks/create`}>Create Task</Link></Button>
        </Box>
        <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>

          <Box sx={{ height:400, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row._id}
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
              rows=""
              columns={columns}
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

export default DashTasks