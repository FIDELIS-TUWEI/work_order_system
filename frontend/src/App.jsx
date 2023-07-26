import "./App.css";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./features/LogIn";
import Dashboard from "./pages/global/Dashboard";
import NotFound from "./pages/NotFound";
import Tasks from "./pages/admin/Tasks";
import Users from "./pages/admin/Users";
import CreateUsers from "./pages/admin/CreateUsers";
import CreateTask from "./pages/admin/CreateTask";
import EditUser from "./pages/admin/EditUser";
import EditTask from "./pages/admin/EditTask";

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
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/login" element={ <LogIn /> } />
          <Route path="/dashboard" element={ <Dashboard /> } />
          <Route path="/tasks/list" element={ <Tasks /> } />
          <Route path="/users/list" element={ <Users /> } />
          <Route path="/users/create" element={ <CreateUsers /> } />
          <Route path="/tasks/create" element={ <CreateTask /> } />
          <Route path="/users/edit/:id" element={ <EditUser /> } />
          <Route path="/tasks/edit/:id" element={ <EditTask /> } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}


export default App;