import { useEffect } from "react";
import LoginComponent from "../components/auth/LoginComponent";


export default function Auth ({ setSelectedLink, link }) {
    useEffect(() => {
        setSelectedLink(link);
    }, [])
    return ( 
        <LoginComponent />
     );
}
 