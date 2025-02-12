import { Fragment } from "react";
import Bars from "../Components/Common/Bars/Bars";
import Helmet from "../Components/Common/Helmet/Helmet";

export default function BarAndClubPage({searchOption}) {
    return (
        <Fragment>
        <Helmet title="Bars">
            <Bars searchOption={searchOption}/>
        </Helmet>
        </Fragment>
    )
}