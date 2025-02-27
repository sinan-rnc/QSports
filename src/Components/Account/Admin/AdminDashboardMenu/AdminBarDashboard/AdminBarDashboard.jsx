import { useDispatch, useSelector } from "react-redux"

import "./AdminBarDashboard.scss"
import { useEffect, useState } from "react"
import { useAuth } from "../../../../../Context/AuthContext"
import { IoClose } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { startDeleteClub, startFeatureClub, startUpdateClub } from "../../../../../Actions/clubsAndBarsActions"
import PhoneInput from "react-phone-input-2"
import { dubaiCities } from "../../../../../DataSet/dubaiCities"
import { RiDeleteBin5Fill } from "react-icons/ri"
import { FaSearchLocation } from "react-icons/fa"

export default function AdminBarDashboard() {
    const dispatch = useDispatch()
    const { setAlertMessage, setAlertMessageColor } = useAuth()
    const allBars = useSelector((state) => {
        return state.clubsAndBars.data?.filter(ele => ele.clubType === "Bar")
            // .filter((ele => !ele.isDeleted))
    })
    const [ currentBarID, setCurrentBarID ] = useState("")
    const [ currentBar, setCurrentBar ] = useState("")
    const [ isLoading, setIsLoading ] = useState(false)
    const [ featuredBarID, setFeaturedBarID ] = useState(false)
    const [ openEditBarSection, setOpenEditBarSection ] = useState(false)

    // console.log(allBars)

    const [ form, setForm ] = useState({ 
        name: "",
        contactPerson: "",
        clubType: "",
        city: "",
        slogan: "",
        image: "",
        emailAddress: "",
        phoneNo: "",
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

    const [ formData, setFormData ] = useState({
        _id : "",
        latitude: "",
        longitude: "",
        isFeaturedClub: false
    })

    useEffect(() => {
        if (currentBarID) {
            const club = allBars.find(ele => ele._id === currentBarID);
            if (club) {
                setCurrentBar(club);
            }
        }
    }, [currentBarID]);

    // console.log(currentBar)

    useEffect(() => {
        if(currentBar) {
            setForm({
                name: currentBar.name,
                contactPerson: currentBar.contactPerson,
                clubType: currentBar.clubType,
                city: currentBar.city,
                slogan: currentBar.slogan,
                image: currentBar.image,
                emailAddress: currentBar.emailAddress,
                phoneNo: currentBar.phoneNo,
                webSite: currentBar.webSite,
                experience: currentBar.experience,
                address: currentBar.address,
                latitude: currentBar.geoLocation?.coordinates[1],
                longitude: currentBar.geoLocation?.coordinates[0],
                introductionObjtv: currentBar.introductionObjtv,
                openTime: convertTo24HourFormat(currentBar.openTime),
                closeTime: convertTo24HourFormat(currentBar.closeTime),
                happyHrRates: currentBar.happyHrRates,
                normalHrRates: currentBar.normalHrRates,
                description: currentBar.description,
                history: currentBar.history,
                youtubevideo: currentBar.youtubevideo,
                pictureGallery: currentBar.pictureGallery,
                socialMedialinks: currentBar.socialMedialinks,
                services: currentBar.services,
            })
        } else {
            setOpenEditBarSection(false)
        }
    }, [currentBar])

    useEffect(() => {
        if (featuredBarID) {
            const club = allBars.find(ele => ele._id === featuredBarID);
            if (club) {
                setCurrentBar(club); // Update currentBar
                setFormData({
                    _id: club._id,
                    latitude: club.geoLocation?.coordinates[1],
                    longitude: club.geoLocation?.coordinates[0],
                    isFeaturedClub: !club.isFeaturedClub
                });
            }
        }
    }, [featuredBarID]);

    // console.log(formData)
    
    useEffect(() => {
        if (formData._id) {
            // console.log("Dispatching startFeatureClub...");
            const newFormData = new FormData()

            newFormData.append("_id", formData._id)
            newFormData.append("latitude", formData.latitude)
            newFormData.append("longitude", formData.longitude)
            newFormData.append("isFeaturedClub", formData.isFeaturedClub)

            // console.log("Sinan FormData", newFormData)

            dispatch(startFeatureClub(newFormData, setAlertMessage, setAlertMessageColor));
        }
    }, [formData]);

    // console.log()

    // console.log(form.services)

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
        if(form?.slogan?.trim()?.length === 0){
            errors.slogan = `${form.clubType ? form.clubType : "Club/Bar"} Slogan is Required`
        }
        if(!form?.image){
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
        if(locationType?.trim()?.length === 0){
            errors.locationType = "Select Geo Location Type"
        }
        if((String(form?.latitude)?.trim()?.length === 0) || (String(form?.latitude)?.trim()?.length === 0)){
            errors.geoLocation = "Latitude and Longitude value is Required"
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

    const formatDate = (isoDate) => {
        if (!isoDate) return "";  // Handle empty cases
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const formatDateDDMMYYYY = (isoDate) => {
        if (!isoDate) return "";  // Handle empty cases
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

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

    const clubServices = currentBar?.services?.filter(service => availableServices.some(ele => service.name.includes(ele)))
    .map(service => service.name);

    // console.log(clubServices)

    const clubFoodServices = currentBar?.services?.filter(service => availableFoodServices.some(ele => service.name.includes(ele)))
    .map(service => service.name);

    useEffect(() => {
        if (form.services.length > 0) {
            setAvailableServices(prevServices =>
                prevServices?.filter(service =>
                    !form.services.some(existingService => existingService.name === service)
                )
            );
    
            setAvailableFoodServices(prevFoodServices =>
                prevFoodServices?.filter(foodService =>
                    !form.services.some(existingService => existingService.name === foodService)
                )
            );
        }
    }, [form.services]); // Run whenever `form.services` changes

    // console.log(availableServices)
    
    useEffect(() => {
        if(form.latitude || form.longitude){
            setIsLoading(false)
        }
    }, [form.latitude, form.longitude])

    // console.log("availableServices", availableServices)

    // console.log("clubServices", clubServices, "clubFoodServices",clubFoodServices)

    const [selectedServices, setSelectedServices] = useState(currentBar?.services ? clubServices : form.services);
    const [selectedFoodServices, setSelectedFoodServices] = useState(currentBar?.services ? clubFoodServices : form.services);

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

    // console.log(currentBar)

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
    
    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
    
        setForm((prevForm) => {
            // Get existing images from previous state and concatenate new ones
            const updatedGallery = [...prevForm.pictureGallery, ...files];
    
            return {
                ...prevForm,
                pictureGallery: updatedGallery.filter(
                    (file, index, self) => self.findIndex(img => img.name === file.name) === index
                ), // Remove duplicates
            };
        });
        // console.log(form.updatedGallery)
    
        e.target.value = ""; // Reset input
    };
        

    const handleRemoveGalleryImage = () => {
        setForm({...form, pictureGallery: []});

        // console.log(form.pictureGallery)
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
            clubType: "",
            city: "",
            slogan: "",
            image: "",
            emailAddress: "",
            phoneNo: "",
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

    const handleEditClub = async (clubId) => {
        setCurrentBarID(clubId)
        // console.log(currentBarID)
        setOpenEditBarSection(true)
    }

    const handleFeatureClub = async (ClubID) => {
        setFeaturedBarID(ClubID)
        // console.log(featuredBarID)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        // console.log(form)
        // const formData = { ...form }

        const formData = new FormData();
        
        for (let key in form) {
            if (!["image", "pictureGallery", "socialMedialinks", "services"].includes(key)) {
                formData.append(key, form[key]);
            }
        }

        formData.append("image", form.image); 

        // Ensure each item in pictureGallery is a File object
        if (form.pictureGallery.length > 0) {
            form.pictureGallery.forEach((file, index) => {
                if (file instanceof File) {  // ✅ Check if it's a File
                    formData.append("pictureGallery", file);
                } 
                // else {
                //     console.error(`Invalid file at index ${index}:`, file);
                // }
            });
        }

        form.socialMedialinks.forEach((item, index) => {
            formData.append(`socialMedialinks[${index}][name]`, item.name);
            formData.append(`socialMedialinks[${index}][icon]`, item.icon);
            formData.append(`socialMedialinks[${index}][link]`, item.link);
        });

        form.services.forEach((item, index) => {
            formData.append(`services[${index}][name]`, item.name);
            formData.append(`services[${index}][icon]`, item.icon);
            formData.append(`services[${index}][description]`, item.description);
        });

        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}:`, value);
        // }

        // console.log("PictureGallery:", form.pictureGallery);
        // form.pictureGallery.forEach((file, index) => {
        //     console.log(`Index ${index}:`, file);
        // });

        // formData.append("latitude", form.latitude || "");
        // formData.append("longitude", form.longitude || "");

        // console.log(formData.get("latitude"));
        // console.log(formData.get("longitude"));

        if(Object.keys(errors).length === 0) {
            if (currentBar) {
                formData.append("_id", currentBar._id);
                // console.log("for update, formData", form);
                // const updatedForm = { ...form, _id: currentBar._id }
                // console.log("for update, formData", formData);
                dispatch(startUpdateClub(formData, setAlertMessage, setAlertMessageColor));
            } 
            // else {
            //     console.log("for create, formData", formData);
            //     dispatch(startCreateClub(formData, setAlertMessage, setAlertMessageColor));
            // }
            setOpenEditBarSection(false)
            setFormErrors("")
            setCurrentBarID("")
            setCurrentBar("")
            // console.log(formErrors)
            setForm({
                name: "",
                clubType: "",
                city: "",
                contactPerson: "",
                slogan: "",
                image: "",
                emailAddress: "",
                phoneNo: "",
                webSite: "",
                experience: "",
                address: "",
                location: "",
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
        } else {
            setAlertMessage("Fill All the Field Values")
            setAlertMessageColor("red")
            setFormErrors(errors)
            // console.log(formErrors)
        } 
    }

    const handleDeleteClub = (ClubID, setAlertMessage, setAlertMessageColor) => {
        const confirmation = window.confirm("Are you sure you want to delete this event?");
        if (confirmation) {
            dispatch(startDeleteClub(ClubID, setAlertMessage, setAlertMessageColor))
        }
        setCurrentBar("")
        setCurrentBarID("")
    }


    return (
        <section className="admin-club-dashboard-container">
            <div id="club-dashboard" className="admin-club-dashboard">
                <div className="dashborad-heading">
                    <h1 className='dashborad-main-heading'>All Bars</h1>
                    <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                    {/* <h3 className="dashborad-second-heading">{currentBar?.name}</h3> */}
                </div>
                {allBars.length > 0 ? (
                    <table className="recent-orders__table">
                        <thead>
                        <tr>
                            <th>CLUB NAME</th>
                            <th>CITY</th>
                            <th>CONTACT PERSON</th>
                            <th>PHONE NO</th>
                            <th>EMAIL</th>
                            <th>REGISTERED DATE</th>
                            <th>Is Featured</th>
                            <th>ACTION</th>
                        </tr>
                        </thead>
                        <tbody>
                        {allBars?.map((ele, index) => (
                            <tr key={ele?._id}>
                                <td>{ele?.name}</td>
                                <td>{ele?.city}</td>
                                <td>{ele?.contactPerson}</td>
                                <td>{ele?.phoneNo}</td>
                                <td>{ele?.emailAddress}</td>
                                <td>{formatDateDDMMYYYY(ele?.createdAt)}</td>
                                <td>{ele?.isFeaturedClub ? "True" : "False"}</td>
                                <td>
                                    <div className="action-div">
                                        <a href="#edit-club"><button className="edit-profile"
                                            onClick={() => {
                                                handleEditClub(ele._id)
                                            }}
                                        >Edit Club</button></a>
                                        <button className="edit-profile"
                                        onClick={() => {handleDeleteClub(ele._id, setAlertMessage, setAlertMessageColor)}}
                                        >Delete Club</button>
                                        <button className="edit-profile"
                                        onClick={() => {handleFeatureClub(ele._id)}}
                                        >{ele.isFeaturedClub ? "UnFeature Club" : "Feature Club"}</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No Event Found, Create new Event</p>
                )}
            </div>
            {openEditBarSection &&
                <section id="edit-club" className="edit-club-section">
                    <div className="dashborad-heading" onClick={() => {setOpenEditBarSection(!openEditBarSection)}}>
                        <h1 className='dashborad-main-heading'>Update Club</h1>
                        <hr className={`dashborad-hr-1 ${openEditBarSection && "rotate"}`}/><hr className="dashborad-hr-2"/>
                        <h3 className="dashborad-second-heading">{currentBar && currentBar.name}</h3>
                    </div>
                    <form className="form-table" onSubmit={handleFormSubmit}>
                        <div className="same-line">
                            <div className="form-group">
                                <label className="form-label" htmlFor="name">{form.clubType ? form.clubType : "Club/Bar"} Name</label>
                                <input type="text" className="form-control" id="name" name="name" value={form.name} onChange={handleChange} placeholder={`Enter the ${form.clubType ? form.clubType : "Club/Bar"} Name`}/>
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
                                <label className="form-label" htmlFor="city">{form.clubType ? form.clubType : "Club/Bar"} City</label>
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
                                <label className="form-label" htmlFor="clubType">Club Type</label>
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
                                <label className="form-label" htmlFor="location">Geo Location Type</label>
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
                        {(formErrors.locationType || formErrors.geoLocation) && (
                            <div className="same-line">
                                {formErrors.locationType && <div className="alert">{formErrors.locationType}</div>}
                                {formErrors.geoLocation && <div className="alert">{formErrors.geoLocation}</div>}
                            </div>
                        )}
                        <div className="same-line">
                            <div className="form-group">
                                <label className="form-label" htmlFor="address">Address</label>
                                <input type="text" className="form-control" id="address" name="address" value={form.address} onChange={handleChange} placeholder="Enter the Address"/>
                            </div>
                        </div>
                        {formErrors.address && (
                            <div className="same-line">
                                {formErrors.address && <div className="alert alert-danger">{formErrors.address}</div>}
                            </div>
                        )}
                        <div className="form-group">
                            <label className="form-label" htmlFor="introductionObjtv">{form.clubType ? form.clubType : "Club/Bar"} Introduction</label>
                            <textarea type="text" className="form-control" id="introductionObjtv" name="introductionObjtv" value={form.introductionObjtv} onChange={handleChange} placeholder="Description about the Club"/>
                        </div>
                        {formErrors.introductionObjtv &&
                            <div className="same-line">
                                {formErrors.introductionObjtv && <div className="alert alert-danger">{formErrors.introductionObjtv}</div>}
                            </div>
                        }
                        <div className="form-group">
                            <label className="form-label-head" htmlFor="services">Services</label>
                            {selectedServices.map((service) => renderInputField(service))}
                            <div className="same-line">
                                <label className="form-label" htmlFor="services">Add a new Service</label>
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
                            <label className="form-label-head" htmlFor="services">Food and Drinks Service</label>
                            {selectedFoodServices.map((service) => renderFoodInputField(service))}
                            <div className="same-line">
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
                            <label className="form-label" htmlFor="clubBarGallery">{form.clubType ? form.clubType : "Club/Bar"} Gallary(Upload atleast 3 images)</label>
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
                            <div className="upload-gallery">
                                {form?.pictureGallery.length > 0 && <p onClick={() => handleRemoveGalleryImage()}>Remove All<IoClose className="close-icon"/></p>}
                            </div>
                        )}
                        
                        <div className="btn-div">
                            <button className="save-btn" type="submit">{currentBar ? "Save" : "Register"}</button>
                            <div onClick={handleClearForm} className="save-btn clear">Clear</div>
                        </div>
                    </form>
                </section>
            }
        </section>
    )
}