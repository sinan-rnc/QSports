import { AuthProvider, useAuth } from "../../../Context/AuthContext"
import "./ClubBarDashboard.scss"

import photo from "../../../Assets/Common/user.png"
import club from "../../../Assets/Bars&Clubs/1.jpg"
import herobanner1 from "../../../Assets/Bars&Clubs/8.jpg"
import herobanner2 from "../../../Assets/Bars&Clubs/9.jpg"
import herobanner3 from "../../../Assets/Bars&Clubs/10.jpg"
import { useSelector } from "react-redux";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa"
import { CgWebsite } from "react-icons/cg"

export default function ClubBarDashboard({ setSelectedDashboard }) {
    const { user } = useAuth()

    const clubsAndBar = useSelector((state) => {
        return state.clubsAndBars.data.find(ele => ele.createdBy === "6206d7c787dcc314e8bbe496")
    });

    console.log(clubsAndBar)

    const tournamentStatus = [
        { id: 1, date: "25 JAN 2024", name: "Rack 'Em Up Challenge", ranking: "First", total: "" },
        { id: 2, date: "30 JAN 2024", name: "The Cue Masters Cup", ranking: "Fifth", total: "" },
        { id: 3, date: "01 APRIL 2024", name: "Eight-Ball Showdown", ranking: "Seventh", total: "" },
        { id: 4, date: "10 JUNE 2024", name: "Neon Nights Club", ranking: "Tenth", total: "" },
        { id: 5, date: "20 SEPT 2024", name: "Neon Cue Fiesta", ranking: "Not Qualified", total: "" },
        { id: 6, date: "01 DEC 2024", name: "Rack and Roll Championship", ranking: "Not Qualified", total: "" },
        { id: 6, date: "20 DEC 2024", name: "Midnight Cue Clash", ranking: "Quater-Finalist", total: "" },
    ];
    // console.log(user)

    const formatDate = (isoDate) => {
        if (!isoDate) return "";  // Handle empty cases
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-profile">
                <div className="heading-div">
                    <div className="dashborad-heading">
                        <h1 className='dashborad-main-heading'>Club Dashboard</h1>
                        <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                    </div>
                    <button className="edit-profile" onClick={() => {setSelectedDashboard("userProfile")}}>Edit Club Profile</button>
                </div>
                
                {(user && clubsAndBar) && (
                    <div className="user-profile">
                        <div className="clubImage-div">
                            <img src={club} alt="user"/>
                        </div>
                        <div className="club-name-div">
                            <div className="left">
                                <h1>{clubsAndBar.name}</h1>
                                <p>{clubsAndBar.slogan}</p>
                            </div>
                            <div className="right">
                                <p>{clubsAndBar.address}</p>
                                <p>{clubsAndBar.city}, Dubai, UAE</p>
                            </div>
                        </div>
                        <div className="about-club">
                            <h1>About {clubsAndBar.category}</h1>
                            <p style={{marginTop:"10px"}}>{clubsAndBar.description}</p>
                            
                            <p style={{marginTop:"10px"}}><b>Timings:</b> {clubsAndBar.openTime}PM - {clubsAndBar.openTime}AM</p>
                            <p style={{marginTop:"10px"}}><b>Years of Experience:</b> {clubsAndBar.experience}</p>
                            <p style={{marginTop:"10px"}} className="history-head">History</p>
                            <p style={{marginTop:"10px"}}>{clubsAndBar.history}</p>
                        </div>
                        <div className="club-gallery">
                            <h1>Club Gallery</h1>
                            <div className="gallery-grid">
                                <div className="gallery">
                                    <img src={herobanner1} alt="" />
                                </div>
                                <div className="gallery">
                                    <img src={herobanner2} alt="" />
                                </div>
                                <div className="gallery">
                                    <img src={herobanner3} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="contact-person-details">
                            <h1>Contact Person Details</h1>
                            <div className="details-div">
                                <p><b>Name:</b> {clubsAndBar.contactPerson}</p>
                                <p><b>Phone:</b> {clubsAndBar.phoneNo}</p>
                                <p><b>Email:</b> {clubsAndBar.emailAddress}</p>
                            </div>
                        </div>
                        <div className="social-media-details">
                            <h1>Social Media Links</h1>
                            <div className="social-links">
                                <div className="social instagram"><a href={clubsAndBar.socialMedialinks[0].link}>
                                    <FaInstagram />
                                    <p>Instagram</p>
                                </a></div>
                                <div className="social facebook"><a href={clubsAndBar.socialMedialinks[1].link}>
                                    <FaFacebookF style={{marginTop:"10px"}}/>
                                    <p>Facebook</p>
                                </a></div>
                                <div className="social youtube"><a href={clubsAndBar.youtubevideo}>
                                    <FaYoutube style={{marginTop:"10px"}}/>
                                    <p>Youtube</p>
                                </a></div>
                                <div className="social website"><a href={clubsAndBar.webSite}>
                                    <CgWebsite style={{marginTop:"10px"}}/>
                                    <p>Website</p>
                                </a></div>
                            </div>
                        </div>
                        <div className="services-details">
                            <h1>Services</h1>
                            <div className="services-div">
                                {clubsAndBar.services.map((ele) => {
                                    return (
                                        <p><b>{ele.name}:</b> {ele.description}</p>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="dashboard-history">
                <div className="heading-1">
                    <h1 className='main-heading'>Last Events</h1>
                    <hr className="hr-1"/><hr className="hr-2"/>
                    {/* <h3 className="second-heading">Welcome User</h3> */}
                </div>
                {/* <hr className="dashboard-history-hr"/> */}
                <table className="recent-orders__table">
                    <thead>
                    <tr>
                        <th>DATE</th>
                        <th>TOURNAMENT NAME</th>
                        <th>RANKING</th>
                        {/* <th>TOTAL</th> */}
                    </tr>
                    </thead>
                    <tbody>
                    {tournamentStatus.map((ele, index) => (
                        <tr key={index}>
                            <td>{ele.date}</td>
                            <td>{ele.name}</td>
                            <td>{ele.ranking}</td>
                            {/* <td>{ele.total}</td> */}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}