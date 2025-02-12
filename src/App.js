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
import UserRegister from "./Components/Account/UserRegister/UserRegister";
import Dashboard from "./Components/Account/UserDashboard/UserDashboard";
import DashboardHome from "./Components/Account/DashboardHome/DashboardHome";
import { useAuth } from "./Context/AuthContext";
import ClubBarProfile from "./Components/Account/ClubBarProfile/ClubBarProfile";
import PrivateRoutes from "./General/PrivateRoutes";
import ClubBarDetailPage from "./Components/Common/DetailPages/ClubBarDetailPage/ClubBarDetailPage";
import EventDetailPage from "./Components/Common/DetailPages/EventDetailPage/EventDetailPage";
import { useDispatch } from "react-redux";
import { startGetAllClubsAndBars } from "./Actions/clubsAndBarsActions";
import { startGetAllEvents } from "./Actions/eventsActions";
import axios from "axios";
import ClubRegister from "./Components/Account/ClubRegister/ClubRegister";
import { startGetAllProfile } from "./Actions/profileActions";
import ContactUsPage from "./Pages/ContactUsPage";


export default function App() {
    const {user, handleLogin} = useAuth()
    const dispatch = useDispatch()
    const [myTournamentButton, setMyTournamentButton] = useState("")

    const handleMyTournamentClick = () => {
        setMyTournamentButton("myTournaments")
        console.log(myTournamentButton)
    }

    useEffect(() => {
        if(localStorage.getItem("token") && localStorage.getItem("user")) {
            handleLogin(JSON.parse(localStorage.getItem("user")))
        }

        // if(localStorage.getItem("token")) {
        //     console.log("profile")
            
        // }
        dispatch(startGetAllProfile())
        dispatch(startGetAllClubsAndBars())
        dispatch(startGetAllEvents())
    }, [dispatch])



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
                <Route path="/user-register" element={<UserRegister />} />  
                <Route path="/club-register" element={<ClubRegister/>} />
                <Route path="/clubs/:clubName" element={<ClubBarDetailPage/>} />
                <Route path="events/:eventName" element={<EventDetailPage/>} />
                <Route path="/contact-us" element={<ContactUsPage/>}/>
            </Routes>
            <Footer/>
        </Fragment>
    )
}