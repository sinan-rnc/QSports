import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import Helmet from "../Components/Common/Helmet/Helmet";
import Register from "../Components/Account/UserRegister/UserRegister";
import Login from "../Components/Account/Login/Login"
import DashboardHome from "../Components/Account/DashboardHome/DashboardHome";

export default function AccountPage({myTournamentButton}) {
    // console.log(myTournamentButton)
    return (
        <Fragment>
            <Helmet title="Account">
                {/* <Routes>
                </Routes> */}
                {/* <Login/>
                <Register/> */}
                <DashboardHome/>
            </Helmet>
        </Fragment>
    )
}