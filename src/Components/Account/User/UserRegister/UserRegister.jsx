import { useState } from "react"
import "./UserRegister.scss"
import { useAuth } from "../../../../Context/AuthContext"
import { BiSolidHide } from "react-icons/bi"
import { MdRemoveRedEye } from "react-icons/md"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { backendApi } from "../../../../Apis/api"
import { startCreateUser } from "../../../../Actions/usersAction"
import { useDispatch } from "react-redux"

export default function UserRegister() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {handleLogin, setAlertMessage, setAlertMessageColor} = useAuth()

    const [formErrors, setFormErrors] = useState("")
    // const [serverErrors, setServerErrors] = useState("")
    const [showPassword1, setShowPassword1] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    const [form, setForm] = useState({
        firstName : "",
        lastName : "",
        userName : "",
        email : "",
        password : "",
        confirmPassword : "",
    })

    const errors = {}

    const validateErrors = () => {
        if(form.firstName.trim().length === 0) {
            errors.firstName = "First name is required"
        }
        if(form.lastName.trim().length === 0) {
            errors.lastName = "Last name is required"
        }
        // if(form.userName.trim().length === 0){
        //     errors.userName = "Username is Required"
        // }
        if(form.email.trim().length === 0){
            errors.email = "Email is Required"
        }
        if(form.password.trim().length === 0){
            errors.password = "Password is Required"
        }
        if(form.password !== form.confirmPassword){
            errors.confirmPassword = "Password does not Match"
        }
    }
    validateErrors()

    const handleChange = (e) => {
        const {name} = e.target;
        setForm({...form, [name]: e.target.value });
        // console.log(form)
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        const formData = {
            firstName : form.firstName,
            lastName : form.lastName,
            userName : `${form.firstName}_${form.lastName}`,
            email : form.email,
            password : form.password,
            role: "67989e7b52f17c150584bfcb", 
            userType: "MemberUser"
        }
        // console.log(formData)

        if(Object.keys(errors).length === 0) {
            try {
                const response = await axios.post(`${backendApi}/users/create-user`, formData)
                // const token = response.data.tokens.access
                const user = response.data.data
                dispatch(startCreateUser(user))
                // localStorage.setItem("token", token)
                // handleLogin(user)
                setFormErrors("")
                // setServerErrors("")
                // setForm({
                //     username : "",
                //     password : ""
                // })
                // alert("User Successfully Registered")
                setAlertMessage("User Successfully Registered")
                setAlertMessageColor("green")
                navigate("/")
                // console.log(response)
            } catch(err) {
                // console.log(err)
                // alert(err.response.data.message)
                // setServerErrors(err.response.data.message)
                setFormErrors("")
                setAlertMessage(err.response.data.message)
                setAlertMessageColor("red")
            }
        } else {
            setFormErrors(errors)
            // setServerErrors("")
        }
    }

    return (
        <section>
            <div className="user-register-component container-section">
                <div className="form-component">
                    <div className="heading">
                        <h1 className='main-heading'>User Register</h1>
                        <hr className="hr-1"/><hr className="hr-2"/>
                        <h3 className="second-heading">Create an User account here</h3>
                    </div>
                    <hr className="form-hr"/>
                    <form className="form-table" onSubmit={handleFormSubmit}>
                        <div className="same-line">
                            <div className="form-group">
                                <label className="form-label" htmlFor="firstName">First Name</label>
                                <input type="text" className="form-control" id="firstName" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Enter the First Name"/>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="lastName">Last Name</label>
                                <input type="text" className="form-control" id="lastName" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Enter Contact Last Name"/>
                            </div>
                        </div>
                        {(formErrors.firstName || formErrors.lastName) && (
                            <div className="same-line">
                                {formErrors.firstName && <div className="alert alert-danger">{formErrors.firstName}</div>}
                                {formErrors.lastName && <div className="alert alert-danger">{formErrors.lastName}</div>}
                            </div>
                        )}
                        <div className="same-line">
                            {/* <div className="form-group">
                                <label className="form-label" htmlFor="userName">Username</label>
                                <input type="text" className="form-control" id="userName" name="userName" value={form.userName} onChange={handleChange} placeholder="Enter the Username"/>
                            </div> */}
                            <div className="form-group">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input type="text" className="form-control" id="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter the Email Address"/>
                            </div>
                        </div>
                        {(formErrors.email) && (
                            <div className="same-line">
                                {/* {formErrors.userName && <div className="alert alert-danger">{formErrors.userName}</div>} */}
                                {formErrors.email && <div className="alert alert-danger">{formErrors.email}</div>}
                            </div>
                        )}
                        <div className="same-line">
                            <div className="form-group password-hide">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input type={showPassword1 ? "text" : "password"} className="form-control" id="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter the Password"/>
                                { showPassword1 ? <BiSolidHide onClick={() => {setShowPassword1(!showPassword1)}}/> : <MdRemoveRedEye onClick={() => {setShowPassword1(!showPassword1)}}/> }
                            </div>
                            <div className="form-group password-hide">
                                <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                                <input type={showPassword2 ? "text" : "password"} className="form-control" id="confirmPassword" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password"/>
                                { showPassword2 ? <BiSolidHide onClick={() => {setShowPassword2(!showPassword2)}}/> : <MdRemoveRedEye onClick={() => {setShowPassword2(!showPassword2)}}/> }
                            </div>
                        </div>
                        {(formErrors.password || formErrors.confirmPassword) && (
                            <div className="same-line">
                                {formErrors.password && <div className="alert alert-danger">{formErrors.password}</div>}
                                {formErrors.confirmPassword && <div className="alert alert-danger">{formErrors.confirmPassword}</div>}
                            </div>
                        )}
                        {/* {serverErrors && <p className="alert alert-danger">{serverErrors}</p>} */}
                        <button className="register-btn">Register</button>
                    </form>
                </div>
                <p className="login-link">Already Registered ? <a href="/login">Login</a></p>
                <p className="register-link">Register a new Club ! <a href="/club-register">Register</a></p>
            </div>
        </section>
    )
}