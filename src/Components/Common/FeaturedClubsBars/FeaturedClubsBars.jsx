import "./FeaturedClubsBars.scss"

import { barsAndClubs } from "../../../DataSet/barsAndClubs"
import { useNavigate } from "react-router-dom"

export default function FeaturedClubsBars() {
    const navigate = useNavigate()
    return (
        <section id="featuredClubsBars" className="featuredClubsBars">
            <div className="featuredClubsBars-section container-section">
                <div className="heading">
                    <h1 className='main-heading'>Featured Clubs & Bars</h1>
                    <hr className="hr-1"/><hr className="hr-2"/>
                    <h3 className="second-heading">Top</h3>
                </div>
                <div className="featuredClubsBars-content">
                    <div className="left">
                        <div className="featuredClubsBars-image" onClick={() => {navigate("/clubs/clubId")}}>
                            <img src={barsAndClubs[0].image} alt=""/>
                        </div>
                        <div className="featuredClubsBars-details">
                            <a href="/bars"><button className="btn-style">
                                View All
                            </button></a>
                            <div className="details">
                                <h1>{barsAndClubs[0].name}</h1>
                                <p>The Velvet Lounge in Al Barsha is a chic bar offering a cozy ambiance with velvet seating, dim lighting, and contemporary decor.</p>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="featuredClubsBars-content1" onClick={() => {navigate("/clubs/clubId")}}>
                            <div className="featuredClubsBars-image">
                                <img src={barsAndClubs[1].image} alt=""/>
                            </div>
                            <div className="details">
                                <h1>{barsAndClubs[1].name}</h1>
                                <p>Blue Lagoon Bar in Jumeirah is a vibrant beachside bar featuring tropical-themed decor, refreshing cocktails, and fresh seafood platters.</p>
                            </div>
                        </div>
                        <div className="featuredClubsBars-content1" onClick={() => {navigate("/clubs/clubId")}}>
                            <div className="featuredClubsBars-image">
                                <img src={barsAndClubs[2].image} alt=""/>
                            </div>
                            <div className="details">
                                <h1>{barsAndClubs[2].name}</h1>
                                <p>Neon Nights Club in Downtown Dubai offers an electrifying nightlife experience with neon-lit interiors, a pulsating dance floor, and live DJ performances.</p>
                            </div>
                        </div>
                        <div className="featuredClubsBars-content1" onClick={() => {navigate("/clubs/clubId")}}>
                            <div className="featuredClubsBars-image">
                                <img src={barsAndClubs[3].image} alt=""/>
                            </div>
                            <div className="details">
                                <h1>{barsAndClubs[3].name}</h1>
                                <p>Aurora Rooftop in Business Bay boasts breathtaking skyline views, elegant seating, and a curated menu of craft cocktails and fusion cuisine.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}