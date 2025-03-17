import "./Header.scss"

import { RiBilliardsFill, RiDeleteBin5Fill, RiMenu2Line, RiSearch2Fill } from "react-icons/ri";
import { LuUserRound } from "react-icons/lu";
import { SiAmazongames } from "react-icons/si";
import { FaSearch, FaSearchLocation } from "react-icons/fa";
import { GiPoolTriangle } from "react-icons/gi";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../Context/AuthContext";

import logo from "../../../Assets/Logo/logo.gif"
import english from "../../../Assets/Common/english.png"
import addProfile from "../../../Assets/Common/add-profile.jpg"
import { ImSearch } from "react-icons/im";
import { BiLogIn, BiLogOut, BiSolidDrink, BiSolidHide } from "react-icons/bi";
import { dubaiCities } from "../../../DataSet/dubaiCities";
import { IoClose } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { RiInstagramFill } from "react-icons/ri"
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import axios from "axios";
import { MdRemoveRedEye } from "react-icons/md";
import { useSelector } from "react-redux";
import { backendApi } from "../../../Apis/api";

export default function Header() {

    const navigate = useNavigate()
    const {
        user, 
        handleLogin, 
        handleLogout,
        handleSearchFilters,
        handleSearchNearByFilters,
        openUserDashboard, 
        setOpenUserDashboard, 
        handleOpenUserDashboard, 
        openSearchDashboard, 
        setOpenSearchDashboard,
        handleOpenSerachDashboard,
        alertMessage,
        setAlertMessage,
        alertMessageColor,
        setAlertMessageColor,
        selectedDashboard, 
        setSelectedDashboard,
        selectedAdminDashboard,
        setSelectedAdminDashboard,
    } = useAuth()

    const clubAndBar = useSelector((state) => {
        return state.clubsAndBars.data.find(ele => ele?.createdBy === user?._id)
    });

    const userProfile = useSelector((state) => {
        return state.profile.data.find(ele => ele?.createdBy === user?._id)
    });

    // console.log(user)

    const location = useLocation()
    const [form, setForm] = useState({
        username : "",
        password : ""
    })
    const [ searchFilterValues, setSearchFiltersValues ] = useState({
        isDeleted: false,
        sortBy: "createdAt",
        limit: 100,
        page: 1
    })

    const [ searchNearByFiltersValues, setSearchNearByFiltersValues ] = useState({
        latitude: "",
        longitude: "",
        clubType: "",
        maxDistance: 5000,
        limit: 10,
        page: 1
    })

    const [showPassword, setShowPassword] = useState(false)
    const [formErrors, setFormErrors] = useState("")
    const [serverErrors, setServerErrors] = useState("")
    const [searchFormError, setSearchFormError] = useState("")
    const [locationType, setlocationType] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSearchingNearBy, setIsSearchingNearBy] = useState(false)
    const [ mobileMenu, setMobileMenu ] = useState(false)

    const toggleMenu = () => {
        setMobileMenu(!mobileMenu)
    }

    const userDashboardNavigation = [
        {
            id: 1,
            title: "Dashboard",
            section: "dashboard",
        },
        {
            id: 2,
            title: "Edit Profile",
            section: "userProfile",
        },
        {
            id: 3,
            title: "My Events",
            section: "myEvents",
        },
        {
            id: 4,
            title: "Reset Password",
            section: "password",
        },
    ]

    const adminDashboardNavigation = [
        {
            id: 1,
            title: "Users",
            section: "users",
        },
        {
            id: 2,
            title: "Bars",
            section: "bars",
        },
        {
            id: 3,
            title: "Clubs",
            section: "clubs",
        },
        {
            id: 4,
            title: "Events",
            section: "events",
        },
        {
            id: 5,
            title: "Quotes",
            section: "quotes",
        },
        {
            id: 2,
            title: "Reset Password",
            section: "password",
        },
    ]

    const userDashboardRef = useRef(null);
    const searchDashboardRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
            userDashboardRef.current &&
            !userDashboardRef.current.contains(event.target)
        ) {
            handleOpenUserDashboard();
        }
    
        if (
            searchDashboardRef.current &&
            !searchDashboardRef.current.contains(event.target)
        ) {
            handleOpenSerachDashboard();
        }
    };


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
    }, [handleClickOutside]);

    useEffect(() => {
        // Automatically close the alert after 5 seconds
        if (alertMessage) {
          const timer = setTimeout(() => {
            setAlertMessage("");
          }, 5000);
          return () => clearTimeout(timer); // Cleanup timer on unmount
        }
    }, [alertMessage, setAlertMessage]);

    useEffect(() => {
        if(isSearchingNearBy) {
            if(searchNearByFiltersValues.latitude || searchNearByFiltersValues.longitude) {
                setIsLoading(false)
                handleSearchNearByFilters(searchNearByFiltersValues)
                if(searchNearByFiltersValues.clubType === "Club") {
                    navigate("/clubs")
                } else if(searchNearByFiltersValues.clubType === "Bar") {
                    navigate("/bars")
                }
                handleOpenSerachDashboard()
            }
        }
    }, [isSearchingNearBy, searchNearByFiltersValues])

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


    const handleFormSubmit = async (e) => {
        e.preventDefault()

        const formData = {
            email : form.username,
            password : form.password
        }
        // console.log(formData)

        if(Object.keys(errors).length === 0) {
            try {
                const response = await axios.post(`${backendApi}/auth/login`, formData)
                const token = response.data.tokens.access
                const user = response.data.user
                // console.log(response.data.user)
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                handleLogin(user)
                setFormErrors("")
                setServerErrors("")
                // setForm({
                //     username : "",
                //     password : ""
                // })
                if(user?.userType === "SuperAdmin") {
                    navigate("/admin-account")
                } else {
                    navigate("/account")
                }
                handleOpenUserDashboard()
                setAlertMessage("Successfully Logged In")
                setAlertMessageColor("green")
                // console.log(response)
                setForm({
                    username : "",
                    password : ""
                })
            } catch(err) {
                // console.log(err)
                // alert("Invalid Username/Password")
                setAlertMessage(err.response.data.message)
                setAlertMessageColor("green")
                setServerErrors(err.response.data.message)
                setFormErrors("")
            }
        } else {
            setFormErrors(errors)
            setServerErrors("")
        }
    }

    const handleClubTypeChange = (e) => {
        setSearchFiltersValues({...searchFilterValues, clubType: e.target.value})
        setSearchNearByFiltersValues({...searchNearByFiltersValues, clubType: e.target.value})
    }

    const handleCityChange = (e) => {
        setSearchFiltersValues({...searchFilterValues, city: e.target.value})
        setIsSearchingNearBy(false)
    }

    const handleSearchNearBy = () => {
        setIsSearchingNearBy(true);
        setSearchFiltersValues({...searchFilterValues, city: ""})
    };

    // console.log(searchFilterValues)
    // console.log(searchNearByFiltersValues)


    const handleSearchSubmit = () => {
        // console.log(searchFilterValues)
        // console.log(searchNearByFiltersValues)
        if(isSearchingNearBy) {
            if(!searchNearByFiltersValues.latitude || !searchNearByFiltersValues.longitude) {
                setIsLoading(true)
            }
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        // console.log(latitude, longitude)
                        setSearchNearByFiltersValues({ ...searchNearByFiltersValues, latitude: latitude, longitude: longitude })
                        // console.log("Updated Form:", { latitude: latitude, longitude: longitude });
                    },
                    (error) => {
                        console.error("Error getting location:", error);
                        alert("Failed to get location. Please enable location services.");
                    }
                );
                handleSearchFilters({
                    isDeleted: false,
                    sortBy: "createdAt",
                    limit: 100,
                    page: 1
                })
                handleSearchNearByFilters(searchNearByFiltersValues)
            } else {
                setAlertMessage("Geolocation is not supported by your browser");
                setAlertMessageColor("red")
            }
        } else {
            handleSearchFilters(searchFilterValues)
            if(searchFilterValues.clubType === "Club") {
                navigate("/clubs")
            } else if(searchFilterValues.clubType === "Bar") {
                navigate("/bars")
            }
            handleSearchNearByFilters({})
            handleOpenSerachDashboard()
        }
    //     if(searchCategory === "Clubs") {
    //         navigate("/clubs")
    //     } else if(searchCategory === "Bars") {
    //         navigate("/bars")
    //     } else if(searchCategory === "Tournaments") {
    //         navigate("/tournaments")
    //     }
    //     handleOpenSerachDashboard()
    }

    return (
        <nav>
            <div className="navbar">
                <div className="navbar_top">
                    <div className="left_ul">
                        <ul>
                            <li className="call-us">Call Us : <span>971 012345678</span></li>
                            {/* <li className="contact-us">Contact Us</li> */}
                            <div className="social">
                                <p className="social_head">Follow us On :</p>
                                <div className="social_links">
                                    <FaFacebook />
                                    <RiInstagramFill />
                                    <FaYoutube />
                                    <FaTwitter />
                                    <FaLinkedin />
                                </div>
                            </div>
                        </ul>
                    </div>
                    <div className="text_slogan">
                        <h1>Your Ultimate Destination for Indoor Games!</h1>
                    </div>
                    <div className="right_ul">
                        <ul>
                            <li><a href="/club-register"><p className="club-register">Register a new <span>Club</span></p></a></li>
                            <li className="contact-us"><a href="/contact-us">Contact Us</a></li>
                            {/* <li>Language: <span>EN</span></li> */}
                        </ul>
                        {/* <img src={english} alt=""/> */}
                    </div>
                </div>
                <div className="navbar_middle">
                    <div>
                        <RiMenu2Line className={mobileMenu ? "menu-icon-close" : "menu-icon"} onClick={toggleMenu}/>
                        {!mobileMenu && (
                            <ul className={`menubar`}>
                                <a href="/" className={location.pathname==="/" ? "active" : ""}><li>
                                    Home
                                </li></a>
                                <a href="/about-us" className={location.pathname==="/about-us" ? "active" : ""}><li>
                                    About Us
                                </li></a>
                                <a href="/clubs" className={location.pathname==="/clubs" ? "active" : ""}><li>
                                    Play Clubs
                                </li></a>
                                <a href="/bars" className={location.pathname==="/bars" ? "active" : ""}><li>
                                    Play Bars
                                </li></a>
                                <a href="/events" className={location.pathname==="/events" ? "active" : ""}><li>
                                    Tournaments
                                </li></a>
                                {/* <a href="/account" className={location.pathname==="/account" ? "active" : ""}><li>
                                    Account
                                </li></a> */}
                            </ul>
                        )}
                        {mobileMenu && (
                            <div className="mobile-menu">
                                <ul className={`menubar ${mobileMenu ? "" : "hide-menubar"}`}>
                                    {mobileMenu && <IoClose onClick={toggleMenu} className="close-btn"/>}
                                    {/* <hr className="menu-hr"/> */}
                                    <a href="/" className={location.pathname==="/" ? "active" : ""}><li>
                                        Home
                                    </li></a>
                                    <a href="/about-us" className={location.pathname==="/about-us" ? "active" : ""}><li>
                                        About Us
                                    </li></a>
                                    <a href="/clubs" className={location.pathname==="/clubs" ? "active" : ""}><li>
                                        Play Clubs
                                    </li></a>
                                    <a href="/bars" className={location.pathname==="/bars" ? "active" : ""}><li>
                                        Play Bars
                                    </li></a>
                                    <a href="/events" className={location.pathname==="/events" ? "active" : ""}><li>
                                        Tournaments
                                    </li></a>
                                    {/* <a href="/account" className={location.pathname==="/account" ? "active" : ""}><li>
                                        Account
                                    </li></a> */}
                                </ul>
                                <div className="serach_game">
                                {/* <i class="ri-search-fill"/> */}
                                <div className="icon-div">
                                    <div className="icon-left" onClick={handleOpenSerachDashboard}>
                                        <RiBilliardsFill size={22}/>
                                    </div>
                                    <hr className="hr-left"/>
                                </div>
                                <input type="text" placeholder="Search For Clubs" value={searchFilterValues.name} onChange={(e) => setSearchFiltersValues({...searchFilterValues, name: e.target.value})} />
                                <div className="icon-div">
                                    <hr className="hr-right"/>
                                    <div className="icon-right" onClick={handleSearchSubmit}>
                                        <ImSearch size={20}/>
                                    </div>
                                </div>
                            </div>
                                <div className="mobile-menu-footer">
                                    <div className="social">
                                        <p className="social_head">Follow us On :</p>
                                        <div className="social_links">
                                            <FaFacebook />
                                            <RiInstagramFill />
                                            <FaYoutube />
                                            <FaTwitter />
                                            <FaLinkedin />
                                        </div>
                                    </div>
                                    <div className="register-login">
                                        <div><a href="/club-register"><p className="club-register">Register a new <span>Club</span></p></a></div>
                                        <div className="contact-us"><a href="/contact-us">Contact Us</a></div>
                                        {/* <li>Language: <span>EN</span></li> */}
                                    </div>
                                    <div className="call-us">Call Us : <span>971 012345678</span></div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="logo">
                        <a href="/"><h1><span>Q</span>SPORTS</h1></a>
                        {/* <img src={logo} alt="logo"/> */}
                    </div>
                    <ul className="acc_details">
                        <li onClick={() => {
                            // console.log("Navigating to account page");
                            if(user?.userType == "SuperAdmin") {
                                navigate("/admin-account")
                            } else if(user) {
                                navigate("/account")
                            } else {
                                setAlertMessage("Login to access to your account")
                                setAlertMessageColor("red")
                            }
                        }}>
                            <LuUserRound size={"25px"}/>
                            <div className="account">
                                {user?.userType === "ClubAdmin" ? "Club Account" : user?.userType === "MemberUser" ? "My Account" : "Account"}
                            </div>
                        </li>
                        <li className="login_div" onClick={() => {handleOpenUserDashboard()}}>
                            {user ? <BiLogOut size={"30px"}/> : <BiLogIn size={"30px"}/>}
                            <div className="login">
                                {user && localStorage.getItem("token") ? <span>{user.firstName} {user.lastName}</span> : <span>Hello, Log In</span>}
                                {user?.userType === "ClubAdmin" ? "Club Profile" : user?.userType === "MemberUser" ? "My Profile" : "Profile"}
                            </div>
                        </li>
                        {openUserDashboard && (
                            (user && localStorage.getItem("token")) ? 
                        (
                            <div ref={userDashboardRef} className="user-dashboard">
                                <div className="top">
                                    {/* {(!user || clubAndBar?.image || userProfile?.ProfilePic )? <img src={addProfile} alt="user"/> : user?.userType === "ClubAdmin" ? <img src={clubAndBar?.image} alt="user"/> : user?.userType === "MemberUser" && <img src={userProfile?.ProfilePic} alt="user"/>} */}
                                    <img src={addProfile} alt="user"/>
                                    <h1>{user.firstName} {user.lastName}</h1>
                                </div><hr className="hr-dashboard"/>
                                <div className="details">
                                    <ul>
                                        {user.userType ==="SuperAdmin" ? (
                                            adminDashboardNavigation.map((ele) => {
                                                return(
                                                    <li 
                                                        className={selectedAdminDashboard === ele.section ? "active" : ""}
                                                        onClick={() => {
                                                            setSelectedAdminDashboard(ele.section)
                                                            navigate("/admin-account")
                                                        }}
                                                    >{ele.title}</li>
                                                )
                                            })
                                        ) : (
                                            userDashboardNavigation.map((ele) => {
                                                return(
                                                    <li 
                                                        className={selectedDashboard === ele.section ? "active" : ""}
                                                        onClick={() => {
                                                            setSelectedDashboard(ele.section)
                                                            navigate("/account")
                                                        }}
                                                    >{ele.title}</li>
                                                )
                                            })
                                        )}
                                        {/* <li 
                                            className={selectedDashboard === "dashboard" ? "active" : ""}
                                            onClick={() => {
                                                setSelectedDashboard("dashboard")
                                                navigate("/account")
                                            }}
                                        >Dashboard</li>
                                        <li 
                                            className={selectedDashboard === "userProfile" ? "active" : ""}
                                            onClick={() => {
                                                setSelectedDashboard("userProfile")
                                                navigate("/account")
                                            }}
                                        >Edit Profile</li>
                                        <li 
                                            className={selectedDashboard === "myEvents" ? "active" : ""}
                                            onClick={() => {
                                                setSelectedDashboard("myEvents")
                                                navigate("/account")
                                            }}
                                        >My Events</li> */}
                                    </ul>
                                </div><hr className="hr-dashboard"/>
                                <div className="button-div">
                                    <button className="logout-btn" onClick={() => {
                                        handleLogout()
                                        navigate("/")
                                        handleOpenUserDashboard()
                                        localStorage.removeItem("token")
                                        localStorage.removeItem("user")
                                        setAlertMessage("Logout Successfully")
                                        setAlertMessageColor("green")
                                        }}>Logout</button>
                                </div>
                            </div>
                        ) : (
                            <div ref={userDashboardRef} className="login-dashboard">
                                <h1>Log In To Your Account</h1>
                                <form onSubmit={handleFormSubmit}>
                                    {serverErrors && <span className="from-errors">{serverErrors}</span>}
                                    <input type="email" placeholder="Email" value={form.username} onChange={(e) => {setForm({ ...form, username: e.target.value })}}/>
                                    {formErrors.username && <span className="from-errors">{formErrors.username}</span>}
                                    <input type={showPassword ? "text" : "password"} placeholder="Password" value={form.password} onChange={(e) => {setForm({ ...form, password: e.target.value })}}/>
                                    { showPassword ? <BiSolidHide onClick={() => {setShowPassword(!showPassword)}}/> : <MdRemoveRedEye onClick={() => {setShowPassword(!showPassword)}}/> }
                                    {formErrors.password && <span className="from-errors">{formErrors.password}</span>}
                                    <button className="login-btn">Log In</button>
                                </form>
                                <p>Don't have an account? <a href="/user-register">Register</a></p>
                                <p className="club-register">Register a new <a href="/club-register">Club</a></p>
                            </div>
                        )
                        )}
                    </ul>
                </div>
                <div className="navbar_bottom">
                    <div className="serach_game">
                        {/* <i class="ri-search-fill"/> */}
                        <div className="icon-div">
                            <div className="icon-left" onClick={handleOpenSerachDashboard}>
                                <RiBilliardsFill size={22}/>
                            </div>
                            <hr className="hr-left"/>
                        </div>
                        <input type="text" placeholder="Search For Clubs" value={searchFilterValues.name} onChange={(e) => setSearchFiltersValues({...searchFilterValues, name: e.target.value})} />
                        <div className="icon-div">
                            <hr className="hr-right"/>
                            <div className="icon-right" onClick={handleSearchSubmit}>
                                <ImSearch size={20}/>
                            </div>
                        </div>
                    </div>
                </div>
                {openSearchDashboard && (
                    <div ref={searchDashboardRef} className="search-dashboard">
                        <p>Select an option from below</p>
                        <div class="radio-container">
                            <label>
                                <input type="radio" name="Club" value="Club" checked={searchFilterValues.clubType === "Club"} onChange={(e) => {handleClubTypeChange(e)}}/>
                                <span class="custom-radio"></span>
                                Play Clubs
                            </label>
                            <label>
                                <input type="radio" name="Bar" value="Bar" checked={searchFilterValues.clubType === "Bar"} onChange={(e) => {handleClubTypeChange(e)}}/>
                                <span class="custom-radio"></span>
                                Play Bars
                            </label>
                        </div>
                        <p style={{marginTop: "20px"}}>Select a City / Search from Near by City</p>
                        <div class="radio-container">
                        <label>
                            <input 
                                type="radio" 
                                name="city" 
                                value={searchFilterValues.city} 
                                checked={!!searchFilterValues.city} 
                                onChange={(e) => handleCityChange(e)}
                            />
                            <span class="custom-radio"></span>
                            <select id="location-select" value={searchFilterValues.city} onChange={(e) => handleCityChange(e)}>
                                <option value="">Select City</option>
                                {dubaiCities.map((city, index) => (
                                    <option key={index} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </label>
                            <label>
                                <input type="radio" name="searchNearBy" checked={isSearchingNearBy} onChange={handleSearchNearBy}/>
                                <span class="custom-radio"></span>
                                Search Near By
                            </label>
                        </div>
                        <div className="search-button-div">
                            <button className="search-btn" onClick={() => {
                                setSearchFiltersValues({
                                    isDeleted: false,
                                    sortBy: "createdAt",
                                    limit: 10,
                                    page: 1
                                })
                                setSearchNearByFiltersValues({
                                    latitude: "",
                                    longitude: "",
                                    clubType: "",
                                    maxDistance: 5000,
                                    limit: 10,
                                    page: 1
                                })
                                setIsSearchingNearBy(false)

                            }}>Reset</button>
                            <button className="search-btn" onClick={handleSearchSubmit}>{!isLoading ? "Search" : "Searching..."}</button>
                        </div>  
                    </div>
                )}
            </div>

            {/* <div class="radio-container search"> */}
                {/* <label>
                    <input type="radio" name="city" value={searchNearBy} checked={searchNearBy} onChange={(e) => {handleSearchCity(e.target.value)}}/>
                    <span class="custom-radio"></span>
                    <select 
                        className="form-control"
                        id="location"
                        name="location"
                        value={searchNearBy}
                        onChange={handleSearchNearBy}
                        placeholder="Select a Service">
                            <option value="NearBy">Search Near By</option>
                    </select>
                </label> */}
                {/* {locationType==="CurrentLocation" && (
                    <button className="loading-btn" type="button">
                        {(searchData.latitude || searchData.longitude) ? <RiDeleteBin5Fill onClick={() => {
                        setSearchData({...searchData, latitude: "", longitude: ""});
                        }}/>  : !isLoading ? <FaSearchLocation onClick={handleGeoLocationChange}/> : <div className="loading-spinner"></div>}
                    </button>
                )} */}
            {/* {locationType && (
                <div className="bottom">
                    <div className="form-group">
                        <label className="form-label" htmlFor="latitude">Latitiude</label>
                        <input type="text" className="form-control" id="latitude" name="latitude" value={searchData.latitude} onChange={handleChange} placeholder="Value"/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="longitude">Longitude</label>
                        <input type="text" className="form-control" id="longitude" name="longitude" value={searchData.longitude} onChange={handleChange} placeholder="Value"/>
                    </div>
                </div>
            )} */}
        {/* </div> */}

            <AnimatePresence>
                {alertMessage && (
                    <motion.div 
                        className={`alert-message ${alertMessageColor}`}
                        initial={{ x: "100%" }} // Start off-screen
                        animate={{ x: 0 }} // Animate to the screen
                        exit={{ x: "100%", opacity: 0 }} // Exit off-screen
                        transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth animation
                    >
                        {alertMessage} <IoClose onClick={() => {setAlertMessage("")}}/>   
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}