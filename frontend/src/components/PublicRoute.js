import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    if (localStorage.getItem("userInfo")) {
        return <Navigate to="/" />;
    }
    return children;
}

export default PublicRoute;