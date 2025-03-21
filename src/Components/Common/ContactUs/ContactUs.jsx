import { useState } from "react"
import "./ContactUs.scss"
import PhoneInput from "react-phone-input-2"
import { useAuth } from "../../../Context/AuthContext"
// const access_key = "f65ef0eb-57aa-45ba-91f7-aaf00dfe46ee" Testing(Sinan)
const access_key = "8c3419f9-7126-43fe-8ce2-bda8f8e0e373" // Qsports

export default function ContactUs() {
    const { setAlertMessage, setAlertMessageColor} = useAuth()
    const [ formErrors, setFormErrors ] = useState("")
    const [ phone, setPhone ] = useState("")
    const [ form, setForm ] = useState({
        name : "",
        email : "",
        // subject : "",
        description : "",
    })
    const [ loading, setLoading ] = useState(false)

    const errors = {}

    const validateErrors = () => {
        if(form.name.trim().length === 0) {
            errors.name = "Name is required"
        }
        if(form.email.trim().length === 0) {
            errors.email = "Email is required"
        }
        if(phone.trim().length === 0){
            errors.phone = "Phone No is Required"
        }
        // if(form.description.trim().length === 0){
        //     errors.description = "Description is Required"
        // }
    }
    validateErrors()

    const handleChange = (e) => {
        const {name} = e.target;
        setForm({...form, [name]: e.target.value });
        // console.log(form)
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        validateErrors();
        const formData = new FormData(e.target);
        formData.append("access_key", access_key);
        formData.append("phone", phone);
        // formData.append("subject", form.subject);
        console.log(form)
        console.log(phone)
    
        if (Object.keys(errors).length === 0) {
            setLoading(true);

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
                });
        
                const data = await response.json();
        
                if (data.success) {
                    setAlertMessage("Form Submitted Successfully")
                    setAlertMessageColor("green")
                    e.target.reset();
                    setFormErrors("")
                    setForm({
                        name : "",
                        email : "",
                        // subject : "",
                        description : "",
                    })
                    setPhone("")
                } else {
                    console.error("Error", data);
                    setAlertMessage(data.message);
                    setAlertMessageColor("red");
                }
            } catch (error) {
                console.error("Error submitting the form:", error);
                setAlertMessage("An error occurred. Please try again later.")
                setAlertMessageColor("red")
            } finally {
                setLoading(false); // Stop loading in all cases
            }
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <section>
            <div className="contact-us">
                <div className="contact-form">
                    <div className="left">
                        <div className="dashborad-heading">
                            <h1 className='dashborad-main-heading'>Our Address</h1>
                            <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                            {/* <h3 className="second-heading"></h3> */}
                        </div>
                        <div className="address-details">
                            <div className="address">
                                <p>Phone: <a href="tel:+971566246705">+971 566246705</a></p>
                                <p>Email: <a href="mailto:qsportsdxb@gmail.com">qsportsdxb@gmail.com</a></p>
                            </div>
                            <div className="opening-hours">
                                <h3>Opening Hours</h3>
                                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                                <p>Saturday - Sunday: 10:00 AM - 6:00 PM</p>
                            </div>
                            <div className="description">
                                <h3>About Us</h3>
                            <p>Qsports is a premier club and bar offering an exciting mix of nightlife, drinks, and gaming tournaments. Enjoy live music, signature cocktails, and competitive events in a vibrant atmosphere. Join us for an unforgettable experience!</p>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="dashborad-heading">
                            <h1 className='dashborad-main-heading'>Leave Us a Message</h1>
                            <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                            {/* <h3 className="second-heading"></h3> */}
                        </div>
                        <form className="form-table" onSubmit={handleFormSubmit}>
                            <div className="same-line">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" name="name" value={form.name} onChange={handleChange} placeholder="Enter the Name"/>
                                </div>
                            </div>
                            {(formErrors.name) && (
                                <div className="same-line">
                                    {formErrors.name && <div className="alert alert-danger">{formErrors.name}</div>}
                                </div>
                            )}
                            <div className="same-line">
                            <div className="form-group">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <input type="text" className="form-control" id="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter the Email Email"/>
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="phone">Phone No</label>
                                    <PhoneInput
                                        inputStyle={{ 
                                            width: "100%", 
                                            padding: "8px 30px 8px 40px", 
                                            outline: "none", 
                                            border: "none", 
                                            background: "#eaeaea", 
                                            fontSize: 14 
                                        }}
                                        containerStyle={{ 
                                            width: "100%", 
                                            border: "2px solid #eaeaea", 
                                            background: "#eaeaea", 
                                            display: "flex", 
                                            alignItems: "center" 
                                        }}
                                        buttonStyle={{ 
                                            border: "none", 
                                            background: "transparent", 
                                            marginRight: "10px" 
                                        }}
                                        className="phone-input"
                                        placeholder="Enter Your Mobile"
                                        name="phone"
                                        id="phone"
                                        country={"ae"}
                                        value={phone}
                                        onChange={(value) => { setPhone(value) }}
                                    />
                                </div>
                            </div>
                            {(formErrors.email || formErrors.phone) && (
                                <div className="same-line">
                                    {formErrors.email && <div className="alert alert-danger">{formErrors.email}</div>}
                                    {formErrors.phone && <div className="alert alert-danger">{formErrors.phone}</div>}  
                                </div>
                            )}
                            {/* <div className="form-group">
                                <label className="form-label" htmlFor="subject">Subject</label>
                                <input type="text" className="form-control" id="subject" name="subject" value={form.subject} onChange={handleChange} placeholder="Enter the Subject"/>
                            </div> */}
                            <div className="form-group">
                                <label className="form-label" htmlFor="description">Description</label>
                                <textarea type="text" className="form-control" id="description" name="description" value={form.description} onChange={handleChange} placeholder="Enter the Description"/>
                            </div>
                            <button className="register-btn">{loading ? "Sending" : "Submit"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}