import { Fragment } from "react";
import Tournaments from "../Components/Common/Tournaments/Tournaments";
import TournamentEvents from "../Components/Common/TournamentEvents/TournamentEvents";
import Helmet from "../Components/Common/Helmet/Helmet";

export default function TournamentPage() {
    return (
        <Fragment>
            <Helmet title="Tournaments">
                <Tournaments/>
                {/* <TournamentEvents/> */}
            </Helmet>
        </Fragment>
    )
}