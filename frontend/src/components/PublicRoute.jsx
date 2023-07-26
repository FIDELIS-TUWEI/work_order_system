


const PublicRoute = ({ children }) => {
    const { isAuthenticated } = useSelector(state => state.signIn);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }

}

export default PublicRoute;