import { useDispatch, useSelector } from "react-redux"

import "./AdminEventDashboard.scss"
import { useEffect, useState } from "react"
import { useAuth } from "../../../../../Context/AuthContext"
import { IoClose } from "react-icons/io5"
import { startDeleteEvent, startFeatureEvent, startUpdateEvent } from "../../../../../Actions/eventsActions"
import { useNavigate } from "react-router-dom"

export default function AdminEventDashboard() {
    const dispatch = useDispatch()
    const { setAlertMessage, setAlertMessageColor } = useAuth()
    const allEvents = useSelector((state) => {
        return state.events.data
            // .filter((ele => !ele.isDeleted))
    })

    // console.log(allEvents)

    const [openAddTournamentSection, setOpenAddTournamentSection] = useState(false)
    const [ currentEventID, setCurrentEventID ] = useState("")
    const [ currentEvent, setCurrentEvent ] = useState("")
    const [ featuredEventID, setFeaturedEventID ] = useState("")
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
    const [ formData, setFormData ] = useState({
        _id: "",
        isFeatured: false
    })

    useEffect(() => {
        if(currentEventID) {
            const event = allEvents.find((ele) => ele._id === currentEventID)
            if(event) {
                setCurrentEvent(event)
            }
        }
    }, [currentEventID])

    useEffect(() => {
        if (currentEvent) {
            setForm({
                ClubID: currentEvent.ClubID || "",
                EventName: currentEvent.EventName || "",
                EventType: currentEvent.EventType || "",
                EventImage: currentEvent.EventImage || "",
                StartingDate: formatDate(currentEvent.StartingDate) || "",
                EndingDate: formatDate(currentEvent.EndingDate) || "",
                LastEnrollmentDate: formatDate(currentEvent.LastEnrollmentDate) || "",
                EnrollmentFee: currentEvent.EnrollmentFee || "",
                MaxPlayers: currentEvent.MaxPlayers || ""
            });
        } else {
            setOpenAddTournamentSection(false)
        }
    }, [currentEvent]);

    useEffect(() => {
        if (featuredEventID) {
            const event = allEvents.find(ele => ele._id === featuredEventID);
            if (event) {
                setCurrentEvent(event);
    
                // Toggle isFeatured value before setting formData
                setFormData({
                    _id: event._id,
                    isFeatured: !event.isFeatured
                });
            }
        }
    }, [featuredEventID]);
    
    useEffect(() => {
        if (formData._id) {
            dispatch(startFeatureEvent(formData, setAlertMessage, setAlertMessageColor));
        }
    }, [formData]);

    // console.log(formData)

    const [formErrors, setFormErrors] = useState({})

    const errors = {}

    const validateErrors = () => {
        if(form.EventName.trim().length === 0) {
            errors.EventName = "Event Name is required"
        }
        if(form.EventType.trim().length === 0) {
            errors.EventType = "Event Type is required"
        }
        if(!form.EventImage) {
            errors.EventImage = "Event Image is required"
        }
        if(form.StartingDate.trim().length === 0) {
            errors.StartingDate = "Starting Date is required"
        }
        if(form.EndingDate.trim().length === 0) {
            errors.EndingDate = "Ending Date is required"
        }
        if((form.LastEnrollmentDate).trim().length === 0) {
            errors.LastEnrollmentDate = "Last Enrollment Date is required"
        }
        if(String(form.EnrollmentFee).trim().length === 0) {
            errors.EnrollmentFee = "Enrollment Fees is required"
        }
        if(String(form.MaxPlayers).trim().length === 0) {
            errors.MaxPlayers = "Max Players is required"
        }
    }

    validateErrors()

    const formatDate = (isoDate) => {
        if (!isoDate) return "";  // Handle empty cases
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const formatDateDDMMYYYY = (isoDate) => {
        if (!isoDate) return "";  // Handle empty cases
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleEditEvent = async (eventId) => {
        setOpenAddTournamentSection(true)
        setCurrentEventID(eventId)
        setFormData({
            _id: "",
            isFeatured: false
        })
    }

    const handleChange = async (e) => {
        const {name} = e.target;
        setForm({...form, [name]: e.target.value });
        // console.log(form)
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        // console.log(file)
        setForm({ ...form, EventImage: file });
    }

    const handleRemoveImage = async () => {
        setForm({ ...form, EventImage: ""});
    }

    const handleFeatureEvent = async (EventID) => {
        setFeaturedEventID(EventID)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(form);
    
        // Use FormData for handling file uploads
        const formData = new FormData();
        formData.append("ClubID", currentEvent?.ClubID);
        formData.append("EventName", form.EventName);
        formData.append("EventType", form.EventType);
        formData.append("StartingDate", form.StartingDate);
        formData.append("EndingDate", form.EndingDate);
        formData.append("LastEnrollmentDate", form.LastEnrollmentDate);
        formData.append("EnrollmentFee", form.EnrollmentFee);
        formData.append("MaxPlayers", form.MaxPlayers);
    
        // ✅ Append file only if it's a valid File object
        if (form.EventImage instanceof File) {
            formData.append("EventImage", form.EventImage);
        } else {
            console.error("EventImage is not a file:", form.EventImage);
        }
    
        if (Object.keys(errors).length === 0) {
            if (currentEvent) {
                formData.append("_id", currentEvent._id);
                // console.log("update form", formData);
                dispatch(startUpdateEvent(formData, setAlertMessage, setAlertMessageColor));
            }
    
            setFormErrors("");
            setForm({
                ClubID: "",
                EventName: "",
                EventType: "",
                EventImage: "",  // Reset image field
                StartingDate: "",
                EndingDate: "",
                LastEnrollmentDate: "",
                EnrollmentFee: "",
                MaxPlayers: ""
            });
            setCurrentEvent("")
            setCurrentEventID("")
        } else {
            setFormErrors(errors);
        }
    };

    const handleDeleteEvent = (EventID, setAlertMessage, setAlertMessageColor) => {
        const confirmation = window.confirm("Are you sure you want to delete this event?");
        if (confirmation) {
            dispatch(startDeleteEvent(EventID, setAlertMessage, setAlertMessageColor))
        }
        setCurrentEvent("")
        setCurrentEventID("")
    }

    return (
        <section className="admin-event-dashboard-container">
            <div id="event-dashboard" className="admin-event-dashboard">
                <div className="dashborad-heading">
                    <h1 className='dashborad-main-heading'>All Events</h1>
                    <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                    {/* <h3 className="dashborad-second-heading">{clubAndBar?.name}</h3> */}
                </div>
                {allEvents.length > 0 ? (
                    <table className="recent-orders__table">
                        <thead>
                        <tr>
                            <th>EVENT NAME</th>
                            <th>START DATE</th>
                            <th>END DATE</th>
                            <th>EVENT TYPE</th>
                            <th>FEES</th>
                            <th>ACTION</th>
                        </tr>
                        </thead>
                        <tbody>
                        {allEvents?.map((ele, index) => (
                            <tr key={ele?._id}>
                                <td>{ele?.EventName}</td>
                                <td>{formatDateDDMMYYYY(ele?.StartingDate)}</td>
                                <td>{formatDateDDMMYYYY(ele?.EndingDate)}</td>
                                <td>{ele?.EventType}</td>
                                <td>{ele?.EnrollmentFee}</td>
                                <td>
                                    <div className="action-div">
                                        <a href="#add-tournament"><button className="edit-profile"
                                            onClick={() => {
                                                handleEditEvent(ele._id)
                                            }}
                                        >Edit Event</button></a>
                                        <button className="edit-profile"
                                        onClick={() => {handleDeleteEvent(ele._id, setAlertMessage, setAlertMessageColor)}}
                                        >Delete Event</button>
                                        <button className="edit-profile"
                                        onClick={() => {handleFeatureEvent(ele._id)}}
                                        >{ele.isFeatured ? "UnFeature Event" : "Feature Event"}</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No Event Found, Create new Event</p>
                )}
            </div>
            {openAddTournamentSection &&
                <section id="add-tournament" className="add-tournament-section">
                    <div className="dashborad-heading" onClick={() => {setOpenAddTournamentSection(!openAddTournamentSection)}}>
                        <h1 className='dashborad-main-heading'>Update Event</h1>
                        <hr className={`dashborad-hr-1 ${openAddTournamentSection && "rotate"}`}/><hr className="dashborad-hr-2"/>
                        <h3 className="dashborad-second-heading">{currentEvent && currentEvent.EventName}</h3>
                    </div>
                    <div className="tournament-from">
                        <form className="form-table" onSubmit={handleSubmit}>
                            <div className="same-line">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="EventName">Event Name</label>
                                    <input type="text" className="form-control" id="EventName" name="EventName" value={form.EventName} onChange={handleChange} placeholder="Enter your Event Name"/>
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="EventType">Event Type</label>
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
                                <div className="form-group gallery">
                                    <label className="form-label" htmlFor="EventImage">Event Poster</label>
                                    <input type="file" className="form-control" id="EventImage" name="EventImage" onChange={handleImageChange} placeholder="Upload your Event Poster"/>
                                    {(form?.EventImage || form?.EventImage?.name)  && (
                                        <div className="upload-image">
                                            <p>Remove Image</p>
                                            <IoClose className="close-icon" onClick={handleRemoveImage} />
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="EnrollmentFee">Enrollment Fees</label>
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
                                    <label className="form-label" htmlFor="StartingDate">Start Date</label>
                                    <input type="date" className="form-control" id="StartingDate" name="StartingDate" value={form.StartingDate} onChange={handleChange} placeholder="Enter the Event Starting Date"/>
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="EndingDate">End Date</label>
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
                                    <label className="form-label" htmlFor="location">Event Time</label>
                                    <input type="time" className="form-control" id="EventType" name="EventType" value={form.EventType} onChange={handleChange} placeholder="Enter the Evnt Time"/>
                                </div>
                            </div> */}
                            <div className="same-line">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="LastEnrollmentDate">Last Enrollment Date</label>
                                    <input type="date" className="form-control" id="LastEnrollmentDate" name="LastEnrollmentDate" value={form.LastEnrollmentDate} onChange={handleChange} placeholder="Enter the Last Enrollment Date"/>
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="MaxPlayers">No.of Players</label>
                                    <input type="number" className="form-control" id="MaxPlayers" name="MaxPlayers" value={form.MaxPlayers} onChange={handleChange} placeholder="Enter the No.of Players For the Event"/>
                                </div>
                            </div>
                            {(formErrors.LastEnrollmentDate || formErrors.MaxPlayers) && (
                                <div className="same-line">
                                    {formErrors.LastEnrollmentDate && <div className="alert alert-danger">{formErrors.LastEnrollmentDate}</div>}
                                    {formErrors.MaxPlayers && <div className="alert alert-danger">{formErrors.MaxPlayers}</div>}
                                </div>
                            )}
                            <div className="btn-div">
                                <button type="submit" className="save-btn">Save</button>
                            </div>
                            <a href="#event-dashboard"><button className="close-btn" onClick={() => {setOpenAddTournamentSection(false)}}>Close</button></a>
                        </form>
                    </div>
                </section>
            }
        </section>
    )
}