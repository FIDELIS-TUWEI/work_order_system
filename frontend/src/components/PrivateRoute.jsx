import useSelector from 'react-redux';


const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useSelector(state => state.signIn);

  if (isAuthenticated) {
        return children;
    } else {
        return <Navigate to="/login" />
    }
}

export default PrivateRoute;
