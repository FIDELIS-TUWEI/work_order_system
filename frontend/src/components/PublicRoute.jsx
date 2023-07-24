const { Navigate } = "react-router-dom";

const PublicRoute = ({ children }) => {
    const userInfo = localStorage.getItem("token");
    if (userInfo) {
        return <Navigate to="/" />
    }
    return children;
}

export default PublicRoute;