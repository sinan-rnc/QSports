import "./FeaturedClubsBars.scss"

import { barsAndClubs } from "../../../DataSet/barsAndClubs"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function FeaturedClubsBars() {
    const navigate = useNavigate()
    const clubsAndBars = useSelector((state) => {
        return state?.clubsAndBars?.data
    })
    console.log(clubsAndBars)
    if(clubsAndBars) {
        console.log(clubsAndBars[0]?.name)
    }
    return (
        <section id="featuredClubsBars" className="featuredClubsBars">
            <div className="featuredClubsBars-section container-section">
                <div className="heading">
                    <h1 className='main-heading'>Featured Clubs & Bars</h1>
                    <hr className="hr-1"/><hr className="hr-2"/>
                    <h3 className="second-heading">Top</h3>
                </div>
                <div className="featuredClubsBars-content">
                        {clubsAndBars[0] && (
                            <div className="left">
                                <div className="featuredClubsBars-image" onClick={() => {navigate(`/clubs/${clubsAndBars[0]?.name.replace(/\s+/g, '-').toLowerCase()}`)}}>
                                    <img src={clubsAndBars[0]?.pictureGallery[0]?.path} alt={clubsAndBars[0]?.pictureGallery[0]?.title}/>
                                </div>
                                <div className="featuredClubsBars-details">
                                    <a href="/bars"><button className="btn-style">
                                        View All
                                    </button></a>
                                    <div className="details">
                                        <h1>{clubsAndBars[0]?.name}</h1>
                                        <p>{clubsAndBars[0]?.introductionObjtv}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    
                    <div className="right">
                        <div className="featuredClubsBars-content1" onClick={() => {navigate(`/clubs/${clubsAndBars[1]?.name.replace(/\s+/g, '-').toLowerCase()}`)}}>
                            <div className="featuredClubsBars-image">
                                <img src={clubsAndBars[1]?.image} alt=""/>
                            </div>
                            <div className="details">
                                <h1>{clubsAndBars[1]?.name}</h1>
                                <p>{clubsAndBars[1]?.introductionObjtv}</p>
                            </div>
                        </div>
                        <div className="featuredClubsBars-content1" onClick={() => {navigate(`/clubs/${clubsAndBars[2]?.name.replace(/\s+/g, '-').toLowerCase()}`)}}>
                            <div className="featuredClubsBars-image">
                                <img src={clubsAndBars[2]?.image} alt=""/>
                            </div>
                            <div className="details">
                                <h1>{clubsAndBars[2]?.name}</h1>
                                <p>{clubsAndBars[2]?.introductionObjtv}</p>
                            </div>
                        </div>
                        <div className="featuredClubsBars-content1" onClick={() => {navigate(`/clubs/${clubsAndBars[3]?.name.replace(/\s+/g, '-').toLowerCase()}`)}}>
                            <div className="featuredClubsBars-image">
                                <img src={clubsAndBars[3]?.image} alt=""/>
                            </div>
                            <div className="details">
                                <h1>{clubsAndBars[3]?.name}</h1>
                                <p>{clubsAndBars[3]?.introductionObjtv}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}