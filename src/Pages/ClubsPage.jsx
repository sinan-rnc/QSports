import { Fragment } from "react";
import Clubs from "../Components/Common/Clubs/Clubs";
import Helmet from "../Components/Common/Helmet/Helmet";

export default function ClubsPage({searchOption}) {
    return (
        <Fragment>
        <Helmet title="Clubs">
            <Clubs searchOption={searchOption}/>
        </Helmet>
        </Fragment>
    )
}