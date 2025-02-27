import { useState } from "react"
import "./Password.scss"
import { backendApi } from "../../../Apis/api"
import axios from "axios"
import { useAuth } from "../../../Context/AuthContext"
import { BiSolidHide } from "react-icons/bi"
import { MdRemoveRedEye } from "react-icons/md"

export default function Password() {
    const { setAlertMessage, setAlertMessageColor } = useAuth()
    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
    })
    const [confirmPassword, setConfirmPassword] = useState("")
    const [formErrors, setFormErrors] = useState(false)
    const [ showPassword1, setShowPassword1 ] = useState(false)
    const [ showPassword2, setShowPassword2 ] = useState(false)
    const [ showPassword3, setShowPassword3 ] = useState(false)

    const errors = {}

    const validateErrors = () => {
        if(form?.oldPassword?.trim()?.length === 0){
            errors.oldPassword = "Current Password is Required"
        } else if(form?.oldPassword?.trim()?.length < 8){
            errors.oldPassword = "Password must be at least 8 characters"
        }
        if(form?.newPassword?.trim()?.length === 0){
            errors.newPassword = "New Password is Required"
        } else if(form?.newPassword?.trim()?.length < 8){
            errors.newPassword = "Password must be at least 8 characters"
        }
        if(form?.newPassword !== confirmPassword){
            errors.confirmPassword = "Passwords do not match"
        }
    }

    validateErrors()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(form)
        const formData = form
        if(Object.keys(errors).length === 0) {
            try {
                const response = await axios.post(`${backendApi}/users/update-reset-password`, formData, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                // console.log(response)
                // alert("Password Updated Successfully")
                setAlertMessage("Password Updated Successfully")
                setAlertMessageColor("green")
                setFormErrors("")
            } catch(err) {
                // console.log(err.response.data.message)
                // alert(err.message)
                setAlertMessage(err.response.data.message)
                setAlertMessageColor("red")
                setFormErrors("")
            }
        } else {
            setFormErrors(errors)
        } 
    }

    return (
        <div className="password-container">
            <div className="password-section">
                <div className="dashborad-heading">
                    <h1 className='dashborad-main-heading'>Reset Password</h1>
                    <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                    {/* <h3 className="second-heading">Welcome User</h3> */}
                </div>
                <form className="form-table" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" for="oldPassword">Current Password</label>
                        <input type={showPassword1 ? "text" : "password"} className="form-control" id="oldPassword" name="oldPassword" onChange={(e) => {setForm({...form, oldPassword: e.target.value })}} placeholder="Enter your Current Password"/>
                        { showPassword1 ? <BiSolidHide onClick={() => {setShowPassword1(!showPassword1)}}/> : <MdRemoveRedEye onClick={() => {setShowPassword1(!showPassword1)}}/> }
                    </div>
                    {formErrors.oldPassword && <div className="error-message">{formErrors.oldPassword}</div>}
                    <div className="form-group">
                        <label className="form-label" for="newPassword">New Password</label>
                        <input type={showPassword2 ? "text" : "password"} className="form-control" id="newpassword" name="newPassword" onChange={(e) => {setForm({...form, newPassword: e.target.value })}}  placeholder="Enter the New Password"/>
                        { showPassword2 ? <BiSolidHide onClick={() => {setShowPassword2(!showPassword2)}}/> : <MdRemoveRedEye onClick={() => {setShowPassword2(!showPassword2)}}/> }
                    </div>
                    {formErrors.newPassword && <div className="error-message">{formErrors.newPassword}</div>}
                    <div className="form-group">
                        <label className="form-label" for="confirmPassword">Confirm Password</label>
                        <input type={showPassword3 ? "text" : "password"} className="form-control" id="confirmPassword" name="confirmPassword" onChange={(e) => {setConfirmPassword(e.target.value)}} placeholder="Confirm your Password"/>
                        { showPassword3 ? <BiSolidHide onClick={() => {setShowPassword3(!showPassword3)}}/> : <MdRemoveRedEye onClick={() => {setShowPassword3(!showPassword3)}}/> }
                    </div>
                    {formErrors.confirmPassword && <div className="error-message">{formErrors.confirmPassword}</div>}
                    <button className="reset-btn">Reset</button>
                </form>
            </div>
        </div>
    )
}