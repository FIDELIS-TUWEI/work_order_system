import { selectUserInfo } from "@/features/auth/authSlice";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const PublicRoute = ({ children }) => {
    const userInfo = useSelector(selectUserInfo);

    if (!userInfo) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }
};

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PublicRoute;