import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null)
    const [ searchFilters, setSearchFilters ] = useState({
        isDeleted: false,
        sortBy: "createdAt",
        limit: 100,
        page: 1
    })
    const [ searchNearByFilters, setSearchNearByFilters ] = useState({})
    const [ openUserDashboard, setOpenUserDashboard ] = useState(false)
    const [ openSearchDashboard, setOpenSearchDashboard ] = useState(false)
    const [ alertMessage, setAlertMessage ] = useState("")
    const [ alertMessageColor, setAlertMessageColor ] = useState("")
    const [ selectedDashboard, setSelectedDashboard ] = useState("dashboard")
    const [ selectedAdminDashboard, setSelectedAdminDashboard ] = useState("users")
    const [ searchCity, setSearchCity ] = useState("")

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

    // useEffect(() => {
        // console.log(searchFilters)
        // console.log(searchNearByFilters)
    // }, [searchFilters, searchNearByFilters])

    return (
        <AuthContext.Provider value={{ 
                user,
                setUser, 
                handleLogin, 
                handleLogout, 
                searchFilters,
                handleSearchFilters,
                searchNearByFilters,
                setSearchNearByFilters,
                handleSearchNearByFilters,
                searchCity,
                setSearchCity,
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
                selectedAdminDashboard,
                setSelectedAdminDashboard,
            }}>
            { children }
        </AuthContext.Provider>
    )
}