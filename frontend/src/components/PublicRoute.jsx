import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";


const PublicRoute = () => {
    const { isAuthenticated } = useSelector(state => state.signIn);

    return isAuthenticated ? <Navigate to="/" /> : <Outlet />

}

export default PublicRoute;