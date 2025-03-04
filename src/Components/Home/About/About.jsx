import banner from "../../../Assets/Banner/herobanner2.webp"

import "./About.scss"

export default function About() {
    return (
        <section>
            <div className="about-div container-section">
                <div className="left">
                    <div className="heading">
                        <h1 className="main-heading"><span>Q</span>SPORTS</h1>
                        <hr className="hr-1"/><hr className="hr-2"/>
                        <h3 className="second-heading">Who are we</h3>
                    </div>
                    <h2>Connecting Players, Fans, and Clubs <br/> for Ultimate Enjoyment</h2>
                    <p>At Qsports, we are passionate about connecting enthusiasts and professionals in the dynamic world of clubs and bars. 
                        Our platform is designed to bring together a community of players, fans, and club owners through comprehensive listings, 
                        seamless registration systems, and engaging tournaments hosted at top-tier clubs. <br/><br/>
                        Whether you’re looking for the perfect venue to unwind, seeking thrilling competitions, or interested in expert coaching and corporate events, Qsports ensures you have access to the best options and opportunities. With a commitment to fostering engagement, fun, and camaraderie, Qsports is your go-to destination for elevating your club and bar experiences while also offering professional coaching and tailored corporate events to enhance team spirit and skill development.</p>
                </div>
                <div className="right">
                    <img src={banner} alt=""/>
                </div>
            </div>
        </section>
    )
}