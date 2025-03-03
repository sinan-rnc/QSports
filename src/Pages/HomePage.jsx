import HomeHero from "../Components/Home/HomeHero/HomeHero";
import RecentBars from "../Components/Common/RecentBars/RecentBars";
import RecentClubs from "../Components/Common/RecentClubs/RecentClubs";
import About from "../Components/Home/About/About";
import Stats from "../Components/Common/Stats/Stats";
import Helmet from "../Components/Common/Helmet/Helmet";
import { Fragment } from "react";
import UpcomingEvents from "../Components/Common/UpcomingEvents/UpcomingEvents";
import FeaturedEvents from "../Components/Common/FeaturedEvents/FeaturedEvents";
import Highlights from "../Components/Common/Highlights/Highlights";
import FeaturedClubsBars from "../Components/Common/FeaturedClubsBars/FeaturedClubsBars";
import Quotes from "../Components/Common/DailyQuotes/DailyQuotes";

export default function HomePage() {
    return (
        <Fragment>
            <Helmet title="Home">
                <HomeHero/>
                <Stats/>
                <Quotes/>
                <About/>
                <FeaturedClubsBars/>
                <RecentClubs/>
                <RecentBars/>
                <FeaturedEvents/>
                <UpcomingEvents/>
                <Highlights/>
            </Helmet>
        </Fragment>
    )
}