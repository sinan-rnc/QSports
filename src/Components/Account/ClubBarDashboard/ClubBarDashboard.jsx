import { AuthProvider, useAuth } from "../../../Context/AuthContext"
import "./ClubBarDashboard.scss"

import photo from "../../../Assets/Common/user.png"
import addImage from "../../../Assets/Common/add-image.jpg"
import herobanner1 from "../../../Assets/Bars&Clubs/8.jpg"
import herobanner2 from "../../../Assets/Bars&Clubs/9.jpg"
import herobanner3 from "../../../Assets/Bars&Clubs/10.jpg"
import { useDispatch, useSelector } from "react-redux";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa"
import { CgWebsite } from "react-icons/cg"
import { startDeleteClub } from "../../../Actions/clubsAndBarsActions"
import { localhostAPI, serverAPI } from "../../../Apis/api"

export default function ClubBarDashboard({ setSelectedDashboard }) {
    const { user } = useAuth()

    const clubAndBar = useSelector((state) => {
        return state.clubsAndBars.data.find(ele => !ele?.isDeleted && ele?.createdBy === user?._id)
    });

    const dispatch = useDispatch()

    const isValidImage = (url) => {
        return url && /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(url);
    };

    console.log(clubAndBar?.pictureGallery[0]?.path?.replace(localhostAPI, serverAPI))

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

    const handleDeleteClub = (profile) => {
        const confirmation = window.confirm("Are you sure you want to delete your profile?")
        if (confirmation) {
            dispatch(startDeleteClub(profile))
        }
    }

    return (
        <div className="clubBar-dashboard-container">
            <div className="dashboard-profile">
                <div className="heading-div">
                    <div className="dashborad-heading">
                        <h1 className='dashborad-main-heading'>Club Dashboard</h1>
                        <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                    </div>
                    <button className="edit-profile" onClick={() => {setSelectedDashboard("userProfile")}}>{clubAndBar ? "Edit Club Profile" : "Create Club Profile"}</button>
                </div>
                
                {(user && clubAndBar) && (
                    <div className="user-profile">
                        <div className="clubImage-div">
                            {/* {isValidImage(clubAndBar.image) ? <img src={clubAndBar.image} alt="user"/> : <img src={addImage} alt="user"/>} */}
                            <img src={addImage} alt=""/>
                        </div>
                        <div className="club-name-div">
                            <div className="left">
                                <h1>{clubAndBar.name}</h1>
                                <p>{clubAndBar.slogan}</p>
                            </div>
                            <div className="right">
                                <p>{clubAndBar.address}</p>
                                <p>{clubAndBar.city}, Dubai, UAE</p>
                            </div>
                        </div>
                        <div className="about-club">
                            <h1>About {clubAndBar.category}</h1>
                            <p style={{marginTop:"10px"}}>{clubAndBar.description}</p>
                            
                            <p style={{marginTop:"10px"}}><b>Timings:</b> {clubAndBar.openTime}PM - {clubAndBar.openTime}AM</p>
                            <p style={{marginTop:"10px"}}><b>Years of Experience:</b> {clubAndBar.experience}</p>
                            <p style={{marginTop:"10px"}} className="history-head">History</p>
                            <p style={{marginTop:"10px"}}>{clubAndBar.history}</p>
                        </div>
                        <div className="club-gallery">
                            <h1>Club Gallery</h1>
                            <div className="gallery-grid">
                                {clubAndBar.pictureGallery.map((image, index) => (
                                    <div className="gallery" key={image._id || index}>
                                        <img src={addImage} alt=""/>
                                        {/* <img src={image.path.replace(localhostAPI, serverAPI)} alt={image.title} /> */}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="contact-person-details">
                            <h1>Contact Person Details</h1>
                            <div className="details-div">
                                <p><b>Name:</b> {clubAndBar.contactPerson}</p>
                                <p><b>Phone:</b> {clubAndBar.phoneNo}</p>
                                <p><b>Email:</b> {clubAndBar.emailAddress}</p>
                            </div>
                        </div>
                        <div className="social-media-details">
                            <h1>Social Media Links</h1>
                            <div className="social-links">
                                <div className="social instagram"><a href={clubAndBar.socialMedialinks[0]?.link}>
                                    <FaInstagram />
                                    <p>Instagram</p>
                                </a></div>
                                <div className="social facebook"><a href={clubAndBar.socialMedialinks[1]?.link}>
                                    <FaFacebookF style={{marginTop:"10px"}}/>
                                    <p>Facebook</p>
                                </a></div>
                                <div className="social youtube"><a href={clubAndBar.youtubevideo}>
                                    <FaYoutube style={{marginTop:"10px"}}/>
                                    <p>Youtube</p>
                                </a></div>
                                <div className="social website"><a href={clubAndBar.webSite}>
                                    <CgWebsite style={{marginTop:"10px"}}/>
                                    <p>Website</p>
                                </a></div>
                            </div>
                        </div>
                        <div className="services-details">
                            <h1>Services</h1>
                            <div className="services-div">
                                {clubAndBar.services.map((ele) => {
                                    return (
                                        <p><b>{ele.name}:</b> {ele.description}</p>
                                    )
                                })}
                            </div>
                        </div>
                        <button className="delete-profile" onClick={handleDeleteClub}>Delete Club Profile</button>
                    </div>
                )}
            </div>
            {/* <div className="dashboard-history">
                <div className="heading-1">
                    <h1 className='main-heading'>Last Events</h1>
                    <hr className="hr-1"/><hr className="hr-2"/>
                </div>
                <table className="recent-orders__table">
                    <thead>
                    <tr>
                        <th>DATE</th>
                        <th>TOURNAMENT NAME</th>
                        <th>RANKING</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tournamentStatus.map((ele, index) => (
                        <tr key={index}>
                            <td>{ele.date}</td>
                            <td>{ele.name}</td>
                            <td>{ele.ranking}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div> */}
        </div>
    )
}