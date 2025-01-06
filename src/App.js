import { Fragment, useEffect, useState } from "react";
import Header from "./Components/Common/Header/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Footer from "./Components/Common/Footer/Footer";
import AboutUsPage from "./Pages/AboutUsPage";
import BarsPage from "./Pages/BarsPage";
import ClubsPage from "./Pages/ClubsPage";
import TournamentPage from "./Pages/TournamentPage";
import AccountPage from "./Pages/AccountPage";
import Login from "./Components/Account/Login/Login";
import Register from "./Components/Account/Register/Register";
import Dashboard from "./Components/Account/Dashboard/Dashboard";
import DashboardHome from "./Components/Account/DashboardHome/DashboardHome";
import { useAuth } from "./Context/AuthContext";
import ClubBarProfile from "./Components/Account/ClubBarProfile/ClubBarProfile";
import PrivateRoutes from "./General/PrivateRoutes";
import ClubBarDetailPage from "./Components/Common/DetailPages/ClubBarDetailPage/ClubBarDetailPage";
import EventDetailPage from "./Components/Common/DetailPages/EventDetailPage/EventDetailPage";


export default function App() {
    const {user, handleLogin} = useAuth()
    const [myTournamentButton, setMyTournamentButton] = useState("")

    const handleMyTournamentClick = () => {
        setMyTournamentButton("myTournaments")
        console.log(myTournamentButton)
    }

    useEffect(() => {
        if(localStorage.getItem("token") === "QSports") {
            const user = {
                username: "qsports@gmail.com",
                password: "Qsports@123"
            }
            handleLogin(user)
            // console.log("Qsports Logged In", user)
        }
    }, [])

    return (
        <Fragment>
            <Header myTournamentButton={myTournamentButton} handleMyTournamentClick={handleMyTournamentClick}/>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/about-us" element={<AboutUsPage/>} />
                <Route path="/clubs" element={<ClubsPage/>} />
                <Route path="/bars" element={<BarsPage/>} />
                <Route path="/tournaments" element={<TournamentPage/>} />
                <Route path="/account" element={
                    <PrivateRoutes>
                        <AccountPage />
                    </PrivateRoutes>
                } />
                <Route path="/dashboard" element={
                    <PrivateRoutes>
                        <DashboardHome />
                    </PrivateRoutes>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />  
                <Route path="/club-register" element={<ClubBarProfile/>} />
                <Route path="/clubs/:clubName" element={<ClubBarDetailPage/>} />
                <Route path="events/:eventName" element={<EventDetailPage/>} />
            </Routes>
            <Footer/>
        </Fragment>
    )
}