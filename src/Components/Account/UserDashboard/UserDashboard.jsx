import { AuthProvider, useAuth } from "../../../Context/AuthContext"
import "./UserDashboard.scss"

import photo from "../../../Assets/Common/user.png"
import { useSelector } from "react-redux";

export default function UserDashboard({ setSelectedDashboard }) {
    const { user } = useAuth()

    const profile = useSelector((state) => {
        return state.profile.data.find(ele => ele.UserID === user?._id)
    });

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
                        <h1 className='dashborad-main-heading'>User Dashboard</h1>
                        <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                    </div>
                    <button className="edit-profile" onClick={() => {setSelectedDashboard("userProfile")}}>Edit Profile</button>
                </div>
                
                <div className="user-profile">
                    <div>
                        <img src={photo} alt="user"/>
                    </div>
                    {(user && profile) && (
                        <div className="user-profile-details">
                            <h1>{user.firstName} {user.lastName}</h1>
                            <p style={{marginTop:"5px"}}>{profile.Slogan}</p>
                            <div className="details">
                                <p style={{marginTop:"20px"}}><b>Email:</b> {user.email}</p>
                                <p style={{marginTop:"10px"}}><b>NickName:</b> {profile.NickName}</p>
                                <p style={{marginTop:"10px"}}><b>DOB:</b> {formatDate(profile.DOB)}</p>
                                <p style={{marginTop:"10px"}}><b>About:</b> {profile.AboutMe}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {(user && profile) && (
                <div className="dashboard-history">
                    <div className="heading-1">
                        <h1 className='main-heading'>Game Profile</h1>
                        <hr className="hr-1"/><hr className="hr-2"/>
                        {/* <h3 className="second-heading">Welcome User</h3> */}
                    </div>
                    {/* <hr className="dashboard-history-hr"/> */}
                    <table className="recent-orders__table">
                        <thead>
                        <tr>
                            <th>SI NO.</th>
                            <th>TITLE</th>
                            <th>NUMBERS</th>
                            {/* <th>TOTAL</th> */}
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Total Score</td>
                                <td>{profile.TotScore}</td>
                                {/* <td>{ele.total}</td> */}
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Ranking</td>
                                <td>{profile.Ranking}</td>
                                {/* <td>{ele.total}</td> */}
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>No.of Matches</td>
                                <td>{profile.NOMatches}</td>
                                {/* <td>{ele.total}</td> */}
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>No.of Matches Won</td>
                                <td>{profile.MatchesWon}</td>
                                {/* <td>{ele.total}</td> */}
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>No.of Events</td>
                                <td>{profile.NoOfEvents}</td>
                                {/* <td>{ele.total}</td> */}
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>No.of Events Won</td>
                                <td>{profile.EventsWon}</td>
                                {/* <td>{ele.total}</td> */}
                            </tr>
                        {/* ))} */}
                        </tbody>
                    </table>
                </div>
            )}
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