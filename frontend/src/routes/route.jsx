import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from "../App";

import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';
import Home from '../pages/home/Home';
import LogIn from '../pages/LogIn';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/dashboard/Dashboard';
import AllWorkOrders from '../pages/admin/workOrders/AllWorkOrders';
import CreateWorkOrder from '../pages/admin/workOrders/CreateWorkOrder';
import WorkDetails from '../pages/admin/workOrders/workDetails';
import EditWorkOrder from '../pages/admin/workOrders/EditWorkOrder';
import Analytics from '../pages/admin/reports/Analytics';
import Profile from '../pages/admin/users/Profile';
import EditUser from '../pages/admin/users/EditUser';
import UsersAll from '../pages/admin/users/UsersAll';
import Register from '../pages/admin/users/Register';
import UserDetails from "../pages/admin/users/UserDetails";
import Reports from "../pages/admin/reports/Reports";
import WorkReport from "../components/WorkReport";
import NewCategory from "../pages/admin/category/NewCategory";




export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />} >
        <Route index={true} path="/" element={<PublicRoute> <Home /> </PublicRoute>} />
        <Route path="/login" element={ <PublicRoute> <LogIn /> </PublicRoute>} />
        <Route path="/private" element={ <PrivateRoute> <Dashboard /> </PrivateRoute> } />
        <Route path="/work/list" element={ <PrivateRoute> <AllWorkOrders /> </PrivateRoute> } />
        <Route path="/new/work" element={ <PrivateRoute> <CreateWorkOrder /> </PrivateRoute> } />
        <Route path="/new/category" element={ <PrivateRoute> <NewCategory /> </PrivateRoute>} />
        <Route path="/work/details/:id" element={ <PrivateRoute> <WorkDetails /> </PrivateRoute> } />
        <Route path="/edit/work/:id" element={ <PrivateRoute> <EditWorkOrder /> </PrivateRoute> } />
        <Route path="/users/all" element={ <PrivateRoute> <UsersAll/> </PrivateRoute> } />
        <Route path="/users/register" element={ <PrivateRoute> <Register/> </PrivateRoute> } />
        <Route path="/work/analytics" element={ <PrivateRoute> <Analytics /> </PrivateRoute> } />
        <Route path="/work/reports" element={ <PrivateRoute> <Reports /> </PrivateRoute> } />
        <Route path="/reports" element={ <PrivateRoute> <WorkReport /> </PrivateRoute> } />
        <Route path="/profile" element={ <PrivateRoute> <Profile /> </PrivateRoute> } />
        <Route path="/user/details/:id" element={ <PrivateRoute> <UserDetails /> </PrivateRoute> } />
        <Route path="/edit/user/:id" element={ <PrivateRoute> <EditUser /> </PrivateRoute> } />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )