import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserInfo } from '../utils/redux/slices/authSlice';

const PrivateRoute = ({ children }) => {
    const userInfo = useSelector(selectUserInfo);
    if (userInfo && token) {
        return children;
    } else {
        return <Navigate to="/login" />
    }
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default PrivateRoute;
