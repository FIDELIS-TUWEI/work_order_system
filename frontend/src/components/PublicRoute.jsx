import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../utils/redux/slices/authSlice";


const PublicRoute = ({ children }) => {
    if (localStorage.getItem('userInfo')) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }

}

export default PublicRoute;