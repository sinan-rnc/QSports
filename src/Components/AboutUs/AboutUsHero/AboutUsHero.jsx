import herobanner from "../../../Assets/Banner/herobanner.jpg"
import logo from "../../../Assets/Logo/logo1.png"
import "./AboutUsHero.scss"

export default function AboutUsHero() {
    return (
        <section>
            <div className="aboutus-hero ">
                <div className="overlay"></div>
                <img src={herobanner} alt="" className="hero-banner"/>
                <div className="hero-content container">
                    <div className="hero-details">
                        <div className="heading">
                            <h1 className='main-heading'>About Us</h1>
                            <hr className="hr-1"/><hr className="hr-2"/>
                            <h3 className="second-heading">QSports</h3>
                        </div>
                        <p>At Qsports, we are passionate about connecting enthusiasts and professionals in the dynamic world of clubs and bars. 
                        Our platform is designed to bring together a community of players, fans, and club owners through comprehensive listings, 
                        seamless registration systems, and engaging tournaments hosted at top-tier clubs. <br/><br/>
                        <span>
                        Whether you’re looking for the perfect venue to unwind or seeking thrilling competitions, Qsports ensures you have access to the best options and opportunities. 
                        With a commitment to fostering engagement, fun, and camaraderie, Qsports is your go-to destination for elevating your club and bar experiences.</span></p>
                        <img src={logo} alt=""/>
                    </div>
                    <div className="hero-stats">
                        <div className="stats">
                            <h2>30+</h2>
                            <p>Bars & Clubs in our network</p>
                        </div>
                        <div className="stats">
                            <h2>50+</h2>
                            <p>Live and Quick Tournaments</p>
                        </div>
                        <div className="stats">
                            <h2>100+</h2>
                            <p>Users in our network</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}