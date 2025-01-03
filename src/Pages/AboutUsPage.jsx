import { Fragment } from "react";
import AboutUsHero from "../Components/AboutUs/AboutUsHero/AboutUsHero";
import Testimonials from "../Components/AboutUs/Testimonials/Testimonials";
import Helmet from "../Components/Common/Helmet/Helmet";

export default function AboutUsPage() {
    return (
        <Fragment>
            <Helmet title="About Us">
                <AboutUsHero/>
                <Testimonials/>
            </Helmet>
        </Fragment>
    )
}