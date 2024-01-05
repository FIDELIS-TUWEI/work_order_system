import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from "../App";

import { 
  PrivateRoute, PublicRoute, AllWorkOrders, CreateWorkOrder, WorkDetails, EditWorkOrder,
  Home, LogIn, NotFound, Dashboard, Analytics, Profile,
  EditUser, UsersAll, Register, UserDetails, Reports, WorkReport,
  NewCategory, AllCategories, AllLocations, NewLocation,
  AdminPanel, NewDepartment, AllDepartments, AllDesignations,
  NewDesignation, ChangePassword, Employees, EditEmployee,
  EmployeeDetails, NewEmployee, UserWorkHistory 
} from "@/pages/index";

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
        <Route path="/user/work/history/:id" element={ <PrivateRoute> <UserWorkHistory /> </PrivateRoute> } />
        <Route path="/updatePassword/:id" element={ <PrivateRoute> <ChangePassword /> </PrivateRoute> } />
        <Route path="/user/details/:id" element={ <PrivateRoute> <UserDetails /> </PrivateRoute> } />
        <Route path="/edit/user/:id" element={ <PrivateRoute> <EditUser /> </PrivateRoute> } />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );