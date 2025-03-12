import { AuthProvider, useAuth } from "../../../../Context/AuthContext"
import "./ClubBarDashboard.scss"

import addImage from "../../../../Assets/Common/add-image.jpg"
import { useDispatch, useSelector } from "react-redux";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa"
import { CgWebsite } from "react-icons/cg"
import { startDeleteClub } from "../../../../Actions/clubsAndBarsActions"
import { serverUrl1, serverUrl2 } from "../../../../Apis/api";

export default function ClubBarDashboard({ setSelectedDashboard }) {
    const { user, setAlertMessage, setAlertMessageColor } = useAuth()

    const clubAndBar = useSelector((state) => {
        return state.clubsAndBars.data.find(ele => !ele?.isDeleted && ele?.createdBy === user?._id)
    });

    console.log(clubAndBar)

    const dispatch = useDispatch()

    const isValidImage = (url) => {
        return url && /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(url);
    };

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

    function convertTo12HourFormat(time24h) {
        if (!time24h) return ""; // Handle empty or undefined values
    
        let [hours, minutes] = time24h.split(":").map(Number);
        const modifier = hours >= 12 ? "PM" : "AM";
    
        // Convert hours to 12-hour format
        hours = hours % 12 || 12;
    
        return `${hours}:${String(minutes).padStart(2, '0')} ${modifier}`;
    }
    

    const handleDeleteClub = (clubID) => {
        const confirmation = window.confirm("Are you sure you want to delete your profile?")
        if (confirmation) {
            dispatch(startDeleteClub(clubID, setAlertMessage, setAlertMessageColor))
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
                
                {(user && clubAndBar) ? (
                    <div className="user-profile">
                        <div className="clubImage-div">
                            {isValidImage(clubAndBar.image) ? <img src={clubAndBar.image} alt="user"/> : <img src={addImage} alt="user"/>}
                            {/* <img src={addImage} alt=""/> */}
                        </div>
                        <div className="club-name-div">
                            <div className="left">
                                <h1>{clubAndBar.name}</h1>
                                <p>{clubAndBar.slogan}</p>
                            </div>
                            <div className="right">
                                <p>{clubAndBar.city}</p>
                                <p>{clubAndBar.address}</p>
                            </div>
                        </div>
                        <div className="about-club">
                            {clubAndBar.description && (
                                <div>
                                <h1>About {clubAndBar.category}</h1>
                                <p style={{marginTop:"10px"}}>{clubAndBar.description}</p>
                                </div>
                            )}
                            
                            
                            {(clubAndBar.openTime || clubAndBar.closeTime) && <p style={{marginTop:"10px"}}><b>Timings:</b> {convertTo12HourFormat(clubAndBar.openTime)} - {convertTo12HourFormat(clubAndBar?.closeTime)}</p>}
                            {clubAndBar.normalHrRates && <p style={{marginTop:"10px"}}>Normal Hour Rate - AED {clubAndBar.normalHrRates}</p>}
                            {   (clubAndBar.startTime || clubAndBar.endTime) && (
                                <div className="happy-hour">
                                <h1 className="happy-hour-head">Happy Hours</h1>
                                <p>Start - {convertTo12HourFormat(clubAndBar.startTime)}</p>
                                <p>End - {convertTo12HourFormat(clubAndBar.endTime)}</p>
                                <p>Happy Hour Rate - AED {clubAndBar.happyHrRates}</p>
                                </div>
                            )}
                                
                            {clubAndBar.experience && <p style={{marginTop:"10px"}}><b>Open Since:</b> {clubAndBar.experience}</p>}
                            {clubAndBar.history && (
                                <div>
                                <p style={{marginTop:"10px"}} className="history-head">History</p>
                                <p style={{marginTop:"10px"}}>{clubAndBar.history}</p>
                                </div>
                            )}
                        </div>

                        {clubAndBar.pictureGallery.length >= 1 && (
                            <div className="club-gallery">
                                <h1>Club Gallery</h1>
                                <div className="gallery-grid">
                                    {clubAndBar.pictureGallery.map((image, index) => (
                                        <div className="gallery" key={image._id || index}>
                                            {/* <img src={addImage} alt=""/> */}
                                            <img src={image.path} alt={image.title} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        <div className="contact-person-details">
                            <h1>Contact Person Details</h1>
                            <div className="details-div">
                                <p><b>Name:</b> {clubAndBar.contactPerson}</p>
                                <p><b>Phone:</b> {clubAndBar.phoneNo}</p>
                                <p><b>LandLine:</b> {clubAndBar.landLineNo}</p>
                                <p><b>Email:</b> {clubAndBar.emailAddress}</p>
                            </div>
                        </div>
                        {(clubAndBar.socialMedialinks.length >= 1 || clubAndBar.youtubevideo ||  clubAndBar.webSite) && (
                            <div className="social-media-details">
                                <h1>Social Media Links</h1>
                                <div className="social-links">
                                    {clubAndBar.socialMedialinks[0]?.link && (
                                        <div className="social instagram"><a href={clubAndBar.socialMedialinks[0]?.link}>
                                            <FaInstagram />
                                            <p>Instagram</p>
                                        </a></div>
                                    )}
                                    {clubAndBar.socialMedialinks[1]?.link && (
                                    <div className="social facebook"><a href={clubAndBar.socialMedialinks[1]?.link}>
                                        <FaFacebookF style={{marginTop:"10px"}}/>
                                        <p>Facebook</p>
                                    </a></div>
                                    )}
                                    {clubAndBar.socialMedialinks[2]?.link && (
                                    <div className="social tiktok"><a href={clubAndBar.socialMedialinks[2]?.link}>
                                        <FaTiktok style={{marginTop:"10px"}}/>
                                        <p>Tiktok</p>
                                    </a></div>
                                    )}
                                    {clubAndBar.youtubevideo && (
                                    <div className="social youtube"><a href={clubAndBar.youtubevideo}>
                                        <FaYoutube style={{marginTop:"10px"}}/>
                                        <p>Youtube</p>
                                    </a></div>
                                    )}
                                    {clubAndBar.webSite && (
                                    <div className="social website"><a href={clubAndBar.webSite}>
                                        <CgWebsite style={{marginTop:"10px"}}/>
                                        <p>Website</p>
                                    </a></div>
                                    )}
                                </div>
                             </div>
                        )}
                        {clubAndBar.services.length >= 1 && (
                            <div className="services-details">
                                <h1>Services</h1>
                                <div className="services-div">
                                    {clubAndBar.services.map((ele) => {
                                        return (
                                            <p key={ele._id}><b>{ele.name}:</b> {ele.description}</p>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                        
                        <button className="delete-profile" onClick={() => {handleDeleteClub(clubAndBar._id)}}>Delete Club Profile</button>
                    </div>
                ): (
                    <p>No Club Profile found, Create a new Club Profile</p>
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