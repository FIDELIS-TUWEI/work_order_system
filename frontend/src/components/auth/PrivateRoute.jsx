import { Link } from "react-router-dom";

const PrivateRoute = ({ ...rest }) => {
    const auth = JSON.parse(localStorage.getItem("token"));
    if (auth) {
        if (auth.token) {
            return <Link {...rest} />
        }
    }
    return ( 
        <Link to="/login" />
     );
}
 
export default PrivateRoute;