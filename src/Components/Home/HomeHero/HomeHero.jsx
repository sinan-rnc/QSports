import "./HomeHero.scss"
import { RiBilliardsFill, RiSearch2Fill } from "react-icons/ri";
import { RiExpandUpDownFill } from "react-icons/ri";
import herobanner from "../../../Assets/Banner/herobanner1.jpg"
import { dubaiCities } from "../../../DataSet/dubaiCities";
import { barsAndClubsNames } from "../../../DataSet/barsAndClubs";
import { barClubTournaments } from "../../../DataSet/barClubTournaments";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
// import { FaCalendarCheck, FaHandshake } from "react-icons/fa";
// import { GrUpdate } from "react-icons/gr";

// const access_key = "0c9bd5ea4b8e4da2b73d25c47cabc5c6"


export default function Hero() {
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedBar, setSelectedBar] = useState("");
    const [selectedTournament, setSelectedTournament] = useState("");

    const handleSearch = () => {
    //     console.log(selectedLocation, selectedBar, selectedTournament, "Hii")
    }          
      
    return (
        <section>
            <div className="hero">
                <div className="overlay"></div>
                <img src={herobanner} alt=""/>
                <div className="search_container container">
                    {/* <h1>Find your Clubs and Bars for the Party</h1>
                    <p>Discover the hottest venues, events, and unforgettable experiences!</p> */}
                    <div className="search_bars">
                        <div className="bars">
                            {/* Select Location */}
                            <select id="location-select" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                                <option value="">Select Location</option>
                                {dubaiCities.map((city, index) => (
                                    <option key={index} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                            <RiExpandUpDownFill/>
                        </div>
                        <div className="bars">
                            {/* Select Clubs or Bars */}
                            <select id="location-select" value={selectedBar} onChange={(e) => setSelectedBar(e.target.value)} disabled={selectedLocation ? false : true}>
                                <option value="">Select Clubs/Bars</option>
                                {barsAndClubsNames.map((bars, index) => (
                                    <option key={index} value={bars}>
                                        {bars}
                                    </option>
                                ))}
                            </select>
                            <RiExpandUpDownFill/>
                        </div>
                        <div className="bars">
                            {/* Select Tournaments */}
                            <select id="location-select" value={selectedTournament} onChange={(e) => setSelectedTournament(e.target.value)} disabled={selectedLocation ? false : true}>
                                <option value="">Select Tournaments</option>
                                {barClubTournaments.map((tournaments, index) => (
                                    <option key={index} value={tournaments}>
                                        {tournaments}
                                    </option>
                                ))}
                            </select>
                            <RiExpandUpDownFill/>
                        </div>
                        <a href="/bars-and-clubs" disabled={selectedLocation ? false : true}><div className={`bars search ${!selectedLocation ? "disabled" : ""}`} onClick={handleSearch}>
                            Search 
                            <FaSearch/>
                        </div></a>
                    </div>
                </div>
            </div>
        </section>
    )
}