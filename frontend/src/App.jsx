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
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const { loading } = useSelector(state => state.loading);

  return (
    <>
      <ToastContainer />
      <CssBaseline />
      {loading ? (
        <LoadingBox />
      ) : (
        <Routes>{renderRoutes()}</Routes>
      )}
    </>
  );
}

function renderRoutes() {
  const routes = [
    { path: "/", element: <PublicRoute> <Home /> </PublicRoute> },
    { path: "/dashboard", element: <PrivateRoute> <Dashboard /> </PrivateRoute> },
    { path: "/login", element: <PublicRoute> <LogIn /> </PublicRoute> },
    { path: "/tasks/list", element: <PrivateRoute> <Tasks /> </PrivateRoute> },
    { path: "/users/list", element: <PrivateRoute> <Users /> </PrivateRoute> },
    { path: "/users/create", element: <PrivateRoute> <CreateUsers /> </PrivateRoute> },
    { path: "/tasks/create", element: <PrivateRoute> <CreateTask /> </PrivateRoute> },
    { path: "/users/edit/:id", element: <PrivateRoute> <EditUser /> </PrivateRoute> },
    { path: "/tasks/edit/:id", element: <PrivateRoute> <EditTask /> </PrivateRoute> },
    { path: "*", element: <NotFound /> },
  ];

  return routes.map((route, index) => (
    <Route key={index} path={route.path} element={route.element} />
  ));
}

export default App;