import { useState } from "react";
import "./TournamentDashboard.scss"
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";

export default function TournamentDashboard() {
    const { user } = useAuth()
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


    const handleChange = (e) => {
        const {name} = e.target;
        setForm({...form, [name]: e.target.value });
        // console.log(form)
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, EventImage: URL.createObjectURL(file) });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);
        const formData = {
            ClubID : "6797718c52f17c150584ae9d",
            EventName: form.EventName,
            EventType: form.EventType,
            EventImage: form.EventImage,
            StartingDate: form.StartingDate,
            EndingDate: form.EndingDate,
            LastEnrollmentDate: form.LastEnrollmentDate,
            EnrollmentFee: form.EnrollmentFee,
            MaxPlayers: form.MaxPlayers,
        }
        if(Object.keys(errors).length === 0) {
            try {
                const response = await axios.post("http://103.134.237.3:3001/v1/event/create-event", formData, {
                    headers : {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`,
                    }
                })
                console.log(response.data)
                setFormErrors("")
                setForm({
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
            } catch(err) {
                console.log(err)
                alert(err.message)
                setFormErrors("")
            }
        } else {
            setFormErrors(errors)
        }
    }

    return (
        <div className="tournamentDashboard-container">
            <div className="tournamentDashboard-section">
                <div className="dashborad-heading">
                    <h1 className='dashborad-main-heading'>Event History</h1>
                    <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                    {/* <h3 className="second-heading">Welcome User</h3> */}
                </div>
                <table className="recent-orders__table">
                    <thead>
                    <tr>
                        <th>DATE</th>
                        <th>EVENT NAME</th>
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
            {(user && user?.userType === "ClubAdmin") && (
                <div className="add-tournament-section">
                    <div className="dashborad-heading" onClick={() => {setOpenAddTournamentSection(!openAddTournamentSection)}}>
                        <h1 className='dashborad-main-heading'>New Events</h1>
                        <hr className={`dashborad-hr-1 ${openAddTournamentSection && "rotate"}`}/><hr className="dashborad-hr-2"/>
                    </div>
                    {openAddTournamentSection && (
                        <div className="tournament-from">
                            <form className="form-table" onSubmit={handleSubmit}>
                                <div className="same-line">
                                    <div className="form-group">
                                        <label className="form-label" for="EventName">Event Name</label>
                                        <input type="text" className="form-control" id="EventName" name="EventName" value={form.EventName} onChange={handleChange} placeholder="Enter your Event Name"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" for="EventType">Event Type</label>
                                        <select 
                                            className="form-control"
                                            id="EventType"
                                            name="EventType"
                                            value={form.EventType}
                                            onChange={handleChange}
                                            placeholder="Select a Service">
                                                <option value="">Select the Event Type</option>
                                                <option value="Tournament">Tournament</option>
                                                <option value="League">League</option>
                                                <option value="Match">Match</option>
                                        </select>
                                    </div>
                                </div>
                                {(formErrors.EventName || formErrors.EventType) && (
                                    <div className="same-line">
                                        {formErrors.EventName && <div className="alert alert-danger">{formErrors.EventName}</div>}
                                        {formErrors.EventType && <div className="alert alert-danger">{formErrors.EventType}</div>}
                                    </div>
                                )}
                                <div className="same-line">
                                    <div className="form-group">
                                        <label className="form-label" for="EventImage">Event Poster</label>
                                        <input type="file" className="form-control" id="EventImage" name="EventImage" onChange={handleImageChange} placeholder="Upload your Event Poster"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" for="EnrollmentFee">Enrollment Fees</label>
                                        <input type="number" className="form-control" id="EnrollmentFee" name="EnrollmentFee" value={form.EnrollmentFee} onChange={handleChange} placeholder="Enter the Enrollment Fees"/>
                                    </div>
                                </div>
                                {(formErrors.EventImage || formErrors.EnrollmentFee) && (
                                    <div className="same-line">
                                        {formErrors.EventImage && <div className="alert alert-danger">{formErrors.EventImage}</div>}
                                        {formErrors.EnrollmentFee && <div className="alert alert-danger">{formErrors.EnrollmentFee}</div>}
                                    </div>
                                )}
                                <div className="same-line">
                                    <div className="form-group">
                                        <label className="form-label" for="StartingDate">Start Date</label>
                                        <input type="date" className="form-control" id="StartingDate" name="StartingDate" value={form.StartingDate} onChange={handleChange} placeholder="Enter the Event Starting Date"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" for="EndingDate">End Date</label>
                                        <input type="date" className="form-control" id="EndingDate" name="EndingDate" value={form.EndingDate} onChange={handleChange} placeholder="Enter the Event Ending Date"/>
                                    </div>
                                </div>
                                {(formErrors.StartingDate || formErrors.EndingDate) && (
                                    <div className="same-line">
                                        {formErrors.StartingDate && <div className="alert alert-danger">{formErrors.StartingDate}</div>}
                                        {formErrors.EndingDate && <div className="alert alert-danger">{formErrors.EndingDate}</div>}
                                    </div>
                                )}
                                {/* <div className="same-line">
                                    <div className="form-group">
                                        <label className="form-label" for="location">Event Time</label>
                                        <input type="time" className="form-control" id="EventType" name="EventType" value={form.EventType} onChange={handleChange} placeholder="Enter the Evnt Time"/>
                                    </div>
                                </div> */}
                                <div className="same-line">
                                    <div className="form-group">
                                        <label className="form-label" for="LastEnrollmentDate">Last Enrollment Date</label>
                                        <input type="date" className="form-control" id="LastEnrollmentDate" name="LastEnrollmentDate" value={form.LastEnrollmentDate} onChange={handleChange} placeholder="Enter the Last Enrollment Date"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" for="MaxPlayers">No.of Players</label>
                                        <input type="number" className="form-control" id="MaxPlayers" name="MaxPlayers" value={form.MaxPlayers} onChange={handleChange} placeholder="Enter the No.of Players For the Event"/>
                                    </div>
                                </div>
                                {(formErrors.LastEnrollmentDate || formErrors.MaxPlayers) && (
                                    <div className="same-line">
                                        {formErrors.LastEnrollmentDate && <div className="alert alert-danger">{formErrors.LastEnrollmentDate}</div>}
                                        {formErrors.MaxPlayers && <div className="alert alert-danger">{formErrors.MaxPlayers}</div>}
                                    </div>
                                )}
                                <button type="submit" className="save-btn">Add</button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}