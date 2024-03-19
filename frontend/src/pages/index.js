import PrivateRoute from "@/components/PrivateRoute";
import PublicRoute from "@/components/PublicRoute";
import AllWorkOrders from "@/pages/admin/workOrders/AllWorkOrders";
import CreateWorkOrder from "@/pages/admin/workOrders/CreateWorkOrder";
import WorkDetails from "@/pages/admin/workOrders/workDetails";
import EditWorkOrder from "@/pages/admin/workOrders/EditWorkOrder";
import Home from "@/pages/home/Home";
import LogIn from "@/pages/auth/LogIn";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/dashboard/Dashboard";
import Analytics from "@/pages/admin/reports/Analytics";
import Profile from "@/pages/admin/users/Profile";
import EditUser from "@/pages/admin/users/EditUser";
import UsersAll from "@/pages/admin/users/UsersAll";
import Register from "@/pages/admin/users/Register";
import UserDetails from "@/pages/admin/users/UserDetails";
import Reports from "@/pages/admin/reports/Reports";
import WorkReport from "@/pages/admin/reports/WorkReport";
import NewCategory from "@/pages/admin/category/NewCategory";
import EditCategory from "./admin/category/EditCategory";
import AllCategories from "@/pages/admin/category/AllCategories";
import AllLocations from "@/pages/admin/locations/AllLocations";
import NewLocation from "@/pages/admin/locations/NewLocation";
import AdminPanel from "@/pages/panel/AdminPanel";
import NewDepartment from "@/pages/admin/department/NewDepartment";
import AllDepartments from "@/pages/admin/department/AllDepartments";
import AllDesignations from "@/pages/admin/designation/AllDesignations";
import NewDesignation from "@/pages/admin/designation/NewDesignation";
import ChangePassword from "@/pages/admin/users/ChangePassword";
import Employees from "@/pages/admin/employee/Employees";
import EditEmployee from "@/pages/admin/employee/EditEmployee";
import EmployeeDetails from "@/pages/admin/employee/EmployeeDetails";
import NewEmployee from "@/pages/admin/employee/NewEmployee";
import UserWorkHistory from "@/pages/admin/users/UserWorkHistory";
import DailyWork from "@/pages/admin/reports/DailyWork";
import InAttendanceWork from "@/pages/admin/workOrders/InAttendanceWork";


export { 
    PrivateRoute, PublicRoute, 
    AllWorkOrders, CreateWorkOrder, WorkDetails, EditWorkOrder,
    Home, LogIn, NotFound, Dashboard, Analytics, Profile,
    EditUser, UsersAll, Register, UserDetails, Reports, WorkReport,
    NewCategory, AllCategories, EditCategory, AllLocations, NewLocation,
    AdminPanel, NewDepartment, AllDepartments, AllDesignations,
    NewDesignation, ChangePassword, Employees, EditEmployee,
    EmployeeDetails, NewEmployee, UserWorkHistory, DailyWork, InAttendanceWork
}