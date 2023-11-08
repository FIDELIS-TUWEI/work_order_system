import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";


const PublicRoute = ({ children }) => {
    if (localStorage.getItem('userInfo')) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }
};

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PublicRoute;