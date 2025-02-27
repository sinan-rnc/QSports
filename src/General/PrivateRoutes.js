import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function PrivateRoutes({ children, permittedRoles }) {
    const { user } = useAuth()
    // if(!(localStorage.getItem("token"))) {
    if(!user && localStorage.getItem("token")) {
        return <p>Loading...</p>
    }

    if(!user) {
        return <Navigate to="/"/>
    }

    if(!permittedRoles.includes(user?.role)) {
        return <Navigate to="/unauthorized" />
    }

    return children
}