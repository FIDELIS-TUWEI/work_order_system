const { Navigate } = "react-router-dom";

const PublicRoute = ({ children }) => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
        return <Navigate to="/" replace />
    }
    return children;
}

export default PublicRoute;