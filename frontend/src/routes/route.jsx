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
import AllCategories from "../pages/admin/category/AllCategories";
import AllLocations from "../pages/admin/locations/AllLocations";
import NewLocation from "../pages/admin/locations/NewLocation";
import AdminPanel from "../pages/admin/AdminPanel";
import NewDepartment from "../pages/admin/department/NewDepartment";
import AllDepartments from "../pages/admin/department/AllDepartments";
import AllDesignations from "../pages/admin/designation/AllDesignations";
import NewDesignation from "../pages/admin/designation/NewDesignation";
import ChangePassword from "../pages/admin/users/ChangePassword";
import Employees from "../pages/admin/employee/Employees";
import EditEmployee from "../pages/admin/employee/EditEmployee";
import EmployeeDetails from "../pages/admin/employee/EmployeeDetails";
import NewEmployee from "../pages/admin/employee/NewEmployee";
import UserWorkHistory from "../pages/admin/users/UserWorkHistory";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />} >
        <Route index={true} path="/" element={<PublicRoute> <Home /> </PublicRoute>} />
        <Route path="/login" element={ <PublicRoute> <LogIn /> </PublicRoute>} />
        <Route path="/private" element={ <PrivateRoute> <Dashboard /> </PrivateRoute> } />
        <Route path="/admin/panel" element={ <PrivateRoute> <AdminPanel /> </PrivateRoute> } />
        <Route path="/work/list" element={ <PrivateRoute> <AllWorkOrders /> </PrivateRoute> } />
        <Route path="/new/work" element={ <PrivateRoute> <CreateWorkOrder /> </PrivateRoute> } />
        <Route path="/new/category" element={ <PrivateRoute> <NewCategory /> </PrivateRoute>} />
        <Route path="/all-categories" element={ <PrivateRoute> <AllCategories /> </PrivateRoute>} />
        <Route path="/all/departments" element={ <PrivateRoute> <AllDepartments /> </PrivateRoute>} />
        <Route path="/create/department" element={ <PrivateRoute> <NewDepartment /> </PrivateRoute>} />
        <Route path="/all/designations" element={ <PrivateRoute> <AllDesignations /> </PrivateRoute>} />
        <Route path="/create/designation" element={ <PrivateRoute> <NewDesignation /> </PrivateRoute>} />
        <Route path="/work/details/:id" element={ <PrivateRoute> <WorkDetails /> </PrivateRoute> } />
        <Route path="/edit/work/:id" element={ <PrivateRoute> <EditWorkOrder /> </PrivateRoute> } />
        <Route path="/users/all" element={ <PrivateRoute> <UsersAll/> </PrivateRoute> } />
        <Route path="/users/register" element={ <PrivateRoute> <Register/> </PrivateRoute> } />
        <Route path="/work/analytics" element={ <PrivateRoute> <Analytics /> </PrivateRoute> } />
        <Route path="/all-locations" element={ <PrivateRoute> <AllLocations /> </PrivateRoute> } />
        <Route path="/new/employee" element={ <PrivateRoute> <NewEmployee /> </PrivateRoute> } />
        <Route path="/all/employees" element={ <PrivateRoute> <Employees /> </PrivateRoute> } />
        <Route path="/employee/details/:id" element={ <PrivateRoute> <EmployeeDetails /> </PrivateRoute> } />
        <Route path="/update/employee/:id" element={ <PrivateRoute> <EditEmployee /> </PrivateRoute> } />
        <Route path="/new/location" element={ <PrivateRoute> <NewLocation /> </PrivateRoute> } />
        <Route path="/work/reports" element={ <PrivateRoute> <Reports /> </PrivateRoute> } />
        <Route path="/reports" element={ <PrivateRoute> <WorkReport /> </PrivateRoute> } />
        <Route path="/profile/:id" element={ <PrivateRoute> <Profile /> </PrivateRoute> } />
        <Route path="/user/workHistory" element={ <PrivateRoute> <UserWorkHistory /> </PrivateRoute> } />
        <Route path="/updatePassword/:id" element={ <PrivateRoute> <ChangePassword /> </PrivateRoute> } />
        <Route path="/user/details/:id" element={ <PrivateRoute> <UserDetails /> </PrivateRoute> } />
        <Route path="/edit/user/:id" element={ <PrivateRoute> <EditUser /> </PrivateRoute> } />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )