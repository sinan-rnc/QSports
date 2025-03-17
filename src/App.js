import { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import { useDispatch } from "react-redux";
import axios from "axios";

import Header from "./Components/Common/Header/Header";
import HomePage from "./Pages/HomePage";
import Footer from "./Components/Common/Footer/Footer";
import AboutUsPage from "./Pages/AboutUsPage";
import BarsPage from "./Pages/BarsPage";
import ClubsPage from "./Pages/ClubsPage";
import EventsPage from "./Pages/EventsPage";
import AccountPage from "./Pages/AccountPage";
import Login from "./Components/Account/Login/Login";
import UserRegister from "./Components/Account/User/UserRegister/UserRegister";
import DashboardHome from "./Components/Account/DashboardHome/DashboardHome";
import PrivateRoutes from "./General/PrivateRoutes";
import ClubBarDetailPage from "./Components/Common/DetailPages/ClubBarDetailPage/ClubBarDetailPage";
import EventDetailPage from "./Components/Common/DetailPages/EventDetailPage/EventDetailPage";
import ClubBarRegister from "./Components/Account/ClubBar/ClubBarRegister/ClubBarRegister";
import ContactUsPage from "./Pages/ContactUsPage";

import { startGetAllProfile } from "./Actions/profileActions";
import { startGetAllClubsAndBars, startSearchClubsAndBars } from "./Actions/clubsAndBarsActions";
import { startGetAllEvents } from "./Actions/eventsActions";
import UnAuthorized from "./Components/Common/UnAuthorized/UnAuthorized";
import { startGetAllQuotes } from "./Actions/quotesAction";
import AdminAccountPage from "./Pages/AdminAccountPage";
import { startGetAllUsers } from "./Actions/usersAction";
import PageNotFound from "./Components/Common/PageNotFound/PageNotFound";
import { startGetApprovalClubList } from "./Actions/clubApprovalActions";

export default function App() {
    const {user, handleLogin, searchFilters, searchNearByFilters} = useAuth()
    const dispatch = useDispatch()
    const [myTournamentButton, setMyTournamentButton] = useState("")

    const handleMyTournamentClick = () => {
        setMyTournamentButton("myTournaments")
        // console.log(myTournamentButton)
    }

    useEffect(() => {
        if(localStorage.getItem("token") && localStorage.getItem("user")) {
            handleLogin(JSON.parse(localStorage.getItem("user")))
            if(user?.userType === "SuperAdmin") {
                dispatch(startGetAllUsers())
                dispatch(startGetApprovalClubList())
            }
        }
        if(searchNearByFilters) {
            if(searchNearByFilters.lattitude && searchNearByFilters.longitude)  {
                dispatch(startSearchClubsAndBars(searchNearByFilters))
            }
            else {
                dispatch(startGetAllClubsAndBars(searchFilters))
            }
        } else {
            dispatch(startGetAllClubsAndBars(searchFilters))
        }
        dispatch(startGetAllProfile())
        dispatch(startGetAllEvents())
        dispatch(startGetAllQuotes())
    }, [user?.userType, dispatch, searchFilters, searchNearByFilters])

    // console.log(searchFilters)
    // console.log(searchNearByFilters)

    return (
        <Fragment>
            <Header myTournamentButton={myTournamentButton} handleMyTournamentClick={handleMyTournamentClick}/>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="*" element={<PageNotFound/>} />
                <Route path="/about-us" element={<AboutUsPage/>} />
                <Route path="/clubs" element={<ClubsPage/>} />
                <Route path="/bars" element={<BarsPage/>} />
                <Route path="/events" element={<EventsPage/>} />
                <Route path="/admin-account" element={
                    <PrivateRoutes permittedRoles={["SuperAdmin"]}>
                        <AdminAccountPage />
                     </PrivateRoutes>
                } />
                <Route path="/account" element={
                    <PrivateRoutes permittedRoles={["ClubAdmin", "MemberUser"]}>
                        <AccountPage />
                     </PrivateRoutes>
                } />
                <Route path="/dashboard" element={
                    <PrivateRoutes permittedRoles={["ClubAdmin", "MemberUser"]}>
                        <DashboardHome />
                    </PrivateRoutes>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/user-register" element={<UserRegister />} />  
                <Route path="/club-register" element={<ClubBarRegister/>} />
                <Route path="/clubs/:clubName" element={<ClubBarDetailPage/>} />
                <Route path="events/:eventName" element={<EventDetailPage/>} />
                <Route path="/contact-us" element={<ContactUsPage/>}/>
                <Route path="/unauthorized" element={<UnAuthorized />}/>
            </Routes>
            <Footer/>
        </Fragment>
    )
}