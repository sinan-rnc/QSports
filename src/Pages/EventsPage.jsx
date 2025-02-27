import { Fragment } from "react";
import Events from "../Components/Common/Events/Events";
import Helmet from "../Components/Common/Helmet/Helmet";

export default function EventsPage() {
    return (
        <Fragment>
            <Helmet title="Tournaments">
                <Events/>
            </Helmet>
        </Fragment>
    )
}