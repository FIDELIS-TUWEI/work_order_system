import { Box, Button, Paper, Typography } from "@mui/material"
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
//import Footer from "../../components/Footer";
//import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { getUser } from "../../utils/redux/slice/userSlice";

// backend url endpoint
const URL = 'http://localhost:5000/hin'

const Users = () => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);

  const navigate = useNavigate();

  // function to handle onclick event to create user
  const handleCreateUser = () => {
    navigate("/users/create");
  }

  // hook to get all users from DB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/all-users`);
        if(users.length === 0) dispatch(getUser(response.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, []);
  
  const columns = [
    {
      field: "_id",
      headerName: "USER ID",
      width: 150,
      editable: true,
    },
    {
      field: "name",
      headerName: "Full Name",
      width: 150,
    },
    {
      field: "username",
      headerName: "Username",
      width: 150,
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
    },
    {
      field: "active",
      headerName: "Active",
      width: 150,
      renderCell: (values) => values.row.active ? "true" : "false"
    },
    {
      field: "date",
      headerName: "Date Created",
      width: 150,
    },
    {
      field: "Actions",
      width: 200,
      renderCell: () => (
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
          <Button variant="contained">
            <Link style={{ color: "white", textDecoration: "none" }} to={`/edit/user`}>Edit</Link>
          </Button>
          <Button variant="contained" color="error">Delete</Button>
        </Box>
      )
    },
  ]

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ color: "white", pb: 3, display: "flex", justifyContent: "center", alignItems: "center" }}>
          Users List
        </Typography>
        <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
          <Button onClick={handleCreateUser} variant="contained" color="success" startIcon={<AddIcon />} sx={{ mr: 3 }}>
            <Link style={{ color: "white", textDecoration: "none" }}>Create User</Link>
          </Button>
        </Box>
        <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>

          <Box sx={{ height:400, width: "100%" }}>
            <DataGrid
              rows={users}
              columns={columns}
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
              
              pageSize={5}
              rowsPerpageOptions={[5]}
              checkboxSelection
            />
          </Box>
        </Paper>
      </Box>
    </>
  )
}

export default Users