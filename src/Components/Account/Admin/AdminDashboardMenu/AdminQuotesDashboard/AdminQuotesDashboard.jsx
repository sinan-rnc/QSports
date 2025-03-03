import { useDispatch, useSelector } from "react-redux"

import "./AdminQuotesDashboard.scss"
import { useEffect, useState } from "react"
import { useAuth } from "../../../../../Context/AuthContext"
import { IoClose } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { startDeleteUser, startUpdateUser } from "../../../../../Actions/usersAction"
import axios from "axios"
import { backendApi } from "../../../../../Apis/api"
import { startCreateQuote, startDeleteQuote, startUpdateQuote } from "../../../../../Actions/quotesAction"

export default function AdminQuotesDashboard() {
    const dispatch = useDispatch()
    const { setAlertMessage, setAlertMessageColor } = useAuth()
    const allQuotes = useSelector((state) => {
        return state.quotes.data
            // .filter((ele => !ele.isDeleted))
    })

    // console.log(allQuotes)

    const [openAddQuoteSection, setOpenAddQuoteSection] = useState(false)
    const [ currentQuoteID, setCurrentQuoteID ] = useState("")
    const [ currentQuote, setCurrentQuote ] = useState("")
    const [ form, setForm ] = useState({
        quote: "",
        author: "",
        releaseDate: "",
    })

    useEffect(() => {
        if(currentQuoteID) {
            setCurrentQuote(allQuotes.find(ele => ele._id === currentQuoteID))
        }
    }, [currentQuoteID])

    // console.log(currentQuote)

    useEffect(() => {
        if (currentQuote) {
            setForm({
                quote: currentQuote.quote,
                author: currentQuote.author,
                releaseDate: formatDate(currentQuote.releaseDate),
            });
        } else {
            // setOpenAddQuoteSection(false)
        }
    }, [currentQuote]);

    // console.log(featuredForm)

    const [formErrors, setFormErrors] = useState({})

    const errors = {}

    const validateErrors = () => {
        if(form?.quote?.trim().length === 0) {
            errors.quote = "Quote is required"
        }
        if(form?.author?.trim().length === 0) {
            errors.author = "Author Name is required"
        }
        if(!form?.releaseDate) {
            errors.userName = "Release Date is required"
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

    const handleChange = async (e) => {
        const {name} = e.target;
        setForm({...form, [name]: e.target.value });
        // console.log(form)
    };

    const handleEditQuote = async (QuoteID) => {
        setOpenAddQuoteSection(true)
        setCurrentQuoteID(QuoteID)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(form);
    
        const formData = form
    
        if (Object.keys(errors).length === 0) {
            if (currentQuote) {
                const updatedForm = { ...formData, _id: currentQuote._id }
                // console.log("updated form", updatedForm);
                dispatch(startUpdateQuote(updatedForm, setAlertMessage, setAlertMessageColor));
            } else {
                // console.log("creating form", formData);
                dispatch(startCreateQuote(formData, setAlertMessage, setAlertMessageColor));
            }
    
            setFormErrors("");
            setForm({
                quote: "",
                author: "",
                releaseDate: "",
            });
            setCurrentQuote("")
            setCurrentQuoteID("")
        } else {
            setFormErrors(errors);
        }
    };


    const handleDeleteQuote = (QuoteID, setAlertMessage, setAlertMessageColor) => {
        const confirmation = window.confirm("Are you sure you want to delete this event?");
        if (confirmation) {
            dispatch(startDeleteQuote(QuoteID, setAlertMessage, setAlertMessageColor))
        }
        setCurrentQuote("")
        setCurrentQuoteID("")
    }

    return (
        <section className="admin-quotes-dashboard-container">
            <div id="quotes-dashboard" className="admin-quotes-dashboard">
                <div className="dashborad-heading-div">
                    <div className="dashborad-heading">
                        <h1 className='dashborad-main-heading'>All Users</h1>
                        <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                        
                        {/* <h3 className="dashborad-second-heading">{clubAndBar?.name}</h3> */}
                    </div>
                    <a href="#add-quotes"><button className="edit-profile" onClick={() => {
                        setOpenAddQuoteSection(true)
                        setCurrentQuoteID("")
                        setCurrentQuote("")
                        setForm({
                            quote: "",
                            author: "",
                            releaseDate: "",
                        })
                    }}>Create a New Quote</button></a>
                </div>
                
                {allQuotes.length > 0 ? (
                    <table className="recent-orders__table">
                        <thead>
                        <tr>
                            <th>QUOTE</th>
                            <th>AUTHOR</th>
                            <th>RELEASE DATE</th>
                            <th>CREATED DATE</th>
                            <th>ACTION</th>
                        </tr>
                        </thead>
                        <tbody>
                        {allQuotes?.map((ele, index) => (
                            <tr key={ele?._id}>
                                <td>{ele?.quote}</td>
                                <td>{ele?.author}</td>
                                <td>{formatDateDDMMYYYY(ele?.releaseDate)}</td>
                                <td>{formatDateDDMMYYYY(ele?.createdAt)}</td>
                                <td>
                                    <div className="action-div">
                                        <a href="#add-quotes"><button className="edit-profile"
                                            onClick={() => {
                                                handleEditQuote(ele._id)
                                            }}
                                        >Edit Quote</button></a>
                                        <button className="edit-profile"
                                        onClick={() => {handleDeleteQuote(ele._id, setAlertMessage, setAlertMessageColor)}}
                                        >Delete Quote</button>
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
            {openAddQuoteSection &&
                <section id="add-quotes" className="add-quotes-section">
                    <div className="dashborad-heading">
                        <h1 className='dashborad-main-heading'>Update Quote</h1>
                        <hr className={`dashborad-hr-1 ${openAddQuoteSection && "rotate"}`}/><hr className="dashborad-hr-2"/>
                        <h3 className="dashborad-second-heading">{currentQuote && currentQuote.userName}</h3>
                    </div>
                    <div className="quotes-from">
                        <form className="form-table" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="quote">Quote</label>
                                <textarea type="text" className="form-control" id="quote" name="quote" value={form.quote} onChange={handleChange} placeholder="Enter the Quote"/>
                            </div>
                            {(formErrors.quote) && (
                                formErrors.quote && <div className="alert alert-danger">{formErrors.quote}</div>
                            )}
                            <div className="same-line">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="author">Author Name</label>
                                    <input type="text" className="form-control" id="author" name="author" value={form.author} onChange={handleChange} placeholder="Enter the Author Name"/>
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="releaseDate">Release date</label>
                                    <input type="date" className="form-control" id="releaseDate" name="releaseDate" value={form.releaseDate} onChange={handleChange} placeholder="Enter the Release Date"/>
                                </div>
                            </div>
                            {(formErrors.author || formErrors.releaseDate) && (
                                <div className="same-line">
                                    {formErrors.author && <div className="alert alert-danger">{formErrors.author}</div>}
                                    {formErrors.releaseDate && <div className="alert alert-danger">{formErrors.releaseDate}</div>}
                                </div>
                            )}
                            <div className="btn-div">
                                <button type="submit" className="save-btn">Save</button>
                            </div>
                            <a href="#event-dashboard"><button className="close-btn" onClick={() => {
                                setCurrentQuote("")
                                setCurrentQuoteID("")
                                setOpenAddQuoteSection(false)
                                }}>Close</button></a>
                        </form>
                    </div>
                </section>
            }
        </section>
    )
}