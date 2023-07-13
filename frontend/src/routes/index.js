import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/global/Dashboard"
import NotFound from "../pages/NotFound";
import LogIn from "../features/LogIn";
import Tasks from "../pages/admin/Tasks";
import Users from "../pages/admin/Users";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/login",
        element: <LogIn />,
    },
    {
        path: "/tasks/list",
        element: <Tasks />,
    },
    {
        path: "/users/list",
        element: <Users />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);
