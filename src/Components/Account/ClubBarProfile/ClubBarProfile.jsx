import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import PhoneInput from "react-phone-input-2"
import 'react-phone-input-2/lib/style.css'

import "./ClubBarProfile.scss"
import { IoClose } from "react-icons/io5";

// import { RiBilliardsFill, RiDrinksFill, RiInstagramFill } from "react-icons/ri";
// import { PiSeatFill } from "react-icons/pi";
// import { GiTeacher, GiPoolTableCorner, GiPoolTriangle, GiAges } from "react-icons/gi";
// import { MdEmojiEvents } from "react-icons/md";
// import { FaMoneyBill, FaFacebook } from "react-icons/fa";

// import { IoFastFood } from "react-icons/io5";
// import { BiSolidDrink } from "react-icons/bi";
// import { LuDessert } from "react-icons/lu";
import { dubaiCities } from "../../../DataSet/dubaiCities";
import { useAuth } from "../../../Context/AuthContext";

export default function ClubBarProfile() {
    const { user } = useAuth()
    const clubAndBar = useSelector((state) => {
        return state.clubsAndBars.data.find(ele => ele.createdBy === "6206d7c787dcc314e8bbe496")
    });

    console.log(clubAndBar.services)

    const [ form, setForm ] = useState(clubAndBar ? {
        name: clubAndBar.name,
        contactPerson: clubAndBar.contactPerson,
        category: clubAndBar.category,
        city: clubAndBar.city,
        slogan: clubAndBar.slogan,
        image: clubAndBar.image,
        emailAddress: clubAndBar.emailAddress,
        phoneNo: clubAndBar.phoneNo,
        webSite: clubAndBar.webSite,
        experience: clubAndBar.experience,
        address: clubAndBar.address,
        geoLocation: clubAndBar.geoLocation,
        introductionObjtv: clubAndBar.introductionObjtv,
        openTime: clubAndBar.openTime,
        closeTime: clubAndBar.closeTime,
        happyHrRates: clubAndBar.happyHrRates,
        normalHrRates: clubAndBar.normalHrRates,
        description: clubAndBar.description,
        history: clubAndBar.history,
        youtubevideo: clubAndBar.youtubevideo,
        pictureGallery: clubAndBar.pictureGallery,
        socialMedialinks: clubAndBar.socialMedialinks,
        services: clubAndBar.services,
    } : { 
        name: "",
        contactPerson: "",
        category: "",
        city: "",
        slogan: "",
        image: "",
        emailAddress: "",
        phoneNo: "",
        webSite: "",
        experience: "",
        address: "",
        geoLocation: "",
        introductionObjtv: "",
        openTime: "",
        closeTime: "",
        happyHrRates: "",
        normalHrRates: "",
        description: "",
        history: "",
        youtubevideo: "",
        pictureGallery: [],
        socialMedialinks: [
            { name: "Facebook", icon: "<FaFacebook />", link: "" },
            { name: "Instagram", icon: "<RiInstagramFill />", link: "" },
        ],
        services: []
    })

    const [formErrors, setFormErrors] = useState("")
    const [serverErrors, setServerErrors] = useState("")

    const errors = {}

    const validateErrors = () => {
        if(form?.name?.trim()?.length === 0){
            errors.name = "Name is Required"
        }
        if(form?.contactPerson?.trim()?.length === 0){
            errors.contactPerson = "Contact Person is Required"
        }
        if(form?.city?.trim()?.length === 0){
            errors.city = "City is Required"
        }
        if(form?.category?.trim()?.length === 0){
            errors.category = "Category is Required"
        }
        if(form?.slogan?.trim()?.length === 0){
            errors.slogan = `${form.category ? form.category : "Club/Bar"} Slogan is Required`
        }
        if(form?.image?.trim()?.length === 0){
            errors.image = "Image is Required"
        }
        if(form?.emailAddress?.trim()?.length === 0){
            errors.emailAddress = "Email Address is Required"
        }
        if(form?.phoneNo?.trim()?.length === 0){
            errors.phoneNo = "Phone Number is Required"
        }
        if(form?.webSite?.trim()?.length === 0){
            errors.webSite = "Web Site is Required"
        }
        if(String(form?.experience)?.trim()?.length === 0){
            errors.experience = "Experience is Required"
        }
        if(form?.address?.trim()?.length === 0){
            errors.address = "Address is Required"
        }
        if(form?.geoLocation?.length === 0){
            errors.geoLocation = "Geo Location is Required"
        }
        if(form?.introductionObjtv?.trim()?.length === 0){
            errors.introductionObjtv = "Introduction & Objectives are Required"
        }
        if(form?.openTime?.trim()?.length === 0){
            errors.openTime = "Opening Time is Required"
        }
        if(form?.closeTime?.trim()?.length === 0){
            errors.closeTime = "Closing Time is Required"
        }
        if(String(form?.happyHrRates)?.trim()?.length === 0){
            errors.happyHrRates = "Happy Hour Rates are Required"
        }
        if(String(form?.normalHrRates)?.trim()?.length === 0){
            errors.normalHrRates = "Normal Hour Rates are Required"
        }
        if(form?.description?.trim()?.length === 0){
            errors.description = "Description is Required"
        }
        if(form?.history?.trim()?.length === 0){
            errors.history = "History is Required"
        }
        if(form?.youtubevideo?.trim()?.length === 0){
            errors.youtubevideo = "YouTube Video Link is Required"
        }
        if(form?.pictureGallery?.length < 3){
            if(form?.pictureGallery?.length === 0){
                errors.pictureGallery = "Picture Gallery is Required"
            } else {
                errors.pictureGallery = "Minimum 3 Picture for Gallery is Required"
            }
        }
        if(form?.socialMedialinks && form?.socialMedialinks[0]?.link?.trim()?.length === 0){
            errors.facebook = "Facebook Link is Required"
        }
        if(form?.socialMedialinks && form?.socialMedialinks[1]?.link?.trim()?.length === 0){
            errors.instagram = "instagram Link is Required"
        }
        if(form?.services?.length === 0){
            errors.services = "Services are Required"
        }
    }
    validateErrors()

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

    const clubServices = clubAndBar.services
    .filter(service => availableServices.some(ele => service.name.includes(ele)))
    .map(service => service.name);

    const clubFoodServices = clubAndBar.services
    .filter(service => availableFoodServices.some(ele => service.name.includes(ele)))
    .map(service => service.name);

    useEffect(() => {
        if (form.services.length > 0) {
            setAvailableServices(prevServices =>
                prevServices.filter(service =>
                    !form.services.some(existingService => existingService.name === service)
                )
            );
    
            setAvailableFoodServices(prevFoodServices =>
                prevFoodServices.filter(foodService =>
                    !form.services.some(existingService => existingService.name === foodService)
                )
            );
        }
    }, [form.services]); // Run whenever `form.services` changes
    

    console.log("availableServices", availableServices)

    console.log("clubServices", clubServices, "clubFoodServices",clubFoodServices)

    const [selectedServices, setSelectedServices] = useState(clubAndBar.services ? clubServices : form.services);
    const [selectedFoodServices, setSelectedFoodServices] = useState(clubAndBar.services ? clubFoodServices : form.services);

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

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     setForm({ ...form, image: URL.createObjectURL(file) });
    // }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const uploadPath = `../../../Assets/Uploads/${file.name}`; // Path to "reserved folder"
            const reader = new FileReader();
            reader.onload = () => {
                // Save the uploaded image path to your form state
                setForm((prev) => ({ ...prev, image: uploadPath }));
            };
            reader.readAsDataURL(file); // This converts the file to a Base64 URL, for preview purposes if needed
        }
    };
    
    
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
        setSelectedServices(prevServices =>
            prevServices.filter(item => item !== service)
        );
    
        setAvailableServices(prevServices => [...prevServices, service]);
    
        setForm(prevForm => ({
            ...prevForm,
            services: prevForm.services.filter(item => item.name !== service),
        }));
    };
    
    const handleRemoveFoodService = (service) => {
        setSelectedFoodServices(prevServices =>
            prevServices.filter(item => item !== service)
        );
    
        setAvailableFoodServices(prevServices => [...prevServices, service]);
    
        setForm(prevForm => ({
            ...prevForm,
            services: prevForm.services.filter(item => item.name !== service),
        }));
    };
    

    const renderInputField = (service) => {
        switch (service) {
            case "No. of pool & snooker tables":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="poolTables">No. of pool & snooker tables</label>
                    <input type="number" className="form-control" 
                        value={ form.services.find(ele => ele.name === service)?.description || "" }
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
                        value={ form.services.find(ele => ele.name === service)?.description || "" } 
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
                        value={ form.services.find(ele => ele.name === service)?.description || "" } 
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
                        value={ form.services.find(ele => ele.name === service)?.description || "" }
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
                        value={ form.services.find(ele => ele.name === service)?.description || "" }
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
                        value={ form.services.find(ele => ele.name === service)?.description || "" }
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
                        value={ form.services.find(ele => ele.name === service)?.description || "" }
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
                        value={ form.services.find(ele => ele.name === service)?.description || "" }
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
                        value={ form.services.find(ele => ele.name === service)?.description || "" }
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
                        value={ form.services.find(ele => ele.name === service)?.description || "" }
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
                        value={ form.services.find(ele => ele.name === service)?.description || "" }
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
                        value={ form.services.find(ele => ele.name === service)?.description || "" }
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

    const handleClearForm = () => {
        setForm({ 
            name: "",
            contactPerson: "",
            category: "",
            city: "",
            slogan: "",
            image: "",
            emailAddress: "",
            phoneNo: "",
            webSite: "",
            experience: "",
            address: "",
            geoLocation: "",
            introductionObjtv: "",
            openTime: "",
            closeTime: "",
            happyHrRates: "",
            normalHrRates: "",
            description: "",
            history: "",
            youtubevideo: "",
            pictureGallery: [],
            socialMedialinks: [
                { name: "Facebook", icon: "<FaFacebook />", link: "" },
                { name: "Instagram", icon: "<RiInstagramFill />", link: "" },
            ],
            services: []
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        console.log(form)
        const formData = form
        if(Object.keys(errors).length === 0) {
            try {
                const response = await axios.post("http://103.134.237.3:3001/v1/club/create-club", formData, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                console.log(response)
                setForm({
                    name: "",
                    category: "",
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
            } catch (error) {
                console.log(error)
                alert(error.message)
            }
        } else {
            setFormErrors(errors)
        }
        
    }
    
    return (
        <div className="clubBar-profile-container">
            <div className="clubBar-profile-section">
                <div className="dashborad-heading">
                    <h1 className='dashborad-main-heading'>{clubAndBar ? "Update Profile" : "Create a New Profile"}</h1>
                    <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                    <h3 className="dashborad-second-heading">Club</h3>
                </div>
                <form className="form-table" onSubmit={handleFormSubmit}>
                    <div className="same-line">
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">{form.category ? form.category : "Club/Bar"} Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={form.name} onChange={handleChange} placeholder={`Enter the ${form.category ? form.category : "Club/Bar"} Name`}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="contactPerson">Contact Person Name</label>
                            <input type="text" className="form-control" id="contactPerson" name="contactPerson" value={form.contactPerson} onChange={handleChange} placeholder="Enter Contact Person Name"/>
                        </div>
                    </div>
                    {(formErrors.name || formErrors.contactPerson) && (
                    <div className="same-line">
                        {formErrors.name && <div className="alert alert-danger">{formErrors.name}</div>}
                        {formErrors.contactPerson && <div className="alert alert-danger">{formErrors.contactPerson}</div>}
                    </div>
                    )}
                    <div className="same-line">
                        <div className="form-group">
                            <label className="form-label" htmlFor="city">{form.category ? form.category : "Club/Bar"} City</label>
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
                        <div className="form-group">
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
                        </div>
                    </div>
                    {(formErrors.city || formErrors.category) && (
                        <div className="same-line">
                            {formErrors.city && <div className="alert alert-danger">{formErrors.city}</div>}
                            {formErrors.category && <div className="alert alert-danger">{formErrors.category}</div>}
                        </div>
                    )}
                    <div className="same-line">
                        <div className="form-group">
                            <label className="form-label" htmlFor="slogan">{form.category ? form.category : "Club/Bar"} Slogan</label>
                            <input type="text" className="form-control" id="slogan" name="slogan" value={form.slogan} onChange={handleChange} placeholder={`Enter the ${form.category ? form.category : "Club/Bar"} Slogan`}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="image">{form.category ? form.category : "Club/Bar"} Image</label>
                            <input type="file" className="form-control" id="image" name="image" onChange={handleImageChange} placeholder={`Enter the ${form.category ? form.category : "Club/Bar"} Image`}/>
                        </div>
                    </div>
                    {(formErrors.slogan || formErrors.image) && (
                        <div className="same-line">
                            {formErrors.slogan && <div className="alert alert-danger">{formErrors.slogan}</div>}
                            {formErrors.image && <div className="alert alert-danger">{formErrors.image}</div>}
                        </div>
                    )}
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
                    {(formErrors.emailAddress || formErrors.phoneNo) && (
                        <div className="same-line">
                            {formErrors.emailAddress && <div className="alert alert-danger">{formErrors.emailAddress}</div>}
                            {formErrors.phoneNo && <div className="alert alert-danger">{formErrors.phoneNo}</div>}
                        </div>
                    )}
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
                    {(formErrors.webSite || formErrors.experience) && (
                        <div className="same-line">
                            {formErrors.webSite && <div className="alert alert-danger">{formErrors.webSite}</div>}
                            {formErrors.experience && <div className="alert alert-danger">{formErrors.experience}</div>}
                        </div>
                    )}
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
                    {(formErrors.address || formErrors.geoLocation) && (
                        <div className="same-line">
                            {formErrors.address && <div className="alert alert-danger">{formErrors.address}</div>}
                            {formErrors.geoLocation && <div className="alert alert-danger">{formErrors.geoLocation}</div>}
                        </div>
                    )}
                    <div className="form-group">
                        <label className="form-label" htmlFor="introductionObjtv">{form.category ? form.category : "Club/Bar"} Introduction</label>
                        <textarea type="text" className="form-control" id="introductionObjtv" name="introductionObjtv" value={form.introductionObjtv} onChange={handleChange} placeholder="Description about the Club"/>
                    </div>
                    {formErrors.introductionObjtv &&
                        <div className="same-line">
                            {formErrors.introductionObjtv && <div className="alert alert-danger">{formErrors.introductionObjtv}</div>}
                        </div>
                    }
                    <div className="form-group">
                        <label className="form-label-head" htmlFor="city">Services</label>
                        {selectedServices.map((service) => renderInputField(service))}
                        <div className="same-line">
                            <label className="form-label" htmlFor="city">Add a new Service</label>
                            <select 
                                className="form-control"
                                id={selectedServices}
                                // value={selectedServices}
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
                                // value={selectedFoodServices}
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
                    {formErrors.service && (
                        <div className="same-line">
                            {formErrors.service && <div className="alert alert-danger">{formErrors.service}</div>}
                        </div>
                    )}
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
                        {(formErrors.openTime || formErrors.closeTime) && (
                            <div className="same-line">
                                {formErrors.openTime && <div className="alert">{formErrors.openTime}</div>}
                                {formErrors.closeTime && <div className="alert">{formErrors.closeTime}</div>}
                            </div>
                        )}
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
                        {(formErrors.happyHrRates || formErrors.normalHrRates) && (
                            <div className="same-line">
                                {formErrors.happyHrRates && <div className="alert">{formErrors.happyHrRates}</div>}
                                {formErrors.normalHrRates && <div className="alert">{formErrors.normalHrRates}</div>}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="description">Why "Your Club name here"</label>
                        <textarea type="text" className="form-control" id="description" name="description" value={form.description} onChange={handleChange} placeholder={`Brief description on why your club is better and the services and ambiance is of better convenience.\nThe future programs and services.`}/>
                    </div>
                    {(formErrors.description) && (
                        <div className="same-line">
                            {formErrors.description && <div className="alert">{formErrors.description}</div>}
                        </div>
                    )}
                    <div className="form-group">
                        <label className="form-label" htmlFor="history">History of the Club</label>
                        <textarea type="text" className="form-control" d="history" name="history" value={form.history} onChange={handleChange} placeholder="When it opened first. How it was back then. What programs were organized?"/>
                    </div>
                    {(formErrors.history) && (
                        <div className="same-line">
                            {formErrors.history && <div className="alert">{formErrors.history}</div>}
                        </div>
                    )}
                    <div className="form-group">
                        <label className="form-label" htmlFor="youtubevideo">Youtube Video Link</label>
                        <input type="text" className="form-control" id="youtubevideo" name="youtubevideo" value={form.youtubevideo} onChange={handleChange} placeholder="Upload your Youtube video Link"/>
                    </div>
                    {(formErrors.youtubevideo) && (
                        <div className="same-line">
                            {formErrors.youtubevideo && <div className="alert">{formErrors.youtubevideo}</div>}
                        </div>
                    )}
                    <label className="form-label-head" htmlFor="clubBarNumber">Social Media Links</label>
                    <div className="same-line">
                        {form?.socialMedialinks?.map((platform) => (
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
                    {(formErrors.facebook || formErrors.instagram) && (
                        <div className="same-line">
                            {formErrors.facebook && <div className="alert">{formErrors.facebook}</div>}
                            {formErrors.instagram && <div className="alert">{formErrors.instagram}</div>}
                        </div>
                    )}
                    <div className="form-group">
                        <label className="form-label" htmlFor="clubBarNumber">{form.category ? form.category : "Club/Bar"} Gallary(Upload atleast 3 images)</label>
                        <input 
                            type="file"
                            id="clubBarGallery" 
                            placeholder="Upload Images" 
                            multiple
                            accept="image/*"
                            onChange={handleGalleryChange}
                            className="form-control"/>
                    </div>
                    {(formErrors.pictureGallery) && (
                        <div className="same-line">
                            {formErrors.pictureGallery && <div className="alert">{formErrors.pictureGallery}</div>}
                        </div>
                    )}
                    {form.pictureGallery && (
                        <ul className="upload-gallery">
                            {form?.pictureGallery?.map((image, index) => (
                                <li key={index}>
                                    {image.title}
                                    <IoClose className="close-icon" onClick={() => handleRemoveImage(index)} />
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="btn-div">
                        <button className="save-btn" type="submit">{clubAndBar ? "Save" : "Register"}</button>
                        <div onClick={handleClearForm} className="save-btn clear">Clear</div>
                    </div>
                </form>
            </div>
        </div>
    )
}