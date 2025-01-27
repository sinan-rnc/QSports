import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function PrivateRoutes({ children }) {
    const { user } = useAuth()
    if(!(localStorage.getItem("token"))) {
    // if(!user && localStorage.getItem("token")) {
        return <p>Loading...</p>
    }

    if(!user) {
        return <Navigate to="/"/>
    }

    return children
}