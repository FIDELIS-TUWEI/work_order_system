import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import LogIn from "../features/LogIn";
import Tasks from "../pages/admin/Tasks";
import Users from "../pages/admin/Users";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "*",
        element: <NotFound />
    },
    {
        path: "/login",
        element: <LogIn />
    },
    {
        path: "/tasks/list",
        element: <Tasks />
    },
    {
        path: "/users/list",
        element: <Users />
    },
]);

export default router;