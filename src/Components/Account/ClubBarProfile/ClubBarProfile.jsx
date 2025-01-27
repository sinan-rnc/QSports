import { useState } from "react";
import PhoneInput from "react-phone-input-2"
import 'react-phone-input-2/lib/style.css'

import "./ClubBarProfile.scss"
import { IoClose } from "react-icons/io5";

import { RiBilliardsFill, RiDrinksFill, RiInstagramFill } from "react-icons/ri";
import { PiSeatFill } from "react-icons/pi";
import { GiTeacher, GiPoolTableCorner, GiPoolTriangle, GiAges } from "react-icons/gi";
import { MdEmojiEvents } from "react-icons/md";
import { FaMoneyBill, FaFacebook } from "react-icons/fa";

import { IoFastFood } from "react-icons/io5";
import { BiSolidDrink } from "react-icons/bi";
import { LuDessert } from "react-icons/lu";
import axios from "axios";
import { dubaiCities } from "../../../DataSet/dubaiCities";

export default function ClubBarProfile() {
    // console.log(dubaiCities)
    const [ form, setForm ] = useState({
        name: "",
        // category: "",
        city: "",
        contactPerson: "",
        slogan: "",
        image: "",
        emailAddress: "",
        phoneNo: "",
        webSite: "",
        experience: "",
        address: "",
        geoLocation: "",
        city: "",
        introductionObjtv: "",
        openTime: "",
        closeTime: "",
        happyHrRates: "",
        normalHrRates: "",
        description: "",
        history: "",
        youtubevideo: "",
        experience: 0,
        pictureGallery: [],
        socialMedialinks: [
            { name: "Facebook", icon: "<FaFacebook />", link: "" },
            { name: "Instagram", icon: "<RiInstagramFill />", link: "" },
        ],
        services: []
    })

    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedFoodServices, setSelectedFoodServices] = useState([]);

    const [availableServices, setAvailableServices] = useState([
        "No. of pool & snooker tables",
        "Ages allowed in the club",
        "Clubs space and seating space",
        "Pool Coaching",
        "Pool & Billiard Products",
        "Table models & sizes",
        "Pool Competitions & Events",
        "Billiard Balls and Cloth",
    ]);

    const [availableFoodServices, setAvailableFoodServices] = useState([
        "Food",
        "Drinks",
        "Coffees",
        "Desserts",
    ])

    const iconsMap = {
        "No. of pool & snooker tables": "<GiPoolTableCorner />",
        "Ages allowed in the club": "<GiAges />",
        "Clubs space and seating space": "<PiSeatFill />",
        "Pool Coaching": "<GiTeacher />",
        "Pool & Billiard Products": "<GiPoolTriangle />",
        "Table models & sizes": "<FaMoneyBill />",
        "Pool Competitions & Events": "<MdEmojiEvents />",
        "Billiard Balls and Cloth": "<RiBilliardsFill />",
        "Food": "<IoFastFood />",
        "Drinks": "<BiSolidDrink />",
        "Coffees": "<RiDrinksFill />",
        "Desserts": "<LuDessert />",
    };

    const handleChange = (e) => {
        const {name} = e.target;
        setForm({...form, [name]: e.target.value });
        // console.log(form)
    };

    const handlePhoneChange = (value) => {
        setForm({ ...form, phoneNo: value }); // Directly update the phone number in the form
        // console.log("Updated phone number:", value);
    };

    const handleSocialMediaChange = (platformName, value) => {
        setForm((prevForm) => {
            const updatedLinks = prevForm.socialMedialinks.map((platform) =>
                platform.name === platformName ? { ...platform, link: value } : platform
            );
            return { ...prevForm, socialMedialinks: updatedLinks };
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, image: URL.createObjectURL(file) });
    }
    
    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files); // Get the selected files
        console.log(files)
        const updatedGallery = files.map((file) => ({
            title: file.name, // Use the file name as the title
            path: URL.createObjectURL(file), // Create a temporary URL for preview
        }));
    
        // Update the form state by adding the new files to the pictureGallery array
        setForm((prevForm) => ({
            ...prevForm,
            pictureGallery: [...prevForm.pictureGallery, ...updatedGallery], // Append to existing gallery
        }));
    };

    const handleRemoveImage = (indexToRemove) => {
        setForm((prevForm) => ({
            ...prevForm,
            pictureGallery: prevForm.pictureGallery.filter((_, index) => index !== indexToRemove),
        }));
    };

    const handleSelectServiceChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue && !selectedServices.includes(selectedValue)) {
            setSelectedServices((prevServices) => [...prevServices, selectedValue]);
            setAvailableServices((prevServices) =>
                prevServices.filter((service) => service !== selectedValue)
            );
        }

        setForm((prevForm) => ({
            ...prevForm,
            services: [
                ...prevForm.services,
                {
                    name: selectedValue,
                    icon: iconsMap[selectedValue] || "", // Default empty, can be updated later
                    description: "", // Default empty, can be updated later
                },
            ],
        }));

        e.target.value = ""; // Reset dropdown to default option
    };
    
    const handleServiceDescriptionChange = (serviceName, value) => {
        setForm((prevForm) => ({
            ...prevForm,
            services: prevForm.services.map((service) =>
                service.name === serviceName
                    ? { ...service, description: value }
                    : service
            ),
        }));
    };

    const handleSelectFoodServiceChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue && !selectedFoodServices.includes(selectedValue)) {
            setSelectedFoodServices((prevServices) => [...prevServices, selectedValue]);
            setAvailableFoodServices((prevServices) =>
                prevServices.filter((service) => service !== selectedValue)
            );
        }
        // setSelectedFoodServices([])
        setForm((prevForm) => ({
            ...prevForm,
            services: [
                ...prevForm.services,
                {
                    name: selectedValue,
                    icon:  iconsMap[selectedValue] || "", // Default empty
                    description: "", // Default empty
                },
            ],
        }));

        e.target.value = "";
    };

    const handleFoodServiceDescriptionChange = (serviceName, value) => {
        setForm((prevForm) => ({
            ...prevForm,
            services: prevForm.services.map((service) =>
                service.name === serviceName
                    ? { ...service, description: value }
                    : service
            ),
        }));
    };

    const handleRemoveService = (service) => {
        setSelectedServices((prevServices) =>
            prevServices.filter((item) => item !== service)
        );
        setAvailableServices((prevServices) => [...prevServices, service]);

        setForm((prevForm) => ({
            ...prevForm,
            services: prevForm.services.filter((item) => item.name !== service),
        }));
    };
    

    const handleRemoveFoodService = (service) => {
        setSelectedFoodServices((prevServices) => 
            prevServices.filter((item) => item !== service)
        );
        setAvailableFoodServices((prevServices) => [...prevServices, service]);

        setForm((prevForm) => ({
            ...prevForm,
            services: prevForm.services.filter(
                (item) => item.name !== service
            ),
        }));
    };

    const renderInputField = (service) => {
        switch (service) {
            case "No. of pool & snooker tables":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="poolTables">No. of pool & snooker tables</label>
                    <input type="number" className="form-control" 
                        onChange={(e) =>
                            handleServiceDescriptionChange(service, e.target.value)
                        }
                        id="poolTables" placeholder="No. of pool & snooker tables" />
                    <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                </div>
                );
            case "Ages allowed in the club":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="agesAllowed">Ages allowed in the club</label>
                    <input type="number" className="form-control" 
                        onChange={(e) =>
                            handleServiceDescriptionChange(service, e.target.value)
                        }
                        id="agesAllowed" placeholder="Ages aloud in the club" />
                    <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                </div>
                );
            case "Clubs space and seating space":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="clubSpace">Club space and seating space</label>
                    <input type="number" className="form-control" 
                        onChange={(e) =>
                            handleServiceDescriptionChange(service, e.target.value)
                        }
                        id="clubSpace" placeholder="Club space and seating space" />
                    <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                </div>
                );
            case "Pool Coaching":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="poolCoaching">Pool Coaching</label>
                    <input type="text" className="form-control"
                        onChange={(e) =>
                            handleServiceDescriptionChange(service, e.target.value)
                        }
                        id="poolCoaching" placeholder="Pool Coaching - Yes/No" />
                    <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                </div>
                );
            case "Pool & Billiard Products":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="poolProducts">Pool & Billiard Products</label>
                    <input type="text" className="form-control"
                        onChange={(e) =>
                            handleServiceDescriptionChange(service, e.target.value)
                        }
                        id="poolProducts" placeholder="Pool & Billiard Products" />
                    <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                </div>
                );
            case "Table models & sizes":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="tableModels">Table models & sizes</label>
                    <input type="text" className="form-control"
                        onChange={(e) =>
                            handleServiceDescriptionChange(service, e.target.value)
                        }
                        id="tableModels" placeholder="Table models & sizes" />
                    <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                </div>
                );
            case "Pool Competitions & Events":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="competitions">Pool Competitions & Events</label>
                    <input type="text" className="form-control"
                        onChange={(e) =>
                            handleServiceDescriptionChange(service, e.target.value)
                        }
                        id="competitions" placeholder="Pool Competitions & Events" />
                    <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                </div>
                );
            case "Billiard Balls and Cloth":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="billiardBalls">Billiard Balls and Cloth</label>
                    <input type="text" className="form-control"
                        onChange={(e) =>
                            handleServiceDescriptionChange(service, e.target.value)
                        }
                        id="billiardBalls" placeholder="Billiard Balls and Cloth" />
                    <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                </div>
                );
            default:
                return null;
        }
    };

    const renderFoodInputField = (service) => {
        switch (service) {
            case "Food":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="food">Type of Food</label>
                    <input type="text"
                        onChange={(e) =>
                            handleFoodServiceDescriptionChange(service, e.target.value)
                        }
                        className="form-control" id="food" placeholder="Type of Food" />
                    <IoClose className="close-icon" onClick={() => handleRemoveFoodService(service)} />
                </div>
                );
            case "Drinks":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="drinks">Type of Drinks</label>
                    <input type="text"
                        onChange={(e) =>
                            handleFoodServiceDescriptionChange(service, e.target.value)
                        }
                        className="form-control" id="drinks" placeholder="Type of Drinks" />
                    <IoClose className="close-icon" onClick={() => handleRemoveFoodService(service)} />
                </div>
                );
            case "Coffees":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="coffees">Type of Coffees</label>
                    <input type="text"
                        onChange={(e) =>
                            handleFoodServiceDescriptionChange(service, e.target.value)
                        }
                        className="form-control" id="coffees" placeholder="Type of Coffees" />
                    <IoClose className="close-icon" onClick={() => handleRemoveFoodService(service)} />
                </div>
                );
            case "Desserts":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="desserts">Type of Desserts</label>
                    <input type="text"
                        onChange={(e) =>
                            handleFoodServiceDescriptionChange(service, e.target.value)
                        }
                        className="form-control" id="desserts" placeholder="Type of Desserts" />
                    <IoClose className="close-icon" onClick={() => handleRemoveFoodService(service)} />
                </div>
                );
            default:
                return null;
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        console.log(form)
        const formData = form
        try {
            const response = await axios.post("http://103.134.237.3:3001/v1/club/create-club", formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response)
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }
    

    return (
        <div className="clubBar-profile-container">
            <div className="clubBar-profile-section">
                <div className="dashborad-heading">
                    <h1 className='dashborad-main-heading'>Registration</h1>
                    <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                    <h3 className="dashborad-second-heading">Club</h3>
                </div>
                <form className="form-table" onSubmit={handleFormSubmit}>
                    <div className="same-line">
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">Club/Bar Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={form.name} onChange={handleChange} placeholder="Enter the Club/Bar Name"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="contactPerson">Contact Person Name</label>
                            <input type="text" className="form-control" id="contactPerson" name="contactPerson" value={form.contactPerson} onChange={handleChange} placeholder="Enter Contact Person Name"/>
                        </div>
                    </div>
                    <div className="same-line">
                        {/* <div className="form-group">
                            <label className="form-label" htmlFor="city">Club/Bar City</label>
                            <input type="text" className="form-control" id="city" name="city" value={form.city} onChange={handleChange} placeholder="Enter the Club/Bar Location City"/>
                        </div> */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="city">Club/Bar City</label>
                            <select 
                                className="form-control"
                                id="city"
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                placeholder="Select a Service">
                                    <option value="">Select the City</option>
                                    {dubaiCities.map((ele) => {
                                        return (
                                            <option key={ele} value={ele}>{ele}</option>
                                        )
                                        
                                    })}
                            </select>
                        </div>
                        {/* <div className="form-group">
                            <label className="form-label" htmlFor="category">Category</label>
                            <select 
                                className="form-control"
                                id="category"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                placeholder="Select a Service">
                                    <option value="">Select the Category</option>
                                    <option value="Club">Club</option>
                                    <option value="Bar">Bar</option>
                            </select>
                        </div> */}
                    </div>
                    <div className="same-line">
                        <div className="form-group">
                            <label className="form-label" htmlFor="slogan">Club/Bar Slogan</label>
                            <input type="text" className="form-control" id="slogan" name="slogan" value={form.slogan} onChange={handleChange} placeholder="Enter the Club/Bar Slogan"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="image">Club/Bar Image</label>
                            <input type="file" className="form-control" id="image" name="image" onChange={handleImageChange} placeholder="Enter the Club/Bar Image"/>
                        </div>
                    </div>
                    <div className="same-line">
                        <div className="form-group">
                            <label className="form-label" htmlFor="emailAddress">Email Address</label>
                            <input type="text" className="form-control" id="emailAddress" name="emailAddress" value={form.emailAddress} onChange={handleChange} placeholder="Enter the Email Address"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="phoneNo">Phone Number</label>
                            {/* <input type="text" className="form-control" id="phoneNumber" placeholder="Enter the Phone Number"/> */}
                            <PhoneInput
                                inputStyle={{ border: "none", outline: "none", height: "16px", marginLeft: "30px" }}
                                containerStyle={{ display: "flex", alignItems: "center" }}
                                inputProps={{ style: { flex: "1s", border: "none", fontSize: 14, boxShadow: "none", background: "transparent", height: "16px", marginLeft: "30px" } }}
                                buttonStyle={{ border: "none", boxShadow: "none", outline: "none", background: "none" }}
                                className="form-control"
                                placeholder="Enter Your Mobile"
                                name="phoneNo"
                                id="phoneNo"
                                country={"ae"}
                                value={form.phoneNo}
                                onChange={handlePhoneChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="same-line">
                    <div className="form-group">
                        <label className="form-label" htmlFor="webSite">Website Link</label>
                        <input type="text" className="form-control" id="webSite" name="webSite" value={form.webSite} onChange={handleChange} placeholder="Enter the Website Link"/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="experience">Experience Years</label>
                        <input type="text" className="form-control" id="experience" name="experience" value={form.experience} onChange={handleChange} placeholder="Enter the No.of years of experience"/>
                    </div>
                    </div>
                    <div className="same-line">
                        <div className="form-group">
                            <label className="form-label" htmlFor="address">Address</label>
                            <input type="text" className="form-control" id="address" name="address" value={form.address} onChange={handleChange} placeholder="Enter the Address"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="geoLocation">Geo Location</label>
                            <input type="text" className="form-control" id="geoLocation" name="geoLocation" value={form.geoLocation} onChange={handleChange} placeholder="Enter the Geo Location"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="introductionObjtv">Club Introduction</label>
                        <textarea type="text" className="form-control" id="introductionObjtv" name="introductionObjtv" value={form.introductionObjtv} onChange={handleChange} placeholder="Description about the Club"/>
                    </div>

                    <div className="form-group">
                        <label className="form-label-head" htmlFor="city">Services</label>
                        {selectedServices.map((service) => renderInputField(service))}
                        <div className="same-line">
                            <label className="form-label" htmlFor="city">Add a new Service</label>
                            <select 
                                className="form-control"
                                id={selectedServices}
                                value={selectedServices}
                                onChange={handleSelectServiceChange}
                                placeholder="No. of pool & snooker tables">
                                {availableServices.length === 0 ? <option value="">All Selected</option> : <option value="">Select a Service</option>}
                                {availableServices.map((service) => (
                                    <option key={service} value={service}>
                                        {service}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label-head" htmlFor="city">Food and Drinks Service</label>
                        {selectedFoodServices.map((service) => renderFoodInputField(service))}
                        <div className="same-line">
                            <label className="form-label" htmlFor="city">Add a Food Service</label>
                            <select 
                                className="form-control"
                                id={selectedFoodServices}
                                value={selectedFoodServices}
                                onChange={handleSelectFoodServiceChange}
                                placeholder="Select a Service">
                                {availableFoodServices.length === 0 ? <option value="">All Selected</option> : <option value="">Select a Service</option>}
                                {availableFoodServices.map((service) => {
                                    return (
                                        <option key={service} value={service}>
                                            {service}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label-head" htmlFor="city">Working Hours</label>
                        <div className="same-line-openclose">
                            <div className="same-line">
                                <label className="form-label" htmlFor="openTime">Open</label>
                                <input type="time" className="form-control" id="openTime" name="openTime" value={form.openTime} onChange={handleChange} placeholder="Open"/>
                            </div>
                            <div className="same-line">
                                <label className="form-label" htmlFor="city">Close</label>
                                <input type="time" className="form-control" id="closeTime" name="closeTime" value={form.closeTime} onChange={handleChange} placeholder="Close"/>
                            </div>
                        </div>
                        <div className="same-line-openclose">
                            <div className="same-line">
                                <label className="form-label" htmlFor="happyHrRates">Happy hour rate</label>
                                <input type="number" className="form-control" id="happyHrRates" name="happyHrRates" value={form.happyHrRates} onChange={handleChange} placeholder="Happy hour rate"/>
                            </div>
                            <div className="same-line">
                                <label className="form-label" htmlFor="normalHrRates">Regular hour rate</label>
                                <input type="number" className="form-control" id="normalHrRates" name="normalHrRates" value={form.normalHrRates} onChange={handleChange} placeholder="Regular hour rate"/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="description">Why "Your Club name here"</label>
                        <textarea type="text" className="form-control" id="description" name="description" value={form.description} onChange={handleChange} placeholder={`Brief description on why your club is better and the services and ambiance is of better convenience.\nThe future programs and services.`}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="history">History of the Club</label>
                        <textarea type="text" className="form-control" d="history" name="history" value={form.history} onChange={handleChange} placeholder="When it opened first. How it was back then. What programs were organized?"/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="youtubevideo">Youtube Video Link</label>
                        <input type="text" className="form-control" id="youtubevideo" name="youtubevideo" value={form.youtubevideo} onChange={handleChange} placeholder="Upload your Youtube video Link"/>
                    </div>
                    <label className="form-label-head" htmlFor="clubBarNumber">Social Media Links</label>
                    <div className="same-line">
                        {form.socialMedialinks.map((platform) => (
                            <div className="form-group" key={platform.name}>
                                <label className="form-label" htmlFor={platform.name.toLowerCase()}>{platform.name}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={platform.name.toLowerCase()}
                                    value={platform.link}
                                    onChange={(e) => handleSocialMediaChange(platform.name, e.target.value)}
                                    placeholder={`Enter the ${platform.name} Profile link`}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="clubBarNumber">Club/Bar Gallary(Upload atleast 3 images)</label>
                        <input 
                            type="file"
                            id="clubBarGallery" 
                            placeholder="Upload Images" 
                            multiple
                            accept="image/*"
                            onChange={handleGalleryChange}
                            className="form-control"/>
                    </div>
                    {form.pictureGallery && (
                        <ul className="upload-gallery">
                            {form.pictureGallery.map((image, index) => (
                                <li key={index}>
                                    {image.title}
                                    <IoClose className="close-icon" onClick={() => handleRemoveImage(index)} />
                                </li>
                            ))}
                        </ul>
                    )}
                    <button className="save-btn" type="submit">Register</button>
                </form>
            </div>
            <p className="login-link">Already Registered? <a href="/register">Login</a></p>
        </div>
    )
}