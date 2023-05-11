import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Layout from '../layouts/Layout';
import Forgot from '../pages/auth/Forgot';
import Reset from '../pages/auth/Reset';
import LoginCode from '../pages/auth/LoginCode';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/home",
        element: <Layout />,
    },
    {
        path: "/forgot",
        element: <Forgot />,
    },
    {
        path: "/reset/:resetToken",
        element: <Reset />,
    }
]);