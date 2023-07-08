import { Box, Button, Paper, Typography } from "@mui/material"
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { getUser } from "../../../redux/slice/userSlice";


const DashUsers = () => {
  
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
    },
    {
      field: "Actions",
      width: 200,
      renderCell: () => {
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
          <Button variant="contained"><Link style={{ color: "white", textDecoration: "none" }} to={`/edit/user`}>Edit</Link></Button>
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
          Users List
        </Typography>
        <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
          <Button variant="contained" color="success" startIcon={<AddIcon />}> <Link style={{ color: "white", textDecoration: "none" }} to={`/users/create`}>Create User</Link></Button>
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

export default DashUsers