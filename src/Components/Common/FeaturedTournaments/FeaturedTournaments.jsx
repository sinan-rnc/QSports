import "./FeaturedTournaments.scss"
import image1 from "../../../Assets/Tournaments/image4.png"
import image2 from "../../../Assets/Tournaments/image6.jpeg"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function TopTournaments() {
    const navigate = useNavigate()
    const tournaments = useSelector((state) => {
        return state.events.data
    })

    const eventClub1 = useSelector((state) => {
        return state?.clubsAndBars?.data
            .find(ele => !ele?.isDeleted && ele?._id === tournaments[0].ClubID)
    })

    const eventClub2 = useSelector((state) => {
        return state?.clubsAndBars?.data
            .find(ele => !ele?.isDeleted && ele?._id === tournaments[1].ClubID)
    })

    const formatDate = (isoDate) => {
        if (!isoDate) return "";  // Handle empty cases
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <section>
            <div className="tournamentevents1-section container-section">
                <div className="section-top">
                    <div className="heading">
                        <h1 className='main-heading'>Featured Tournaments</h1>
                        <hr className="hr-1"/><hr className="hr-2"/>
                        <h3 className="second-heading">Top</h3>
                    </div>
                    <a href="/tournaments"><button className="btn-style">
                        View All
                    </button></a>
                </div>
                <div className="section-bottom">
                    <div className="event">
                        <div className="event-left">
                            <img src={tournaments[0]?.EventImage} alt="" />
                        </div>
                        <div className="event-right">
                            <h1>{tournaments[0]?.EventName}</h1>
                            <h2>{tournaments[0]?.EventType}</h2>
                            <div className="details">
                                <div className="date">
                                    <h3>When</h3>
                                    <h4>{formatDate(tournaments[0]?.StartingDate)}</h4>
                                </div>
                                <div className="date">
                                    <h3>Where</h3>
                                    <h4>{eventClub1?.city}</h4>
                                    <h4>{eventClub1?.address}</h4>
                                </div>
                            </div>
                            <button className="btn-style" onClick={() => {navigate(`/events/${tournaments[0]?.EventName.replace(/\s+/g, '-').toLowerCase()}`)}}>View More</button>
                        </div>
                    </div>
                    <div className="event second">
                        <div className="event-left">
                            <img src={tournaments[1]?.EventImage} alt="" />
                        </div>
                        <div className="event-right">
                            <h1>{tournaments[1]?.EventName}</h1>
                            <h2>{tournaments[1]?.EventType}</h2>
                            <div className="details">
                                <div className="date">
                                    <h3>When</h3>
                                    <h4>{formatDate(tournaments[1]?.StartingDate)}</h4>
                                </div>
                                <div className="place">
                                    <h3>Where</h3>
                                    <h4>{eventClub2?.city}</h4>
                                    <h4>{eventClub2?.address}</h4>
                                </div>
                            </div>
                            <button className="btn-style" onClick={() => {navigate(`/events/${tournaments[1]?.EventName.replace(/\s+/g, '-').toLowerCase()}`)}}>View More</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}