import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserInfo } from "@/features/auth/authSlice";

const PrivateRoute = ({ children }) => {
    const userInfo = useSelector(selectUserInfo);
    if (userInfo) {
        return children;
    } else {
        return <Navigate to="/login" />
    }
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;
