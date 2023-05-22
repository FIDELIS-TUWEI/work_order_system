import { useEffect } from "react";
import RegisterComponent from "../components/auth/RegisterComponent";


export default function Register ({ setSelectedLink, link }) {

    useEffect(() => {
        setSelectedLink(link);
    }, []);

    return ( 
        <RegisterComponent />
    );
}
