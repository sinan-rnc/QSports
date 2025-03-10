import { useState } from "react"
import "./ContactUs.scss"

export default function ContactUs() {
    const [formErrors, setFormErrors] = useState("")
    const [form, setForm] = useState({
        name : "",
        email : "",
        phoneNo: "",
        subject : "",
        description : "",
    })

    const errors = {}

    const validateErrors = () => {
        if(form.name.trim().length === 0) {
            errors.name = "Name is required"
        }
        if(form.email.trim().length === 0) {
            errors.email = "Email is required"
        }
        if(form.phoneNo.trim().length === 0){
            errors.phoneNo = "Phone No is Required"
        }
        if(form.subject.trim().length === 0){
            errors.subject = "Subject is Required"
        }
        if(form.description.trim().length === 0){
            errors.description = "Description is Required"
        }
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
    
        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch("http://localhost:5000/send", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form)
                });
    
                const result = await response.json();
                if (response.ok) {
                    alert(result.message);
                    setForm({
                        name: "",
                        email: "",
                        phoneNo: "",
                        subject: "",
                        description: "",
                    });
                } else {
                    alert(result.message);
                }
            } catch (err) {
                alert("Something went wrong. Please try again later.");
                console.error(err);
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
                                    <label className="form-label" htmlFor="phoneNo">Phone No</label>
                                    <input type="text" className="form-control" id="phoneNo" name="phoneNo" value={form.phoneNo} onChange={handleChange} placeholder="Enter the Phone No"/>
                                </div>
                            </div>
                            {(formErrors.email || formErrors.phoneNo) && (
                                <div className="same-line">
                                    {formErrors.email && <div className="alert alert-danger">{formErrors.email}</div>}
                                    {formErrors.phoneNo && <div className="alert alert-danger">{formErrors.phoneNo}</div>}  
                                </div>
                            )}
                            <div className="form-group">
                                <label className="form-label" htmlFor="subject">Subject</label>
                                <input type="text" className="form-control" id="subject" name="subject" value={form.subject} onChange={handleChange} placeholder="Enter the Subject"/>
                            </div>
                            {/* {formErrors?.subject (
                                <div className="same-line">
                                    {formErrors?.subject && <div className="alert alert-danger">{formErrors?.subject}</div>}
                                </div>
                            )} */}
                            <div className="form-group">
                                <label className="form-label" htmlFor="description">Description</label>
                                <textarea type="text" className="form-control" id="description" name="description" value={form.description} onChange={handleChange} placeholder="Enter the Description"/>
                            </div>
                            {/* {formErrors.description (
                                <div className="same-line">
                                    {formErrors.description && <div className="alert alert-danger">{formErrors.description}</div>}
                                </div>
                            )} */}
                            {/* {serverErrors && <p className="alert alert-danger">{serverErrors}</p>} */}
                            <button className="register-btn">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}