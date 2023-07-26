


const PublicRoute = ({ children }) => {
    if (localStorage.getItem("userInfo")) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }

}

export default PublicRoute;