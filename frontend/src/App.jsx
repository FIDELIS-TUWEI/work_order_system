import "./App.css";
import { Box, CssBaseline } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from "react-router-dom";




function App() {

  return (
    <>
      <ToastContainer />
      <CssBaseline />
        <Box sx={{ width: "100%", height: "100vh" }}>
          <Outlet />
        </Box>
    </>
  );
}


export default App;