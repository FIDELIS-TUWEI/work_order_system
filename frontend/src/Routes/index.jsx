import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Layout from '../layouts/Layout';
import Forgot from '../pages/auth/Forgot';

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
    }
]);