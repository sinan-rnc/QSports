import { useState } from "react"
import { useAuth } from "../../../../Context/AuthContext"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import "./AdminDashboardHome.scss"
import AdminEventDashboard from "../AdminDashboardMenu/AdminEventDashboard/AdminEventDashboard"
import { IoClose } from "react-icons/io5"
import AdminClubDashboard from "../AdminDashboardMenu/AdminClubDashboard/AdminClubDashboard"
import AdminBarDashboard from "../AdminDashboardMenu/AdminBarDashboard/AdminBarDashboard"
import AdminUserDashboard from "../AdminDashboardMenu/AdminUserDashboard/AdminUserDashboard"
import Password from "../../Password/Password"
import AdminQuotesDashboard from "../AdminDashboardMenu/AdminQuotesDashboard/AdminQuotesDashboard"

export default function AdminDashboardHome() {
    const navigate = useNavigate()
    const { handleLogout, alertMessage, setAlertMessage, alertMessageColor, setAlertMessageColor, selectedAdminDashboard, setSelectedAdminDashboard } = useAuth()

    // const [selectedDashboard, setSelectedDashboard] = useState("events")

    const dashboardMenu = [
        { key: "users", label: "users", component: <AdminUserDashboard userRole=""/>,},
        { key: "clubAdminUsers", label: "users", component: <AdminUserDashboard userRole="ClubAdmin"/>,},
        { key: "memberUser", label: "users", component: <AdminUserDashboard userRole="MemberUser"/>,},
        { key: "bars", label: "bars", component: <AdminBarDashboard/> },
        { key: "clubs", label: "clubs", component: <AdminClubDashboard/> },
        { key: "events", label: "events", component: <AdminEventDashboard/> },
        { key: "quotes", label: "quotes", component: <AdminQuotesDashboard/> },
        { key: "password", label: "password", component: <Password/> },
    ]

    return (
        <section>
            <div className="admin-dashboardhome-container container-section">
                <div className="dashboard-navigation">
                    <div className="heading">
                        <h1 className='main-heading'>Admin Dashboard</h1>
                        <hr className="hr-1"/><hr className="hr-2"/>
                        {/* <h3 className="second-heading">Welcome User</h3> */}
                    </div>
                    <hr className="dashboard-hr"/>
                    <ul className="menubar-ul">
                        <li className={`menubar-li ${selectedAdminDashboard == "users" ? "active" : ""}`} onClick={() => {setSelectedAdminDashboard("users")}}>All Users</li>
                        <li className={`menubar-li ${selectedAdminDashboard == "clubAdminUsers" ? "active" : ""}`} onClick={() => {setSelectedAdminDashboard("clubAdminUsers")}}>Club Admin Users</li>
                        <li className={`menubar-li ${selectedAdminDashboard == "memberUser" ? "active" : ""}`} onClick={() => {setSelectedAdminDashboard("memberUser")}}>Member Users</li>
                        <li className={`menubar-li ${selectedAdminDashboard == "bars" ? "active" : ""}`} onClick={() => {setSelectedAdminDashboard("bars")}}>Bars</li>
                        <li className={`menubar-li ${selectedAdminDashboard == "clubs" ? "active" : ""}`} onClick={() => {setSelectedAdminDashboard("clubs")}}>Clubs</li>
                        <li className={`menubar-li ${selectedAdminDashboard == "events" ? "active" : ""}`} onClick={() => {setSelectedAdminDashboard("events")}}>Events</li>
                        <li className={`menubar-li ${selectedAdminDashboard == "quotes" ? "active" : ""}`} onClick={() => {setSelectedAdminDashboard("quotes")}}>Quotes</li>
                        <li className={`menubar-li ${selectedAdminDashboard == "password" ? "active" : ""}`} onClick={() => {setSelectedAdminDashboard("password")}}>Reset Password</li>
                    </ul>
                    <hr className="dashboard-hr"/>
                    <button className="logout-btn" onClick={() => {
                        handleLogout()
                        navigate("/")
                        localStorage.removeItem("token")
                        setAlertMessage("Logout Successfully")
                        setAlertMessageColor("green")
                    }}>Log Out</button>
                </div>
                <div className="dashboardhome-section">
                    {dashboardMenu.find((item) => item.key === selectedAdminDashboard)?.component}
                </div>
            </div>
            <AnimatePresence>
                {alertMessage && (
                    <motion.div 
                        className={`alert-message ${alertMessageColor}`}
                        initial={{ x: "100%" }} // Start off-screen
                        animate={{ x: 0 }} // Animate to the screen
                        exit={{ x: "100%", opacity: 0 }} // Exit off-screen
                        transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth animation
                    >
                        {alertMessage} <IoClose onClick={() => {setAlertMessage("")}}/>   
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}