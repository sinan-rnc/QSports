import "./FeaturedTournaments.scss"
import image1 from "../../../Assets/Tournaments/image4.png"
import image2 from "../../../Assets/Tournaments/image6.jpeg"

export default function TopTournaments() {
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
                            <img src={image1} alt="" />
                        </div>
                        <div className="event-right">
                            <h1>Rack 'Em Up Challenge</h1>
                            <h2>Single Elimination Tournament</h2>
                            <div className="details">
                                <div className="date">
                                    <h3>When</h3>
                                    <h4>25 DEC 2024</h4>
                                </div>
                                <div className="date">
                                    <h3>Where</h3>
                                    <h4>The Velvet Lounge</h4>
                                    <h4>Al Barsha</h4>
                                </div>
                            </div>
                            <button className="btn-style">Book Now</button>
                        </div>
                    </div>
                    <div className="event second">
                        <div className="event-left">
                            <img src={image2} alt="" />
                        </div>
                        <div className="event-right">
                            <h1>The Cue Masters Cup</h1>
                            <h2>Ladder Tournament</h2>
                            <div className="details">
                                <div className="date">
                                    <h3>When</h3>
                                    <h4>30 DEC 2024</h4>
                                </div>
                                <div className="place">
                                    <h3>Where</h3>
                                    <h4>Blue Lagoon Bar</h4>
                                    <h4>Dubai Marina</h4>
                                </div>
                            </div>
                            <button className="btn-style">Book Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}