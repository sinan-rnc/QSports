import "./FeaturedClubsBars.scss"

import { barsAndClubs } from "../../../DataSet/barsAndClubs"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import addImage from "../../../Assets/Common/add-image.jpg"

export default function FeaturedClubsBars() {
    const navigate = useNavigate()
    const clubsAndBars = useSelector((state) => {
        return state?.clubsAndBars?.data
    })

    const featuredBars = clubsAndBars.filter(ele => ele.isFeaturedClub && ele.clubType === "Bar")
    const featuredClubs = clubsAndBars.filter(ele => ele.isFeaturedClub && ele.clubType === "Club")

    // console.log("featuredBars", featuredBars)
    // console.log("featuredClubs", featuredClubs)
    const featuredClubsBars = [...featuredBars, ...featuredClubs]
    // console.log(featuredClubsBars)
    // console.log(featuredClubsBars.length)

    // console.log("featuredBars", featuredBars)
    // console.log("featuredClubs", featuredClubs)
    return (
        <section id="featuredClubsBars" className="featuredClubsBars">
            {featuredClubsBars.length >= 1 && (
                <div className="featuredClubsBars-section container-section">
                    <div className="heading">
                        <h1 className='main-heading'>Featured Clubs & Bars</h1>
                        <hr className="hr-1"/><hr className="hr-2"/>
                        <h3 className="second-heading">Top</h3>
                    </div>
                    <div className="featuredClubsBars-content">
                            {featuredClubsBars.slice(0, featuredClubsBars.length === 2 ? 2 : 1).map(ele => {
                                return (
                                    <div className={`left ${featuredClubsBars.length === 1 ? "single" : ""}`}>
                                        <div className="featuredClubsBars-image" onClick={() => {navigate(`/clubs/${ele?.name.replace(/\s+/g, '-').toLowerCase()}`)}}>
                                            {/* <img src={clubsAndBars[0]?.pictureGallery[0]?.path} alt={clubsAndBars[0]?.pictureGallery[0]?.title}/> */}
                                            {ele.image ? <img src={ele.image} alt=""/> : <img src={addImage} alt=""/>}
                                        </div>
                                        <div className="featuredClubsBars-details">
                                            <a href="/bars"><button className="btn-style">
                                                View All
                                            </button></a>
                                            <div className="details">
                                                <h1>{ele?.name}</h1>
                                                {/* <p>{ele?.introductionObjtv}</p> */}
                                                <p>{ele?.introductionObjtv}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        
                        <div className={`right ${featuredClubsBars.length <= 2 ? "none" : ""}`}>
                            <div className="featuredClubsBars-content1" onClick={() => {navigate(`/clubs/${featuredClubsBars[1]?.name.replace(/\s+/g, '-').toLowerCase()}`)}}>
                                <div className="featuredClubsBars-image">
                                {featuredClubsBars[1]?.image ? <img src={featuredClubsBars[1]?.image} alt=""/> : <img src={addImage} alt=""/>}
                                    {/* <img src={featuredClubsBars[1]?.image} alt=""/> */}
                                </div>
                                <div className="details">
                                    <h1>{featuredClubsBars[1]?.name}</h1>
                                    <p>{featuredClubsBars[1]?.introductionObjtv}</p>
                                </div>
                            </div>
                            <div className={`featuredClubsBars-content1 ${featuredClubsBars.length === 2 ? "none" : ""}`} onClick={() => {navigate(`/clubs/${featuredClubsBars[2]?.name.replace(/\s+/g, '-').toLowerCase()}`)}}>
                                <div className="featuredClubsBars-image">
                                {featuredClubsBars[2]?.image ? <img src={featuredClubsBars[2]?.image} alt=""/> : <img src={addImage} alt=""/>}
                                    {/* <img src={featuredClubsBars[2]?.image} alt=""/> */}
                                </div>
                                <div className="details">
                                    <h1>{featuredClubsBars[2]?.name}</h1>
                                    <p>{featuredClubsBars[2]?.introductionObjtv}</p>
                                    <p></p>
                                </div>
                            </div>
                            {/* <div className="featuredClubsBars-content1" onClick={() => {navigate(`/clubs/${featuredClubsBars[3]?.name.replace(/\s+/g, '-').toLowerCase()}`)}}>
                                <div className="featuredClubsBars-image">
                                    <img src={featuredClubsBars[3]?.image} alt=""/>
                                </div>
                                <div className="details">
                                    <h1>{featuredClubsBars[3]?.name}</h1>
                                    <p>{featuredClubsBars[3]?.introductionObjtv}</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}