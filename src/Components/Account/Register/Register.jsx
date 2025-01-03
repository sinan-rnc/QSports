import { useState } from "react"
import "./Register.scss"
import { useAuth } from "../../../Context/AuthContext"

export default function Register() {
    const {handleLogin} = useAuth()

    const [formErrors, setFormErrors] = useState("")
    const [serverErrors, setServerErrors] = useState("")
    const [form, setForm] = useState({
        username : "",
        password : "",
        confirmPassword : "",
    })

    const errors = {}

    const validateErrors = () => {
        if(form.username.trim().length === 0){
            errors.username = "Username is Required"
        }
        if(form.password.trim().length === 0){
            errors.password = "Password is Required"
        }
        if(form.password === form.confirmPassword){
            errors.confirmPassword = "Passwords do not match"
        }
    }
    validateErrors()

    const handleFormSubmit = (e) => {
        e.preventDefault()

        const formData = {
            username : form.username,
            password : form.password
        }
        // console.log(formData)

        if(Object.keys(errors).length === 0) {
            alert("Successfully Logged In")
            const user = formData
            localStorage.setItem("User", user)
            handleLogin(user)
            setFormErrors("")
            setServerErrors("")
            setForm({
                username : "",
                password : ""
            })
        } else {
            setFormErrors(errors)
            setServerErrors("")
        }
    }

    return (
        <section>
            <div className="register-component container-section">
                <div className="form-component">
                    <div className="heading">
                        <h1 className='main-heading'>Register</h1>
                        <hr className="hr-1"/><hr className="hr-2"/>
                        <h3 className="second-heading">Create an account here</h3>
                    </div>
                    <hr className="form-hr"/>
                    <form className="form-table" onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label className="form-label" for="username">Username/Email</label>
                            <input type="text" className="form-control" id="username" value={form.username} onChange={(e) => {setForm({ ...form, username: e.target.value })}} placeholder="Enter your username"/>
                            {formErrors.username && <span className="from-errors">{formErrors.username}</span>}
                        </div>
                        <div className="form-group">
                            <label className="form-label" for="password">Password</label>
                            <input type="password" className="form-control" id="password" value={form.password} onChange={(e) => {setForm({ ...form, password: e.target.value })}} placeholder="Enter your Password"/>
                            {formErrors.password && <span className="from-errors">{formErrors.password}</span>}
                        </div>
                        <div className="form-group">
                            <label className="form-label" for="username">Confirm Password</label>
                            <input type="password" className="form-control" id="password" value={form.confirmPassword} onChange={(e) => {setForm({ ...form, confirmPassword: e.target.value })}} placeholder="Confirm the Password"/>
                            {formErrors.confirmPassword && <span className="from-errors">{formErrors.confirmPassword}</span>}
                        </div>
                        <button className="register-btn">Register</button>
                    </form>
                </div>
                <p className="login-link">Already Registered? <a href="/login">Login</a></p>
            </div>
        </section>
    )
}