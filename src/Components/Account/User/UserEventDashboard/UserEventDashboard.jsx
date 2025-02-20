import { useState } from "react";
import "./UserEventDashboard.scss"
import axios from "axios";
import { useAuth } from "../../../../Context/AuthContext";
import { useSelector } from "react-redux";

export default function UserEventDashboard() {
    const { user } = useAuth()
    const profile = useSelector((state) => {
        return state.profile.data.find(ele => !ele?.isDeleted && ele?.UserID === user?._id)
    });
    const [form, setForm] = useState({
        ClubID: "",
        EventName: "",
        EventType: "",
        EventImage: "",
        StartingDate: "",
        EndingDate: "",
        LastEnrollmentDate: "",
        EnrollmentFee: "",
        MaxPlayers: ""
    })
    const [openAddTournamentSection, setOpenAddTournamentSection] = useState(false)
    const [formErrors, setFormErrors] = useState({})

    const errors = {}

    const validateErrors = () => {
        if(form.EventName.trim().length === 0) {
            errors.EventName = "Event Name is required"
        }
        if(form.EventType.trim().length === 0) {
            errors.EventType = "Event Type is required"
        }
        if(form.EventImage.trim().length === 0) {
            errors.EventImage = "Event Image is required"
        }
        if(form.StartingDate.trim().length === 0) {
            errors.StartingDate = "Starting Date is required"
        }
        if(form.EndingDate.trim().length === 0) {
            errors.EndingDate = "Ending Date is required"
        }
        if(form.LastEnrollmentDate.trim().length === 0) {
            errors.LastEnrollmentDate = "Last Enrollment Date is required"
        }
        if(form.EnrollmentFee.trim().length === 0) {
            errors.EnrollmentFee = "Enrollment Fees is required"
        }
        if(form.MaxPlayers.trim().length === 0) {
            errors.MaxPlayers = "Max Players is required"
        }
    }

    validateErrors()

    const tournamentStatus = [
        { id: 1, date: "25 JAN 2024", name: "Rack 'Em Up Challenge", ranking: "First", total: "" },
        { id: 2, date: "30 JAN 2024", name: "The Cue Masters Cup", ranking: "Fifth", total: "" },
        { id: 3, date: "01 APRIL 2024", name: "Eight-Ball Showdown", ranking: "Seventh", total: "" },
        { id: 4, date: "10 JUNE 2024", name: "Neon Nights Club", ranking: "Tenth", total: "" },
        { id: 5, date: "20 SEPT 2024", name: "Neon Cue Fiesta", ranking: "Not Qualified", total: "" },
        { id: 6, date: "01 DEC 2024", name: "Rack and Roll Championship", ranking: "Not Qualified", total: "" },
        { id: 6, date: "20 DEC 2024", name: "Midnight Cue Clash", ranking: "Quater-Finalist", total: "" },
    ];

    return (
        <div className="user-event-container">
            <div className="user-event-dashboard">
                <div className="dashborad-heading">
                    <h1 className='dashborad-main-heading'>Event History</h1>
                    <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                    {/* <h3 className="second-heading">Welcome User</h3> */}
                </div>
                <p>No Event Participated, Join a <a href="/tournaments">new Event</a></p>
                {/* <table className="recent-orders__table">
                    <thead>
                    <tr>
                        <th>DATE</th>
                        <th>EVENT NAME</th>
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
                </table> */}
            </div>
            
            {profile && (
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
                            <th>RESULTS</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Total Score</td>
                                <td>{profile.TotScore}</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Ranking</td>
                                <td>{profile.Ranking}</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>No.of Matches</td>
                                <td>{profile.NOMatches}</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>No.of Matches Won</td>
                                <td>{profile.MatchesWon}</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>No.of Events</td>
                                <td>{profile.NoOfEvents}</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>No.of Events Won</td>
                                <td>{profile.EventsWon}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}