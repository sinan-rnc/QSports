import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { dubaiCities } from "../../../../DataSet/dubaiCities";
import { useAuth } from "../../../../Context/AuthContext";
import { startCreateClub, startUpdateClub } from "../../../../Actions/clubsAndBarsActions";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { FaSearchLocation } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { CgRemove } from "react-icons/cg";
import { MdRemoveCircle } from "react-icons/md";

export default function ClubBarProfile() {
    const { user, setSelectedDashboard } = useAuth()
    const dispatch = useDispatch()
    const { alertMessage, setAlertMessage, setAlertMessageColor } = useAuth()
    const [ isLoading, setIsLoading ] = useState(false)
    const [isPolicyChecked, setIsPolicyChecked] = useState(false);

    const clubAndBar = useSelector((state) => {
        return state.clubsAndBars.data.find(ele =>!ele?.isDeleted && ele?.createdBy === user?._id)
    });

    useEffect(() => {
        if(clubAndBar) {
            setIsPolicyChecked(true)
        }
    }, [clubAndBar])

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const response = await axios.post(`${backendApi}/club/read-club`, { _id: eventData?.ClubID })
    //             console.log(response.data.data)
    //         } catch(err) {
    //             console.log(err);
    //             alert(err.response.data.message)
    //         }
    //     }) ()
    // }, [eventData])

    // console.log("user", user)
    // console.log("ClubandBar", clubAndBar)

    const [form, setForm] = useState(clubAndBar ? {
        name: clubAndBar.name || "",
        contactPerson: clubAndBar.contactPerson || "",
        clubType: clubAndBar.clubType || "",
        city: clubAndBar.city || "",
        slogan: clubAndBar.slogan || "",
        image: clubAndBar.image || "",
        emailAddress: clubAndBar.emailAddress || "",
        phoneNo: clubAndBar.phoneNo || "",
        landLineNo: clubAndBar.landLineNo || "",
        webSite: clubAndBar.webSite || "",
        experience: clubAndBar.experience || "",
        address: clubAndBar.address || "",
        latitude: clubAndBar.geoLocation?.coordinates[1] || "",
        longitude: clubAndBar.geoLocation?.coordinates[0] || "",
        introductionObjtv: clubAndBar.introductionObjtv || "",
        openTime: clubAndBar?.openTime || "",
        closeTime: clubAndBar?.closeTime || "",
        happyHrRates: clubAndBar.happyHrRates || "",
        normalHrRates: clubAndBar.normalHrRates || "",
        startTime: clubAndBar.startTime || "",
        endTime: clubAndBar.endTime || "",
        description: clubAndBar.description || "",
        history: clubAndBar.history || "",
        youtubevideo: clubAndBar.youtubevideo || "",
        pictureGallery: clubAndBar.pictureGallery || [],
        socialMedialinks: clubAndBar.socialMedialinks || [
            { name: "Facebook", link: "", icon: "<FaFacebook />" },
            { name: "Instagram", link: "", icon: "<AiFillInstagram />" },
            { name: "Tiktok", link: "", icon: "<FaTiktok />" },
        ],
        services: clubAndBar.services || []
    } : { 
        name: "",
        contactPerson: "",
        clubType: "",
        city: "",
        slogan: "",
        image: "",
        emailAddress: "",
        phoneNo: "",
        landLineNo: "",
        webSite: "",
        experience: "",
        address: "",
        latitude: "",
        longitude: "",
        introductionObjtv: "",
        openTime: "",
        closeTime: "",
        happyHrRates: "",
        normalHrRates: "",
        startTime: "",
        endTime: "",
        description: "",
        history: "",
        youtubevideo: "",
        pictureGallery: [],
        socialMedialinks: [
            { name: "Facebook", link: "", icon: "<FaFacebook />" },
            { name: "Instagram", link: "", icon: "<AiFillInstagram />" },
            { name: "Tiktok", link: "", icon: "<FaTiktok />" },
        ],
        services: []
    });
    

    // console.log(form)

    const [locationType, setlocationType] = useState()

    // console.log(form.longitude)
    // console.log(form.latitude)
    
    // console.log(form.pictureGallery)

    const [formErrors, setFormErrors] = useState("")
    const [serverErrors, setServerErrors] = useState("")

    const errors = {}

    function convertTo24HourFormat(time12h) {
        const [time, modifier] = time12h.split(" ");
        let [hours, minutes] = time.split(":");
    
        if (modifier === "PM" && hours !== "12") {
            hours = String(parseInt(hours, 10) + 12);
        }
        if (modifier === "AM" && hours === "12") {
            hours = "00";
        }
    
        return `${hours}:${minutes}`;
    }
    

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
        if(form?.clubType?.trim()?.length === 0){
            errors.clubType = "clubType is Required"
        }
        if(form?.emailAddress?.trim()?.length === 0){
            errors.emailAddress = "Email Address is Required"
        }
        if(form?.phoneNo?.trim()?.length === 0){
            errors.phoneNo = "Phone Number is Required"
        }
        // if(form?.socialMedialinks.length === 0){
        //     errors.socialMedialinks = "Phone Number is Required"
        // }
        if(!form?.longitude || !form?.latitude){
            errors.location = "Latitude and Longitude is Required"
        }
    }
    validateErrors()

    const [availableServices, setAvailableServices] = useState([
        "No. of Pool Tables",
        "No. of Snooker Tables",
        "Ages allowed in the club",
        "Clubs space and seating space",
        "Pool Coaching",
        "Pool & Billiard Products",
        "Table models & sizes",
        "Pool Competitions & Events",
        "Billiard Balls and Club Size",
    ]);

    const [availableFoodServices, setAvailableFoodServices] = useState([
        "Food",
        "Drinks",
        "Coffees",
        "Desserts",
    ])

    const clubServices = clubAndBar?.services
    .filter(service => availableServices.some(ele => service.name.includes(ele)))
    .map(service => service.name);

    const clubFoodServices = clubAndBar?.services
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
    
    useEffect(() => {
        if(form.latitude || form.longitude){
            setIsLoading(false)
        }
    }, [form.latitude, form.longitude])

    useEffect(() => {
        if (form.latitude && form.longitude) {
            setlocationType("LatAndLong")
        }
    }, [form.latitude, form.longitude])

    // console.log("availableServices", availableServices)

    // console.log("clubServices", clubServices, "clubFoodServices",clubFoodServices)

    const [selectedServices, setSelectedServices] = useState(clubAndBar?.services ? clubServices : form.services);
    const [selectedFoodServices, setSelectedFoodServices] = useState(clubAndBar?.services ? clubFoodServices : form.services);

    const iconsMap = {
        "No. of Pool Tables": "<GiPoolTableCorner />",
        "No. of Snooker Tables": "<GiPoolTableCorner />",
        "Ages allowed in the club": "<GiAges />",
        "Clubs space and seating space": "<PiSeatFill />",
        "Pool Coaching": "<GiTeacher />",
        "Pool & Billiard Products": "<GiPoolTriangle />",
        "Table models & sizes": "<FaMoneyBill />",
        "Pool Competitions & Events": "<MdEmojiEvents />",
        "Billiard Balls and Club Size": "<RiBilliardsFill />",
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

    // Update the state handling function
    const handleSocialMediaChange = (platform, value) => {
        setForm((prevForm) => {
            const updatedLinks = [...(prevForm.socialMedialinks || [])];
            
            // Find the index of the platform if it already exists
            const index = updatedLinks.findIndex(link => link.name === platform);
    
            if (value === "") {
                // Remove the entry if the input is cleared
                if (index !== -1) updatedLinks.splice(index, 1);
            } else if (index !== -1) {
                // Update the existing entry
                updatedLinks[index].link = value;
            } else {
                // Add a new entry if it doesn't exist
                updatedLinks.push({ name: platform, icon: "icon", link: value });
            }
    
            return { ...prevForm, socialMedialinks: updatedLinks };
        });
    };
    

    const handleImageChange = (e) => {
        // const file = e.target.files[0];
        // setForm({ ...form, image: URL.createObjectURL(file) });
        setForm({...form, image: e.target.files[0] });
        // console.log(form.image)
    }

    const handleRemoveImage = () => {
        setForm({ ...form, image: ""});
    }

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const uploadPath = `../../../Assets/Uploads/${file.name}`; // Path to "reserved folder"
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             // Save the uploaded image path to your form state
    //             setForm((prev) => ({ ...prev, image: uploadPath }));
    //         };
    //         reader.readAsDataURL(file); // This converts the file to a Base64 URL, for preview purposes if needed
    //     }
    // };
    
    // const handleGalleryChange = (e) => {
    //     const files = Array.from(e.target.files);
    
    //     setForm((prevForm) => {
    //         // Get existing images from previous state and concatenate new ones
    //         const updatedGallery = [...prevForm.pictureGallery, ...files];
    
    //         return {
    //             ...prevForm,
    //             pictureGallery: updatedGallery.filter(
    //                 (file, index, self) => self.findIndex(img => img.name === file.name) === index
    //             ), // Remove duplicates
    //         };
    //     });
    //     // form.updatedGallery
    
    //     e.target.value = ""; // Reset input
    // };

    // const handleGalleryChange = (e) => {
    //     const files = Array.from(e.target.files); // Get the selected files
    
    //     if (files.length > 0) {
    //         setForm((prevForm) => {
    //             // Combine existing images with new ones, while ensuring no duplicates
    //             const updatedGallery = [
    //                 ...prevForm.pictureGallery,
    //                 ...files.filter(file => 
    //                     !prevForm.pictureGallery.some(existingFile => existingFile.name === file.name)
    //                 ),
    //             ];
    
    //             // Ensure the gallery doesn't exceed 5 images
    //             const limitedGallery = updatedGallery.slice(0, 5);
    
    //             return {
    //                 ...prevForm,
    //                 pictureGallery: limitedGallery,
    //             };
    //         });
    //     }
    
    //     e.target.value = ""; // Reset input
    // };
    
    
    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files); // Get the selected files
    
        if (files.length > 0) {
            setForm((prevForm) => {
                // Combine existing images with new ones, while ensuring no duplicates
                const updatedGallery = [
                    ...prevForm.pictureGallery,
                    ...files.filter(file => 
                        !prevForm.pictureGallery.some(existingFile => existingFile.name === file.name)
                    ),
                ];
    
                // Ensure the gallery doesn't exceed 5 images
                const limitedGallery = updatedGallery.slice(0, 5);
    
                return {
                    ...prevForm,
                    pictureGallery: limitedGallery,
                };
            });
        }
    
        e.target.value = ""; // Reset input
    };
    

    // const handleRemoveGalleryImage = () => {
    //     setForm({...form, pictureGallery: []});
    //     // console.log(form.pictureGallery)
    // };

    const handleRemoveGalleryImage = (imageName) => {
        setForm((prevForm) => ({
            ...prevForm,
            pictureGallery: prevForm.pictureGallery.filter(image => image.name !== imageName),
        }));
    };    
    

    const handleGeoLocationChange = () => {
        if (navigator.geolocation) {
            setIsLoading(true)
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setForm((prevForm) => ({
                        ...prevForm,
                        latitude: latitude,
                        longitude: longitude,
                    }));
                    // console.log("Updated Form:", { latitude: latitude, longitude: longitude });
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("Failed to get location. Please enable location services.");
                }
            );
        } else {
            setAlertMessage("Geolocation is not supported by your browser");
            setAlertMessageColor("red")
        }
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
                    icon: iconsMap[selectedValue] || "", 
                    description: "", 
                    descriptionWord: "" // Ensure descriptionWord is initialized
                },
            ],
        }));
    
        e.target.value = ""; 
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
    const handleServiceDescriptionWordChange = (serviceName, value) => {
        setForm((prevForm) => ({
            ...prevForm,
            services: prevForm.services.map((service) =>
                service.name === serviceName
                    ? { ...service, descriptionWord: value }
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
            case "No. of Pool Tables":
                return (
                <div className="same-line mobile" key={service}>
                    <label className="form-label" htmlFor="P">No. of Pool Tables</label>
                    <div className="service-div">
                    <input type="number" className="form-control" 
                        value={ form.services.find(ele => ele.name === service)?.description || "" }
                        onChange={(e) =>
                            handleServiceDescriptionChange(service, e.target.value)
                        }
                        id="poolTables" placeholder="No. of Pool Tables" />
                    <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                    </div>
                </div>
                );
            case "No. of Snooker Tables":
                return (
                <div className="same-line mobile" key={service}>
                    <label className="form-label" htmlFor="tables">No. of Snooker Tables</label>
                    <div className="service-div">
                    <input type="number" className="form-control" 
                        value={ form.services.find(ele => ele.name === service)?.description || "" }
                        onChange={(e) =>
                            handleServiceDescriptionChange(service, e.target.value)
                        }
                        id="poolTables" placeholder="No. of Snooker Tables" />
                    <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                    </div>
                </div>
                );
            case "Ages allowed in the club":
                return (
                <div className="same-line mobile" key={service}>
                    <label className="form-label" htmlFor="agesAllowed">Ages allowed in the club</label>
                    <div className="service-div">
                        <div className="same-line">
                            <input type="text" className="form-control"
                                value={ form.services.find(ele => ele.name === service)?.description || "" } 
                                onChange={(e) =>
                                    handleServiceDescriptionChange(service, e.target.value)
                                }
                                id="agesAllowed" placeholder="Number" />
                            <input type="text" className="form-control"
                                value={ form.services.find(ele => ele.name === service)?.descriptionWord || "" } 
                                onChange={(e) =>
                                    handleServiceDescriptionWordChange(service, e.target.value)
                                }
                                id="agesAllowed" placeholder="In Words" />
                        </div>
                        <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                    </div>
                </div>
                );
            case "Clubs space and seating space":
                return (
                <div className="same-line mobile" key={service}>
                    <label className="form-label" htmlFor="clubSpace">Club space and seating space</label>
                    <div className="service-div">
                        <div className="same-line">
                            <input type="text" className="form-control"
                                value={ form.services.find(ele => ele.name === service)?.description || "" } 
                                onChange={(e) =>
                                    handleServiceDescriptionChange(service, e.target.value)
                                }
                                id="agesAllowed" placeholder="Number" />
                            <input type="text" className="form-control"
                                value={ form.services.find(ele => ele.name === service)?.descriptionWord || "" } 
                                onChange={(e) =>
                                    handleServiceDescriptionWordChange(service, e.target.value)
                                }
                                id="agesAllowed" placeholder="In Words" />
                        </div>
                        <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                    </div>
                </div>
                );
            case "Pool Coaching":
                return (
                <div className="same-line mobile" key={service}>
                    <label className="form-label" htmlFor="poolCoaching">Pool Coaching</label>
                    <div className="service-div">
                    <input type="text" className="form-control"
                        value={ form.services.find(ele => ele.name === service)?.description || "" }
                        onChange={(e) =>
                            handleServiceDescriptionChange(service, e.target.value)
                        }
                        id="poolCoaching" placeholder="Pool Coaching - Yes/No" />
                    <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                        </div>
                </div>
                );
            case "Pool & Billiard Products":
                return (
                <div className="same-line mobile" key={service}>
                    <label className="form-label" htmlFor="poolProducts">Pool & Billiard Products</label>
                    <div className="service-div">
                    <input type="text" className="form-control"
                        value={ form.services.find(ele => ele.name === service)?.description || "" }
                        onChange={(e) =>
                            handleServiceDescriptionChange(service, e.target.value)
                        }
                        id="poolProducts" placeholder="Pool & Billiard Products" />
                    <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                        </div>
                </div>
                );
            case "Table models & sizes":
                return (
                <div className="same-line mobile" key={service}>
                    <label className="form-label" htmlFor="tableModels">Table models & sizes</label>
                    <div className="service-div">
                    <input type="text" className="form-control"
                        value={ form.services.find(ele => ele.name === service)?.description || "" }
                        onChange={(e) =>
                            handleServiceDescriptionChange(service, e.target.value)
                        }
                        id="tableModels" placeholder="Table models & sizes" />
                    <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                        </div>
                </div>
                );
            case "Pool Competitions & Events":
                return (
                <div className="same-line mobile" key={service}>
                    <label className="form-label" htmlFor="competitions">Pool Competitions & Events</label>
                    <div className="service-div">
                    <input type="text" className="form-control"
                        value={ form.services.find(ele => ele.name === service)?.description || "" }
                        onChange={(e) =>
                            handleServiceDescriptionChange(service, e.target.value)
                        }
                        id="competitions" placeholder="Pool Competitions & Events" />
                    <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                        </div>
                </div>
                );
            case "Billiard Balls and Club Size":
                return (
                <div className="same-line mobile" key={service}>
                    <label className="form-label" htmlFor="billiardBalls">Billiard Balls and Club Size</label>
                    <div className="service-div">
                    <input type="text" className="form-control"
                        value={ form.services.find(ele => ele.name === service)?.description || "" }
                        onChange={(e) =>
                            handleServiceDescriptionChange(service, e.target.value)
                        }
                        id="billiardBalls" placeholder="Billiard Balls and Club Size" />
                    <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                        </div>
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
                <div className="same-line mobile" key={service}>
                    <label className="form-label" htmlFor="food">Type of Food</label>
                    <div className="service-div">
                    <input type="text"
                        value={ form.services.find(ele => ele.name === service)?.description || "" }
                        onChange={(e) =>
                            handleFoodServiceDescriptionChange(service, e.target.value)
                        }
                        className="form-control" id="food" placeholder="Type of Food" />
                    <IoClose className="close-icon" onClick={() => handleRemoveFoodService(service)} />
                        </div>
                </div>
                );
            case "Drinks":
                return (
                <div className="same-line mobile" key={service}>
                    <label className="form-label" htmlFor="drinks">Type of Drinks</label>
                    <div className="service-div">
                    <input type="text"
                        value={ form.services.find(ele => ele.name === service)?.description || "" }
                        onChange={(e) =>
                            handleFoodServiceDescriptionChange(service, e.target.value)
                        }
                        className="form-control" id="drinks" placeholder="Type of Drinks" />
                    <IoClose className="close-icon" onClick={() => handleRemoveFoodService(service)} />
                        </div>
                </div>
                );
            case "Coffees":
                return (
                <div className="same-line mobile" key={service}>
                    <label className="form-label" htmlFor="coffees">Type of Coffees</label>
                    <div className="service-div">
                    <input type="text"
                        value={ form.services.find(ele => ele.name === service)?.description || "" }
                        onChange={(e) =>
                            handleFoodServiceDescriptionChange(service, e.target.value)
                        }
                        className="form-control" id="coffees" placeholder="Type of Coffees" />
                    <IoClose className="close-icon" onClick={() => handleRemoveFoodService(service)} />
                        </div>
                </div>
                );
            case "Desserts":
                return (
                <div className="same-line mobile" key={service}>
                    <label className="form-label" htmlFor="desserts">Type of Desserts</label>
                    <div className="service-div">
                    <input type="text"
                        value={ form.services.find(ele => ele.name === service)?.description || "" }
                        onChange={(e) =>
                            handleFoodServiceDescriptionChange(service, e.target.value)
                        }
                        className="form-control" id="desserts" placeholder="Type of Desserts" />
                    <IoClose className="close-icon" onClick={() => handleRemoveFoodService(service)} />
                        </div>
                </div>
                );
            default:
                return null;
        }
    };

    useEffect(() => {
        if(alertMessage === "Fill the required Field") {
            window.scrollTo(0, 0); // Scroll to the top-left corner of the page
        }
    }, [alertMessage]);

    const handleClearForm = () => {
        setForm({ 
            name: "",
            contactPerson: "",
            clubType: "",
            city: "",
            slogan: "",
            image: "",
            emailAddress: "",
            phoneNo: "",
            landLineNo: "",
            webSite: "",
            experience: "",
            address: "",
            latitude: "",
            longitude: "",
            introductionObjtv: "",
            openTime: "",
            closeTime: "",
            happyHrRates: "",
            normalHrRates: "",
            startTime: "",
            endTime: "",
            description: "",
            history: "",
            youtubevideo: "",
            pictureGallery: [],
            socialMedialinks: [
                { name: "Facebook", link: "", icon: "<FaFacebook />" },
                { name: "Instagram", link: "", icon: "<AiFillInstagram />" },
                { name: "Tiktok", link: "", icon: "<FaTiktok />" },
            ],
            services: []
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(form);
            const formData = new FormData();
    
            for (let key in form) {
                const value = form[key];
        
                if (
                    !["image", "pictureGallery", "socialMedialinks", "services"].includes(key) &&
                    value !== undefined &&
                    value !== "" // Skip keys with empty string or undefined
                ) {
                    if (typeof value === "string") {
                        formData.append(key, value);
                    } else {
                        formData.append(key, JSON.stringify(value));
                    }
                }
            }
        
            // Append image file if it exists
            if (form.image instanceof File) {
                formData.append("image", form.image);
            }
        
            // Append pictureGallery files if the array is not empty
            if (Array.isArray(form.pictureGallery) && form.pictureGallery.length > 0) {
                form.pictureGallery.forEach((file) => {
                    if (file instanceof File) {
                        formData.append("pictureGallery", file);
                    }
                });
            }
        
            // Append socialMedialinks if the array is not empty
            if (Array.isArray(form.socialMedialinks) && form.socialMedialinks.length > 0) {
                form.socialMedialinks.forEach((item, index) => {
                    if (item.link) { // Only append if there's a valid link
                        formData.append(`socialMedialinks[${index}][name]`, item.name || "");
                        formData.append(`socialMedialinks[${index}][icon]`, item.icon || "");
                        formData.append(`socialMedialinks[${index}][link]`, item.link || "");
                    }
                });
            }
        
            // Append services if the array is not empty
            if (Array.isArray(form.services) && form.services.length > 0) {
                form.services.forEach((item, index) => {
                    if (item.name || item.icon || item.description || item.descriptionWord) { // Only append if any of the fields are present
                        formData.append(`services[${index}][name]`, item.name || "");
                        formData.append(`services[${index}][icon]`, item.icon || "");
                        formData.append(`services[${index}][description]`, item.description || "");
                        // formData.append(`services[${index}][descriptionWord]`, item.descriptionWord || "");
                    }
                });
            }
        
            // Check appended data
            // for (let [key, value] of formData.entries()) {
            //     console.log(`${key}: ${value}`);
            // }
        
            if (Object.keys(errors).length === 0) {
                if(isPolicyChecked) {
                    if (clubAndBar) {
                        formData.append("_id", clubAndBar._id);
                        console.log("for update, formData", formData);
                        dispatch(startUpdateClub(formData, setAlertMessage, setAlertMessageColor, setSelectedDashboard));
                    } else {
                        console.log("for create, formData", formData);
                        dispatch(startCreateClub(formData, setAlertMessage, setAlertMessageColor, setSelectedDashboard));
                    }
                    setFormErrors("");
                } else {
                    setAlertMessage("Please Check and terms and conditions");
                    setAlertMessageColor("red");
                }
            } else {
                setAlertMessage("Fill the required Field");
                setAlertMessageColor("red");
                setFormErrors(errors);
        }
    };
    
    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log(form);
    
    //     const formData = new FormData();
    
    //     for (let key in form) {
    //         const value = form[key];
    
    //         if (!["image", "pictureGallery", "socialMedialinks", "services"].includes(key)) {
    //             if (typeof value === "string") {
    //                 formData.append(key, value.trim() === "" ? "__REMOVE__" : value);
    //             } else if (value !== undefined && value !== null) {
    //                 formData.append(key, JSON.stringify(value));
    //             }
    //         }
    //     }
    
    //     // Handle Image Upload
    //     if (form.image instanceof File) {
    //         formData.append("image", form.image);
    //     }
    
    //     // Handle Picture Gallery
    //     if (Array.isArray(form.pictureGallery) && form.pictureGallery.length > 0) {
    //         form.pictureGallery.forEach((file) => {
    //             if (file instanceof File) {
    //                 formData.append("pictureGallery", file);
    //             }
    //         });
    //     } else {
    //         formData.append("pictureGallery", JSON.stringify([])); // Sending empty array if removed
    //     }
    
    //     // Handle Social Media Links
    //     if (Array.isArray(form.socialMedialinks) && form.socialMedialinks.length > 0) {
    //         form.socialMedialinks.forEach((item, index) => {
    //             formData.append(`socialMedialinks[${index}][name]`, item.name || "__REMOVE__");
    //             formData.append(`socialMedialinks[${index}][icon]`, item.icon || "__REMOVE__");
    //             formData.append(`socialMedialinks[${index}][link]`, item.link || "__REMOVE__");
    //         });
    //     } else {
    //         formData.append("socialMedialinks", JSON.stringify([])); // Sending empty array if removed
    //     }
    
    //     // Handle Services
    //     if (Array.isArray(form.services) && form.services.length > 0) {
    //         form.services.forEach((item, index) => {
    //             formData.append(`services[${index}][name]`, item.name || "__REMOVE__");
    //             formData.append(`services[${index}][icon]`, item.icon || "__REMOVE__");
    //             formData.append(`services[${index}][description]`, item.description || "__REMOVE__");
    //         });
    //     } else {
    //         formData.append("services", JSON.stringify([])); // Sending empty array if removed
    //     }
    
    //     if (Object.keys(errors).length === 0) {
    //         if (clubAndBar) {
    //             formData.append("_id", clubAndBar._id);
    //             dispatch(startUpdateClub(formData, setAlertMessage, setAlertMessageColor, setSelectedDashboard));
    //         } else {
    //             dispatch(startCreateClub(formData, setAlertMessage, setAlertMessageColor, setSelectedDashboard));
    //         }
    //         setFormErrors("");
    //     } else {
    //         setAlertMessage("Fill All the Field Values");
    //         setAlertMessageColor("red");
    //         setFormErrors(errors);
    //     }
    // };
    
     
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
                            <label className="form-label" htmlFor="name">{form.clubType ? form.clubType : "Club/Bar"} Name*</label>
                            <input type="text" className="form-control" id="name" name="name" value={form.name} onChange={handleChange} placeholder={`Enter the ${form.clubType ? form.clubType : "Club/Bar"} Name`}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="contactPerson">Contact Person Name*</label>
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
                            <label className="form-label" htmlFor="city">{form.clubType ? form.clubType : "Club/Bar"} City*</label>
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
                            <label className="form-label" htmlFor="clubType">Club Type*</label>
                            <select 
                                className="form-control"
                                id="clubType"
                                name="clubType"
                                value={form.clubType}
                                onChange={handleChange}
                                placeholder="Select a Service">
                                    <option value="">Select the clubType</option>
                                    <option value="Club">Club</option>
                                    <option value="Bar">Bar</option>
                            </select>
                        </div>
                    </div>
                    {(formErrors.city || formErrors.clubType) && (
                        <div className="same-line">
                            {formErrors.city && <div className="alert alert-danger">{formErrors.city}</div>}
                            {formErrors.clubType && <div className="alert alert-danger">{formErrors.clubType}</div>}
                        </div>
                    )}
                    <div className="same-line">
                        <div className="form-group">
                            <label className="form-label" htmlFor="slogan">{form.clubType ? form.clubType : "Club/Bar"} Slogan</label>
                            <input type="text" className="form-control" id="slogan" name="slogan" value={form.slogan} onChange={handleChange} placeholder={`Enter the ${form.clubType ? form.clubType : "Club/Bar"} Slogan`}/>
                        </div>
                        <div className="form-group gallery">
                            <label className="form-label" htmlFor="image">{form.clubType ? form.clubType : "Club/Bar"} Image</label>
                            <input type="file" className="form-control" id="image" name="image" onChange={handleImageChange} placeholder={`Enter the ${form.clubType ? form.clubType : "Club/Bar"} Image`}/>
                            {(form?.image || form?.image?.name)  && (
                                <div className="upload-image">
                                    <p>Remove Image</p>
                                    <IoClose className="close-icon" onClick={handleRemoveImage} />
                                </div>
                            )}
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
                            <label className="form-label" htmlFor="emailAddress">Email*</label>
                            <input type="text" className="form-control" id="emailAddress" name="emailAddress" value={form.emailAddress} onChange={handleChange} placeholder="Enter the Email"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="phoneNo">Phone Number*</label>
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
                            <label className="form-label" htmlFor="landLineNo">LandLine Number</label>
                            <input type="text" className="form-control" id="landLineNo" name="landLineNo" value={form.landLineNo} onChange={handleChange} placeholder="Enter the LandLine Number"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="address">Address</label>
                            <input type="text" className="form-control" id="address" name="address" value={form.address} onChange={handleChange} placeholder="Enter the Address"/>
                        </div>
                    </div>
                    <div className="same-line">
                        <div className="form-group">
                            <label className="form-label" htmlFor="webSite">Website Link</label>
                            <input type="text" className="form-control" id="webSite" name="webSite" value={form.webSite} onChange={handleChange} placeholder="Enter the Website Link"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="experience">Open Since</label>
                            <input type="text" className="form-control" id="experience" name="experience" value={form.experience} onChange={handleChange} placeholder="Enter the year of opening"/>
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
                            <label className="form-label" htmlFor="location">Geo Location Type*</label>
                            <div className="same-line">
                                <select 
                                    className="form-control"
                                    id="location"
                                    name="location"
                                    value={locationType}
                                    onChange={(e) => {
                                        setlocationType(e.target.value)
                                        setForm({...form, latitude: "", longitude: ""});

                                    }}
                                    placeholder="Select a Service">
                                        <option value="">Select Location Type</option>
                                        <option value="CurrentLocation">Current Location</option>
                                        <option value="LatAndLong">Latitude and Longitude</option>
                                </select>
                                {locationType==="CurrentLocation" && (
                                    <button className="loading-btn" type="button">
                                      {(form.latitude || form.longitude) ? <RiDeleteBin5Fill onClick={() => {
                                        setForm({...form, latitude: "", longitude: ""});
                                      }}/>  : !isLoading ? <FaSearchLocation onClick={handleGeoLocationChange}/> : <div className="loading-spinner"></div>}
                                    </button>
                                )}
                            </div>
                        </div>
                        {locationType && (
                                <div className="same-line">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="latitude">Latitiude</label>
                                        <input type="text" className="form-control" id="latitude" name="latitude" value={form.latitude} onChange={handleChange} placeholder="Latitiude Value"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="longitude">Longitude</label>
                                        <input type="text" className="form-control" id="longitude" name="longitude" value={form.longitude} onChange={handleChange} placeholder="Longitude Value"/>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    {(formErrors.locationType || formErrors.location) && (
                        <div className="same-line">
                            {formErrors.locationType && <div className="alert">{formErrors.locationType}</div>}
                            {formErrors.location && <div className="alert">{formErrors.location}</div>}
                        </div>
                    )}
                    {formErrors.address && (
                        <div className="same-line">
                            {formErrors.address && <div className="alert alert-danger">{formErrors.address}</div>}
                        </div>
                    )}
                    <div className="form-group">
                        <label className="form-label" htmlFor="introductionObjtv">{form.clubType ? form.clubType : "Club/Bar"} Introduction and Objectives</label>
                        <textarea type="text" className="form-control" id="introductionObjtv" name="introductionObjtv" value={form.introductionObjtv} onChange={handleChange} placeholder="Introduce your club and Objectives and what you are about? Brief about services. No. of staff catering. About the ambiance. "/>
                    </div>
                    {formErrors.introductionObjtv &&
                        <div className="same-line">
                            {formErrors.introductionObjtv && <div className="alert alert-danger">{formErrors.introductionObjtv}</div>}
                        </div>
                    }
                    <div className="form-group">
                        <label className="form-label-head" htmlFor="services">Services</label>
                        {selectedServices.map((service) => renderInputField(service))}
                        <div className="same-line mobile">
                            <label className="form-label" htmlFor="services">Add a new Service</label>
                            <select 
                                className="form-control"
                                id={selectedServices}
                                // value={selectedServices}
                                onChange={handleSelectServiceChange}
                                placeholder="Select a Service">
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
                        <label className="form-label-head" htmlFor="services">Food and Drinks Service</label>
                        {selectedFoodServices.map((service) => renderFoodInputField(service))}
                        <div className="same-line mobile">
                            <label className="form-label" htmlFor="services">Add a Food Service</label>
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
                    {formErrors.services && (
                        <div className="same-line">
                            {formErrors.services && <div className="alert alert-danger">{formErrors.services}</div>}
                        </div>
                    )}
                    <div className="form-group">
                        <label className="form-label-head" htmlFor="openAndCloseTime">Working Hours</label>
                        <div className="same-line-openclose">
                            <div className="same-line">
                                <label className="form-label" htmlFor="openTime">Open</label>
                                <input type="time" className="form-control" id="openTime" name="openTime" value={form.openTime} onChange={handleChange} placeholder="Open"/>
                            </div>
                            <div className="same-line">
                                <label className="form-label" htmlFor="closeTime">Close</label>
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
                        <div className="same-line-openclose">
                            <div className="same-line">
                                <label className="form-label" htmlFor="startTime">Happy hour From</label>
                                <input type="time" className="form-control" id="startTime" name="startTime" value={form.startTime} onChange={handleChange} placeholder="Open"/>
                            </div>
                            <div className="same-line">
                                <label className="form-label" htmlFor="endTime">Happy hour UpTo</label>
                                <input type="time" className="form-control" id="endTime" name="endTime" value={form.endTime} onChange={handleChange} placeholder="Close"/>
                            </div>
                        </div>
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
                    <label className="form-label-head" htmlFor="socialMediaLinks">Social Media Links</label>
                    <div className="same-line">
                        {["Instagram", "Facebook", "TikTok"].map((platform) => (
                            <div className="form-group" key={platform}>
                                <label className="form-label" htmlFor={platform.toLowerCase()}>{platform}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={platform.toLowerCase()}
                                    value={
                                        form.socialMedialinks.find(link => link.name === platform)?.link || ""
                                    }
                                    onChange={(e) => handleSocialMediaChange(platform, e.target.value)}
                                    placeholder={`Enter the ${platform} Profile link`}
                                />
                            </div>
                        ))}
                    </div>
                    {/* <div className="same-line">
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
                    </div> */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="clubBarGallery">
                            {form.clubType ? form.clubType : "Club/Bar"} Gallery (Upload at least 3 images)
                        </label>
                        <input 
                            type="file"
                            id="clubBarGallery" 
                            placeholder="Upload Images" 
                            multiple
                            accept="image/*"
                            onChange={handleGalleryChange}
                            className="form-control"
                        />
                    </div>

                    {form.pictureGallery.length > 0 && (
                        <div className="upload-gallery">
                            {form.pictureGallery.map((image, index) => (
                                <div key={index} className="gallery-item">
                                    {/* <img src={URL.createObjectURL(image)} alt={image.name} /> */}
                                    <p>{image.title ? image.title : image.name}</p>
                                    <MdRemoveCircle  onClick={() => handleRemoveGalleryImage(image.name)} />
                                </div>
                            ))}
                        </div>
                    )}

                    {formErrors.pictureGallery && (
                        <div className="same-line">
                            <div className="alert">{formErrors.pictureGallery}</div>
                        </div>
                    )}
                    {!clubAndBar && <div className="checkbox-div">
                        <input type="checkbox" name="checkOut" onChange={() => setIsPolicyChecked(!isPolicyChecked)}/>
                        <p>I agree to the use of my data for advertising, product marketing, and other marketing-related services.</p>
                    </div>}
                    <div className="btn-div">
                        <button className="save-btn" type="submit">{clubAndBar ? "Save" : "Register"}</button>
                        <div onClick={handleClearForm} className="save-btn clear">Clear</div>
                    </div>
                </form>
            </div>
        </div>
    )
}