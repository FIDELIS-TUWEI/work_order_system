import "./App.css";
import { Box, CssBaseline } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import LoadingBox from "./components/LoadingBox";


function App() {
  const { loading } = useSelector(state => state.loading);

  return (
    <>
      <ToastContainer />
      <CssBaseline />
      {loading ? (
        <LoadingBox />
      ) : (
        <Box sx={{ width: "100%", height: "100vh" }}>
          <Outlet />
        </Box>
      )}
    </>
  );
}


export default App;