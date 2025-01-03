import { useState } from "react";
import "./TournamentDashboard.scss"

export default function TournamentDashboard() {
    const tournamentStatus = [
        { id: 1, date: "25 JAN 2024", name: "Rack 'Em Up Challenge", ranking: "First", total: "" },
        { id: 2, date: "30 JAN 2024", name: "The Cue Masters Cup", ranking: "Fifth", total: "" },
        { id: 3, date: "01 APRIL 2024", name: "Eight-Ball Showdown", ranking: "Seventh", total: "" },
        { id: 4, date: "10 JUNE 2024", name: "Neon Nights Club", ranking: "Tenth", total: "" },
        { id: 5, date: "20 SEPT 2024", name: "Neon Cue Fiesta", ranking: "Not Qualified", total: "" },
        { id: 6, date: "01 DEC 2024", name: "Rack and Roll Championship", ranking: "Not Qualified", total: "" },
        { id: 6, date: "20 DEC 2024", name: "Midnight Cue Clash", ranking: "Quater-Finalist", total: "" },
    ];

      const [openAddTournamentSection, setOpenAddTournamentSection] = useState(false)

    return (
        <div className="tournamentDashboard-container">
            <div className="tournamentDashboard-section">
                <div className="dashborad-heading">
                    <h1 className='dashborad-main-heading'>Tournament History</h1>
                    <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                    {/* <h3 className="second-heading">Welcome User</h3> */}
                </div>
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
            {/* <div className="add-tournament-section">
                <div className="dashborad-heading" onClick={() => {setOpenAddTournamentSection(!openAddTournamentSection)}}>
                    <h1 className='dashborad-main-heading'>New Tournament</h1>
                    <hr className={`dashborad-hr-1 ${openAddTournamentSection && "rotate"}`}/><hr className="dashborad-hr-2"/>
                </div>
                {openAddTournamentSection && (
                    <div className="tournament-from">
                        <form className="form-table">
                            <div className="form-group">
                                <label className="form-label" for="clubBarName">Tournament Name</label>
                                <input type="text" className="form-control" id="clubBarName" placeholder="Enter your Tournament Name"/>
                            </div>
                            <div className="form-group">
                                <label className="form-label" for="clubBarNumber">Tournament Type</label>
                                <input type="text" className="form-control" id="clubBarNumber" placeholder="Enter your Tournament Type"/>
                            </div>
                            <div className="form-group">
                                <label className="form-label" for="email">No.of Players</label>
                                <input type="number" className="form-control" id="email" placeholder="Enter the No.of Players"/>
                            </div>
                            <div className="form-group">
                                <label className="form-label" for="phoneNumber">Date</label>
                                <input type="date" className="form-control" id="phoneNumber" placeholder="Enter the Date"/>
                            </div>
                            <div className="form-group">
                                <label className="form-label" for="location">Time</label>
                                <input type="time" className="form-control" id="location" placeholder="Enter the Time"/>
                            </div>
                            <button className="save-btn">Add</button>
                        </form>
                    </div>
                )}
            </div> */}
        </div>
    )
}