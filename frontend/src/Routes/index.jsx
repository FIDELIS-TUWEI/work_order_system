import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Layout from '../layouts/Layout';
import Forgot from '../pages/auth/Forgot';
import Reset from '../pages/auth/Reset';
import Profile from '../pages/profile/Profile';
import ChangePassword from '../pages/changePassword/ChangePassword';
import UserList from '../pages/userList/UserList';
import Tasks from '../pages/tasks/Tasks';

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
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/changepassword",
        element: <ChangePassword />
    },
    {
        path: "/users",
        element: <UserList />,
    },
    {
        path: "/task",
        element: <Tasks />
    }
]);