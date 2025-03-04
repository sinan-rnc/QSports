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
        e.preventDefault()

        if(Object.keys(errors).length === 0) {
            try {
                // console.log(form)
            } catch(err) {
                // console.log(err)
                // alert(err.response.data.message)
            }
        } else {
            setFormErrors(errors)
        }
    }

    return (
        <section>
            <div className="contact-us">
                {/* <div className="location">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d924516.786991024!2d55.461785!3d25.156181!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b6dca9879d9%3A0x6ff60f5cae0a1791!2sRabbit%20And%20Carrot%20LLC!5e0!3m2!1sen!2sus!4v1739357420741!5m2!1sen!2sus"
                        // width="100%"
                        // height="300"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map"
                    ></iframe>
                </div> */}
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