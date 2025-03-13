import { useDispatch, useSelector } from "react-redux"

import "./AdminUserDashboard.scss"
import { useEffect, useState } from "react"
import { useAuth } from "../../../../../Context/AuthContext"
import { IoClose } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { startDeleteUser, startUpdateUser } from "../../../../../Actions/usersAction"
import axios from "axios"
import { backendApi } from "../../../../../Apis/api"
import { BiSolidHide } from "react-icons/bi"
import { MdRemoveRedEye } from "react-icons/md"

export default function AdminUserDashboard({ userRole }) {
    const dispatch = useDispatch()
    const { setAlertMessage, setAlertMessageColor } = useAuth()
    const allUsers = useSelector((state) => {
        return state.users.data
            .filter(ele => ele.userType.includes(userRole))
            // .filter((ele => !ele.isDeleted))
    })

    console.log(allUsers)

    const [ openEditUserSection, setOpenEditUserSection ] = useState(false)
    const [ openChangePasswordSection, setOpenChangePasswordSection ] = useState(false)
    const [ currentUserID, setCurrentUserID ] = useState("")
    const [ currentUser, setCurrentUser ] = useState("")
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
    })

    const [ newPassword, setNewPassword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ showPassword1, setShowPassword1 ] = useState(false)
    const [ showPassword2, setShowPassword2 ] = useState(false)

    useEffect(() => {
        if(currentUserID) {
            setCurrentUser(allUsers.find(ele => ele._id === currentUserID))
        }
    }, [currentUserID])

    // console.log(currentUser)

    useEffect(() => {
        if (currentUser) {
            setForm({
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                userName: currentUser.userName,
                email: currentUser.email,
            });
        } else {
            // setOpenEditUserSection(false)
        }
    }, [currentUser]);

    // console.log(featuredForm)

    const [formErrors, setFormErrors] = useState({})

    const errors = {}

    const passwordErrors = {}

    const validateErrors = () => {
        if(form.firstName.trim().length === 0) {
            errors.firstName = "First Name is required"
        }
        if(form.lastName.trim().length === 0) {
            errors.lastName = "Last Name is required"
        }
        if(form.userName.trim().length === 0) {
            errors.userName = "User Name is required"
        }
        if(form.email.trim().length === 0) {
            errors.email = "Email is required"
        }
        if(newPassword.trim().length === 0) {
            passwordErrors.newPassword = "Password is required"
        } else if(newPassword.trim()?.length < 8){
            passwordErrors.newPassword = "Password must be at least 8 characters"
        }
        if(newPassword !== confirmPassword) {
            passwordErrors.confirmPassword = "Password does not Match"
        }
    }

    validateErrors()

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

    const handleEditUser = async (UserID) => {
        setOpenEditUserSection(true)
        setCurrentUserID(UserID)
        setOpenChangePasswordSection("")
    }

    const handleChangePassword = async (UserID) => {
        setOpenChangePasswordSection(true)
        setCurrentUserID(UserID)
        setOpenEditUserSection("")
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(form);
    
        const formData = form
    
        if (Object.keys(errors).length === 0) {
            if (currentUser) {
                const updatedForm = { ...formData, _id: currentUser._id }
                // console.log("updated form", updatedForm);
                dispatch(startUpdateUser(updatedForm, setAlertMessage, setAlertMessageColor));
            }
    
            setFormErrors("");
            setForm({
                firstName: "",
                lastName: "",
                userName: "",
                email: "",
            });
            setCurrentUser("")
            setCurrentUserID("")
            setOpenEditUserSection(false)
        } else {
            setFormErrors(errors);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            _id: currentUser._id,
            newPassword: newPassword
        }
        if (Object.keys(errors).length === 0) {
            // console.log("form Submitted")
            try {
                await axios.post(`${backendApi}/users/create-new-password`, formData, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setAlertMessage("User password updated successfully")
                setAlertMessageColor("green")
                setOpenChangePasswordSection(false)
                window.scrollTo(0, 0)
                setNewPassword("")
                setConfirmPassword("")
            } catch(err) {
                // console.log(err)
                setAlertMessage("Failed to update user password")
                setAlertMessageColor("red")
            }
        } else {
            setFormErrors(passwordErrors)
            setFormErrors(errors);
            // console.log("form not Submitted")
        }
        // console.log(formData)
    }

    const handleDeleteUser = (UserID, setAlertMessage, setAlertMessageColor) => {
        const confirmation = window.confirm("Are you sure you want to delete this event?");
        if (confirmation) {
            dispatch(startDeleteUser(UserID, setAlertMessage, setAlertMessageColor))
        }
        setCurrentUser("")
        setCurrentUserID("")
    }

    return (
        <section className="admin-user-dashboard-container">
            <div id="user-dashboard" className="admin-user-dashboard">
                <div className="dashborad-heading">
                    <h1 className='dashborad-main-heading'>All Users</h1>
                    <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                    {/* <h3 className="dashborad-second-heading">{clubAndBar?.name}</h3> */}
                </div>
                {allUsers.length > 0 ? (
                    <table className="recent-orders__table">
                        <thead>
                        <tr>
                            <th>USER NAME</th>
                            <th>EMAIL</th>
                            <th>USER TYPE</th>
                            <th>REGISTERED DATE</th>
                            <th>ACTION</th>
                        </tr>
                        </thead>
                        <tbody>
                        {allUsers?.map((ele, index) => (
                            <tr key={ele?._id}>
                                <td>{ele?.firstName} {ele?.lastName}</td>
                                <td>{ele?.email}</td>
                                <td>{ele?.userType}</td>
                                <td>{formatDateDDMMYYYY(ele?.createdAt)}</td>
                                <td>
                                    <div className="action-div">
                                        <a href="#edit-user"><button className="edit-profile"
                                            onClick={() => {
                                                handleEditUser(ele._id)
                                            }}
                                        >Edit User</button></a>
                                        <button className="edit-profile"
                                        onClick={() => {handleDeleteUser(ele._id, setAlertMessage, setAlertMessageColor)}}
                                        >Delete User</button>
                                        <a href="#change-password"><button className="edit-profile"
                                        onClick={() => {handleChangePassword(ele._id, setAlertMessage, setAlertMessageColor)}}
                                        >Change Password</button></a>
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
            {openEditUserSection &&
                <section id="edit-user" className="edit-user-section">
                    <div className="dashborad-heading">
                        <h1 className='dashborad-main-heading'>Update User</h1>
                        <hr className={`dashborad-hr-1 ${openEditUserSection && "rotate"}`}/><hr className="dashborad-hr-2"/>
                        <h3 className="dashborad-second-heading">{currentUser && currentUser.userName}</h3>
                    </div>
                    <div className="user-from">
                        <form className="form-table" onSubmit={handleSubmit}>
                            <div className="same-line">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="firstName">First Name</label>
                                    <input type="text" className="form-control" id="firstName" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Enter the First Name"/>
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="lastName">Last Name</label>
                                    <input type="text" className="form-control" id="lastName" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Enter the Last Name"/>
                                </div>
                            </div>
                            {(formErrors.firstName || formErrors.lastName) && (
                                <div className="same-line">
                                    {formErrors.firstName && <div className="alert alert-danger">{formErrors.firstName}</div>}
                                    {formErrors.lastName && <div className="alert alert-danger">{formErrors.lastName}</div>}
                                </div>
                            )}
                            <div className="same-line">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="userName">User Name</label>
                                    <input type="text" className="form-control" id="userName" name="userName" value={form.userName} onChange={handleChange} placeholder="Enter the User Name"/>
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <input type="text" className="form-control" id="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter the Email"/>
                                </div>
                            </div>
                            {(formErrors.userName || formErrors.email) && (
                                <div className="same-line">
                                    {formErrors.userName && <div className="alert alert-danger">{formErrors.userName}</div>}
                                    {formErrors.email && <div className="alert alert-danger">{formErrors.email}</div>}
                                </div>
                            )}
                            <div className="btn-div">
                                <button type="submit" className="save-btn">Save</button>
                            </div>
                            <a href="#user-dashboard"><button className="close-btn" onClick={() => {setOpenEditUserSection(false)}}>Close</button></a>
                        </form>
                    </div>
                </section>
            }

            {openChangePasswordSection &&
                <section id="change-password" className="edit-user-section">
                    <div className="dashborad-heading">
                        <h1 className='dashborad-main-heading'>Change Password</h1>
                        <hr className={`dashborad-hr-1 ${openChangePasswordSection && "rotate"}`}/><hr className="dashborad-hr-2"/>
                        <h3 className="dashborad-second-heading">{currentUser && currentUser.userName}</h3>
                    </div>
                    <div className="user-from">
                        <form className="form-table" onSubmit={handlePasswordSubmit}>
                            <div className="same-line">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="newPassword">New Password</label>
                                    <input type={showPassword1 ? "text" : "password"} className="form-control" id="newPassword" name="newPassword" value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}} placeholder="Enter the First Name"/>
                                    { showPassword1 ? <BiSolidHide onClick={() => {setShowPassword1(!showPassword1)}}/> : <MdRemoveRedEye onClick={() => {setShowPassword1(!showPassword1)}}/> }
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                                    <input type={showPassword2 ? "text" : "password"} className="form-control" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} placeholder="Enter the Last Name"/>
                                    { showPassword2 ? <BiSolidHide onClick={() => {setShowPassword2(!showPassword2)}}/> : <MdRemoveRedEye onClick={() => {setShowPassword2(!showPassword2)}}/> }
                                </div>
                            </div>
                            {(passwordErrors.newPassword || passwordErrors.confirmPassword) && (
                                <div className="same-line">
                                    {passwordErrors.newPassword && <div className="alert alert-danger">{passwordErrors.newPassword}</div>}
                                    {passwordErrors.confirmPassword && <div className="alert alert-danger">{passwordErrors.confirmPassword}</div>}
                                </div>
                            )}
                            <div className="btn-div">
                                <button type="submit" className="save-btn">Save</button>
                            </div>
                            <a href="#event-dashboard"><button className="close-btn" onClick={() => {setOpenChangePasswordSection(false)}}>Close</button></a>
                        </form>
                    </div>
                </section>
            }
        </section>
    )
}