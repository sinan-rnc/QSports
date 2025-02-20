import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null)
    const [ searchFilters, setSearchFilters ] = useState({})
    const [ seachNearByFilters, setSearchNearByFilters ] = useState({})
    const [ openUserDashboard, setOpenUserDashboard ] = useState(false)
    const [ openSearchDashboard, setOpenSearchDashboard ] = useState(false)
    const [ alertMessage, setAlertMessage ] = useState("")
    const [ alertMessageColor, setAlertMessageColor ] = useState("")
    const [ selectedDashboard, setSelectedDashboard ] = useState("dashboard")

    const handleLogin = (user) => {
        setUser(user)
    }

    const handleLogout = () => {
        setUser(null)
    }

    const handleOpenUserDashboard = () => {
        setOpenUserDashboard(!openUserDashboard)
    }

    const handleOpenSerachDashboard = () => {
        setOpenSearchDashboard(!openSearchDashboard)
    }

    const handleSearchFilters = (filters) => {
        setSearchFilters(filters)
    }

    const handleSearchNearByFilters = (filters) => {
        setSearchNearByFilters(filters)
    }

    useEffect(() => {
        console.log(searchFilters)
        console.log(seachNearByFilters)
    }, [searchFilters, seachNearByFilters])

    return (
        <AuthContext.Provider value={{ 
                user,
                setUser, 
                handleLogin, 
                handleLogout, 
                searchFilters,
                handleSearchFilters,
                seachNearByFilters,
                handleSearchNearByFilters,
                openUserDashboard, 
                setOpenUserDashboard, 
                handleOpenUserDashboard, 
                openSearchDashboard, 
                setOpenSearchDashboard, 
                handleOpenSerachDashboard,
                alertMessage,
                setAlertMessage,
                alertMessageColor,
                setAlertMessageColor,
                selectedDashboard, 
                setSelectedDashboard,
            }}>
            { children }
        </AuthContext.Provider>
    )
}