import { Navigate, useNavigate } from "react-router-dom"
import "./Login.scss"
import { useState } from "react"
import { useAuth } from "../../../Context/AuthContext"
import axios from "axios"
import { backendApi } from "../../../Apis/api"

export default function Login() {
    const {handleLogin, setAlertMessage, setAlertMessageColor} = useAuth()
    const navigate = useNavigate()
    // const defaultUsername = "qsports@gmail.com"
    // const defaultPassword = "Qsports@123"
    const [form, setForm] = useState({
        email : "",
        password : ""
    })
    const [formErrors, setFormErrors] = useState("")
    const [serverErrors, setServerErrors] = useState("")

    const errors = {}

    const validateErrors = () => {
        if(form.email.trim().length === 0){
            errors.email = "Username is Required"
        }
        if(form.password.trim().length === 0){
            errors.password = "Password is Required"
        }
    }
    validateErrors()

    // const handleChange = (e) => {
    //     const {name, value} = e.target
    //     setForm({...form, [name]: value })
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = {
            email : form.email,
            password : form.password
        }
        // console.log(formData)

        if(Object.keys(errors).length === 0) {
            try {
                const response = await axios.post(`${backendApi}/auth/login`, formData)
                const token = response.data.tokens.access
                const user = response.data.user
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                handleLogin(user)
                setFormErrors("")
                setServerErrors("")
                // setForm({
                //     username : "",
                //     password : ""
                // })
                if(user.userType === "SuperAdmin") {
                    navigate("/admin-account")
                } else {
                    navigate("/account")
                }
                setAlertMessage("Login Successfull")
                setAlertMessageColor("green")
                // console.log(response)
            } catch(err) {
                setAlertMessage(err.response.data.message)
                setAlertMessageColor("red")
                // console.log(err)
                // alert("Invalid Username/Password")
            }
            // if(formData.username === defaultUsername && formData.password === defaultPassword) {
            //     alert("Successfully Logged In")
            //     const user = formData
            //     localStorage.setItem("token", "QSports")
            //     handleLogin(user)
            //     setFormErrors("")
            //     setServerErrors("")
            //     setForm({
            //         username : "",
            //         password : ""
            //     })
            //     navigate("/account")
            // } else {
            //     alert("Invalid Username/Password")
            //     setServerErrors("Invalid Username/Password")
            //     setFormErrors("")
            // }
        } else {
            setFormErrors(errors)
            setServerErrors("")
        }
    }
    return (
        <section>
            <div className="login-component container-section">
                <div className="form-component">
                    <div className="heading">
                        <h1 className='main-heading'>Login</h1>
                        <hr className="hr-1"/><hr className="hr-2"/>
                        <h3 className="second-heading">Welcome User</h3>
                    </div>
                    <hr className="form-hr"/>
                    <form className="form-table" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="username">Username/Email</label>
                            <input type="text" className="form-control" id="username" value={form.email} onChange={(e) => {setForm({ ...form, email: e.target.value })}} placeholder="Enter your Username"/>
                            {formErrors.email && <span className="from-errors">{formErrors.email}</span>}
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" value={form.password} onChange={(e) => {setForm({ ...form, password: e.target.value })}} placeholder="Enter your Password"/>
                            {formErrors.password && <span className="from-errors">{formErrors.password}</span>}
                            {serverErrors && <span className="from-errors">{serverErrors}</span>}
                        </div>
                        <button type="submit" className="register-btn">Login</button>
                    </form>
                </div>
                <p className="login-link">Don't Have an Account? <a href="/register">Register</a></p>
            </div>
        </section>
    )
}