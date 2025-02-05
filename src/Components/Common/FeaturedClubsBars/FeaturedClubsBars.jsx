import "./FeaturedClubsBars.scss"

import { barsAndClubs } from "../../../DataSet/barsAndClubs"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function FeaturedClubsBars() {
    const navigate = useNavigate()
    const clubsAndBars = useSelector((state) => {
        return state?.clubsAndBars?.data
    })
    // console.log(clubsAndBars)
    // if(clubsAndBars) {
    //     console.log(clubsAndBars[0]?.name)
    // }
    return (
        <section id="featuredClubsBars" className="featuredClubsBars">
            <div className="featuredClubsBars-section container-section">
                <div className="heading">
                    <h1 className='main-heading'>Featured Clubs & Bars</h1>
                    <hr className="hr-1"/><hr className="hr-2"/>
                    <h3 className="second-heading">Top</h3>
                </div>
                <div className="featuredClubsBars-content">
                        {barsAndClubs[0] && (
                            <div className="left">
                                <div className="featuredClubsBars-image" onClick={() => {navigate(`/clubs/${barsAndClubs[0]?.name.replace(/\s+/g, '-').toLowerCase()}`)}}>
                                    {/* <img src={barsAndClubs[0]?.pictureGallery[0]?.path} alt={barsAndClubs[0]?.pictureGallery[0]?.title}/> */}
                                    <img src={barsAndClubs[0]?.image} alt=""/>
                                </div>
                                <div className="featuredClubsBars-details">
                                    <a href="/bars"><button className="btn-style">
                                        View All
                                    </button></a>
                                    <div className="details">
                                        <h1>{barsAndClubs[0]?.name}</h1>
                                        {/* <p>{barsAndClubs[0]?.introductionObjtv}</p> */}
                                        <p>The Velvet Lounge offers a luxurious ambiance, handcrafted cocktails, and fine spirits, creating the perfect blend of elegance and nightlife energy for an unforgettable experience.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    
                    <div className="right">
                        <div className="featuredClubsBars-content1" onClick={() => {navigate(`/clubs/${barsAndClubs[1]?.name.replace(/\s+/g, '-').toLowerCase()}`)}}>
                            <div className="featuredClubsBars-image">
                                <img src={barsAndClubs[1]?.image} alt=""/>
                            </div>
                            <div className="details">
                                <h1>{barsAndClubs[1]?.name}</h1>
                                {/* <p>{barsAndClubs[1]?.introductionObjtv}</p> */}
                                <p>Neon Nights Club is a vibrant hotspot with electrifying music, dazzling lights, and an energetic atmosphere, delivering the ultimate nightlife experience.</p>
                            </div>
                        </div>
                        <div className="featuredClubsBars-content1" onClick={() => {navigate(`/clubs/${barsAndClubs[2]?.name.replace(/\s+/g, '-').toLowerCase()}`)}}>
                            <div className="featuredClubsBars-image">
                                <img src={barsAndClubs[2]?.image} alt=""/>
                            </div>
                            <div className="details">
                                <h1>{barsAndClubs[2]?.name}</h1>
                                {/* <p>{barsAndClubs[2]?.introductionObjtv}</p> */}
                                <p>Blue Lagoon Bar is a tropical escape with refreshing cocktails, a relaxing ambiance, and ocean-inspired vibes, perfect for unwinding and socializing.</p>
                            </div>
                        </div>
                        <div className="featuredClubsBars-content1" onClick={() => {navigate(`/clubs/${barsAndClubs[3]?.name.replace(/\s+/g, '-').toLowerCase()}`)}}>
                            <div className="featuredClubsBars-image">
                                <img src={barsAndClubs[3]?.image} alt=""/>
                            </div>
                            <div className="details">
                                <h1>{barsAndClubs[3]?.name}</h1>
                                {/* <p>{barsAndClubs[3]?.introductionObjtv}</p> */}
                                <p>Aurora Rooftop offers a stunning skyline view, sophisticated ambiance, and handcrafted cocktails, creating the perfect setting for an unforgettable night under the stars.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}