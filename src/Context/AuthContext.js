import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null)
    const [ searchCategory, setSearchCategory ] = useState("")
    const [ searchCity, setSearchCity ] = useState("")
    const [ openUserDashboard, setOpenUserDashboard ] = useState(false)
    const [ openSearchDashboard, setOpenSearchDashboard ] = useState(false)
    const [ alertMessage, setAlertMessage ] = useState("")
    const [ alertMessageColor, setAlertMessageColor ] = useState("")
    const [selectedDashboard, setSelectedDashboard] = useState("dashboard")

    const handleLogin = (user) => {
        setUser(user)
    }

    const handleLogout = () => {
        setUser(null)
    }
    
    const handleSearchCategory = (option) => {
        setSearchCategory(option)
    }

    const handleSearchCity = (option) => {
        setSearchCity(option)
    }
    const handleOpenUserDashboard = () => {
        setOpenUserDashboard(!openUserDashboard)
    }

    const handleOpenSerachDashboard = () => {
        setOpenSearchDashboard(!openSearchDashboard)
    }

    return (
        <AuthContext.Provider value={{ 
                user,
                setUser, 
                handleLogin, 
                handleLogout, 
                searchCategory, 
                setSearchCategory, 
                searchCity, 
                setSearchCity, 
                handleSearchCategory, 
                handleSearchCity, 
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