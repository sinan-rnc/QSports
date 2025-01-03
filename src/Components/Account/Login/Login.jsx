import { Navigate, useNavigate } from "react-router-dom"
import "./Login.scss"
import { useState } from "react"
import { useAuth } from "../../../Context/AuthContext"

export default function Login() {
    const {handleLogin} = useAuth()
    const navigate = useNavigate()
    const defaultUsername = "qsports@gmail.com"
    const defaultPassword = "Qsports@123"
    const [form, setForm] = useState({
        username : "",
        password : ""
    })
    const [formErrors, setFormErrors] = useState("")
    const [serverErrors, setServerErrors] = useState("")

    const errors = {}

    const validateErrors = () => {
        if(form.username.trim().length === 0){
            errors.username = "Username is Required"
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

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = {
            username : form.username,
            password : form.password
        }
        console.log(formData)

        if(Object.keys(errors).length === 0) {
            if(formData.username === defaultUsername && formData.password === defaultPassword) {
                alert("Successfully Logged In")
                const user = formData
                localStorage.setItem("token", "QSports")
                handleLogin(user)
                setFormErrors("")
                setServerErrors("")
                setForm({
                    username : "",
                    password : ""
                })
                navigate("/account")
            } else {
                alert("Invalid Username/Password")
                setServerErrors("Invalid Username/Password")
                setFormErrors("")
            }
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
                            <input type="text" className="form-control" id="username" value={form.username} onChange={(e) => {setForm({ ...form, username: e.target.value })}} placeholder="Enter your Username"/>
                            {formErrors.username && <span className="from-errors">{formErrors.username}</span>}
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