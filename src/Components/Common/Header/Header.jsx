import "./Header.scss"

import { RiBilliardsFill, RiSearch2Fill } from "react-icons/ri";
import { LuUserRound } from "react-icons/lu";
import { SiAmazongames } from "react-icons/si";
import { FaSearch } from "react-icons/fa";
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

export default function Header({searchOption, handleSearchOption, handleMyTournamentClick}) {

    const navigate = useNavigate()
    const {
            user, 
            handleLogin, 
            handleLogout, 
            searchCategory, 
            handleSearchCategory, 
            searchCity, 
            handleSearchCity, 
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
        } = useAuth()

        const clubAndBar = useSelector((state) => {
            return state.clubsAndBars.data.find(ele => ele?.createdBy === user?._id)
        });

        const userProfile = useSelector((state) => {
            return state.profile.data.find(ele => ele?.createdBy === user?._id)
        });

    // console.log(user)

    // const defaultUsername = "qsports@gmail.com"
    // const defaultPassword = "Qsports@123"
    const location = useLocation()
    const [selectedLocation, setSelectedLocation] = useState("")
    const [form, setForm] = useState({
        username : "",
        password : ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [formErrors, setFormErrors] = useState("")
    const [serverErrors, setServerErrors] = useState("")

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
          }, 3000);
          return () => clearTimeout(timer); // Cleanup timer on unmount
        }
      }, [alertMessage, setAlertMessage]);

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

    // const handleChange = (e) => {
    //     const {name, value} = e.target
    //     setForm({...form, [name]: value })
    // }

    // const handleCloseDashboard = () => {
    //     setOpenUserDashboard(false)
    // }
    // console.log(openUserDashboard)

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
                console.log(response.data.user)
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                handleLogin(user)
                setFormErrors("")
                setServerErrors("")
                // setForm({
                //     username : "",
                //     password : ""
                // })
                navigate("/account")
                handleOpenUserDashboard()
                setAlertMessage("Successfully Logged In")
                setAlertMessageColor("green")
                console.log(response)
            } catch(err) {
                console.log(err)
                alert("Invalid Username/Password")
                setServerErrors("Invalid Username/Password")
                setFormErrors("")
            }
        } else {
            setFormErrors(errors)
            setServerErrors("")
        }
    }

    const handleSearchSubmit = () => {
        if(searchCategory === "Clubs") {
            navigate("/clubs")
        } else if(searchCategory === "Bars") {
            navigate("/bars")
        } else if(searchCategory === "Tournaments") {
            navigate("/tournaments")
        }
        handleOpenSerachDashboard()
        // console.log(searchCity)
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
                    <ul className="menubar">
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
                        <a href="/tournaments" className={location.pathname==="/tournaments" ? "active" : ""}><li>
                            Tournaments
                        </li></a>
                        {/* <a href="/account" className={location.pathname==="/account" ? "active" : ""}><li>
                            Account
                        </li></a> */}
                    </ul>
                    <div className="logo">
                        <a href="/"><h1><span>Q</span>SPORTS</h1></a>
                        {/* <img src={logo} alt="logo"/> */}
                    </div>
                    <ul className="acc_details">
                        <li onClick={() => {
                            console.log("Navigating to account page");
                            if(user) {
                                navigate("/account")
                            } else {
                                setAlertMessage("Login to access to your account")
                                setAlertMessageColor("red")
                            }
                        }}>
                            <LuUserRound size={"25px"}/>
                            My Account
                        </li>
                        <li className="login_div" onClick={() => {handleOpenUserDashboard()}}>
                            {user ? <BiLogOut size={"30px"}/> : <BiLogIn size={"30px"}/>}
                            <div className="login">
                                {user && localStorage.getItem("token") ? <span>{user.firstName} {user.lastName}</span> : <span>Hello, Log In</span>}
                                My Profile
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
                                        <li 
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
                                        >My Tournament</li>
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
                        <input type="text" placeholder="Search For Clubs"/>
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
                                <input type="radio" name="Clubs" value="Clubs" checked={searchCategory === "Clubs"} onChange={(e) => {handleSearchCategory(e.target.value)}}/>
                                <span class="custom-radio"></span>
                                Play Clubs
                            </label>
                            <label>
                                <input type="radio" name="Bars" value="Bars" checked={searchCategory === "Bars"} onChange={(e) => {handleSearchCategory(e.target.value)}}/>
                                <span class="custom-radio"></span>
                                Play Bars
                            </label>
                            <label>
                                <input type="radio" name="Tournaments" value="Tournaments" checked={searchCategory === "Tournaments"} onChange={(e) => {handleSearchCategory(e.target.value)}}/>
                                <span class="custom-radio"></span>
                                Play Tournaments
                            </label>
                        </div>
                        <p style={{marginTop: "20px"}}>Select a City</p>
                        <div class="radio-container">
                            <label>
                                <input type="radio" name="city" value={searchCity} checked={searchCity} onChange={(e) => {handleSearchCity(e.target.value)}}/>
                                <span class="custom-radio"></span>
                                <select id="location-select" value={searchCity} onChange={(e) => handleSearchCity(e.target.value)}>
                                    <option value="">Select City</option>
                                    {dubaiCities.map((city, index) => (
                                        <option key={index} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="search-button-div">
                            <button className="search-btn" onClick={() => {
                                handleSearchCategory("")
                                setSelectedLocation("")
                                handleSearchCity("")
                            }}>Reset</button>
                            <button className="search-btn" onClick={handleSearchSubmit}>Search</button>
                        </div>
                        
                    </div>
                )}
            </div>
            <AnimatePresence>
                {alertMessage && !user && (
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