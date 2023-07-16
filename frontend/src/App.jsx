import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
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


function App() {
  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {renderRoutes()}
        </Routes>
      </ThemeProvider>
    </>
  );

  function renderRoutes() {
    const routes = [
      { path: "/", element: <Home /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/login", element: <LogIn /> },
      { path: "/tasks/list", element: <Tasks /> },
      { path: "/users/list", element: <Users /> },
      { path: "/users/create", element: <CreateUsers /> },
      { path: "/tasks/create", element: <CreateTask /> },
      { path: "/users/edit", element: <EditUser /> },
      { path: "*", element: <NotFound /> },
    ];

    return routes.map((route, index) => (
      <Route key={index} path={route.path} element={route.element} />
    ));
  }
}

export default App;