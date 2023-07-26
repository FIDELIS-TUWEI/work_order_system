import {useSelector} from 'react-redux';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.signIn);
  const { isAuthenticated } = userInfo;
  return isAuthenticated && userInfo  ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
