import { Fragment } from "react";
import Helmet from "../Components/Common/Helmet/Helmet";
import AdminDashboardHome from "../Components/Account/Admin/AdminDashboardHome/AdminDashboardHome";

export default function AdminAccountPage() {
    return (
        <Fragment>
            <Helmet title="Admin Account" >
                <AdminDashboardHome/>
            </Helmet>
        </Fragment>
    )
}