import logo from "../../../Assets/Logo/logo1.png"

import facebook from "../../../Assets/Social-Links/facebook.svg"
import instagram from "../../../Assets/Social-Links/instagram.svg"
import youtube from "../../../Assets/Social-Links/youtube.svg"
import twitter from "../../../Assets/Social-Links/twitter.svg"
import linkedin from "../../../Assets/Social-Links/linkedin.svg"
import stick from "../../../Assets/Common/Billiard-Stick.png"

import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

import "./Footer.scss"
import { RiInstagramFill } from "react-icons/ri"
import { useLocation } from "react-router-dom"

export default function Footer() {
    const location = useLocation()
    return (
        <footer>
            {/* <hr className="footer-hr"/> */}
            {location.pathname === "/" && <img src={stick} alt="" className="stick"/> } 
            <div className="footer_row container">
                {/* <div className="footer_col">
                    <div className="logo_div">
                        <img className="logo" src={logo} alt=""/>
                        <p>Your Ultimate Destination for Pool, Billiards, and Indoor Game Excellence!</p>
                        <div className="social_links">
                            <FaFacebook />
                            <RiInstagramFill />
                            <FaYoutube />
                            <FaTwitter />
                            <FaLinkedin />
                        </div>
                    </div>
                </div> */}
                <div className="footer_col">
                    <div className="dashborad-heading">
                        <h1 className='dashborad-main-heading'>Contact Us</h1>
                        <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                        {/* <h3 className="dashborad-second-heading">Club</h3> */}
                    </div>
                    <div className="contact_content">
                        <p>At QSports, we are always open for cooperation and suggestions, contact us in one of the ways below:</p>
                        <div className="contact_details">
                            <div className="details">
                                <h2>Phone Number</h2>
                                <p>+1 (800) 060-07-30</p>
                            </div>
                            <div className="details">
                                <h2>Email Address</h2>
                                <p>qsports@gmail.com</p>
                            </div>
                            <div className="details">
                                <h2>Our Location</h2>
                                <p>Silicon Oasis, Dubai, UAE</p>
                            </div>
                            <div className="details">
                                <h2>Working Hours</h2>
                                <p>Mon-Sat 10:00pm - 7:00pm</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer_col">
                    <div className="dashborad-heading">
                        <h1 className='dashborad-main-heading'>Information</h1>
                        <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                        {/* <h3 className="dashborad-second-heading">Club</h3> */}
                    </div>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Play Clubs</li>
                        <li>Play Bars</li>
                        <li>Tournaments</li>
                        <li>Contact Us</li>
                        {/* <li></li> */}
                    </ul>
                </div>
                <div className="footer_col">
                <div className="dashborad-heading">
                        <h1 className='dashborad-main-heading'>My Account</h1>
                        <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                        {/* <h3 className="dashborad-second-heading">Club</h3> */}
                    </div>
                    <ul>
                        <li>Dashboard</li>
                        <li>Profile</li>
                        <li>My Tournaments</li>
                        <li>Login</li>
                        <li>Regsiter</li>
                        <li>Club Register</li>
                    </ul>
                </div>
                <div className="footer_col">
                <div className="dashborad-heading">
                        <h1 className='dashborad-main-heading'>Newsletter</h1>
                        <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                        {/* <h3 className="dashborad-second-heading">Club</h3> */}
                    </div>
                    <div className="newsletter_details">
                        <p>Enter your email address below to subscribe to our newsletter and keep up to date with discounts and special offers.</p>
                        <div className="newsletter_input">
                            <input className="input" type="text" placeholder="Enter your email address"/>
                            <button>Subscribe</button>
                        </div>
                        <p className="social_head">Follow us On :</p>
                        <div className="social_links">
                            <FaFacebook />
                            <RiInstagramFill />
                            <FaYoutube />
                            <FaTwitter />
                            <FaLinkedin />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

// {/* <a href="/" alt=""><img className='social' src={facebook} alt=""/></a>
// <a href="/" alt=""><img className='social' src={instagram} alt=""/></a>
// <a href="/" alt=""><img className='social' src={youtube} alt=""/></a>
// <a href="/" alt=""><img className='social' src={twitter} alt=""/></a>
// <a href="/" alt=""><img className='social' src={linkedin} alt=""/></a> */}