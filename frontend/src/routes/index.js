import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import LogIn from "../features/LogIn";


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
        path: "/",
        element: <Home />
    },
    {
        path: "/",
        element: <Home />
    },
]);

export default router;