import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../utils/redux/slices/authSlice";


const PublicRoute = ({ children }) => {
    const user = useSelector(selectUserInfo);
    
    if (!user) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }

}

export default PublicRoute;