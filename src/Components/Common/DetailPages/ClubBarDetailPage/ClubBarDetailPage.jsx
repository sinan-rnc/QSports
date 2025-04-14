import React, { Fragment, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import ReactPlayer from "react-player"

import { MdEmail, MdOutlinePlace, MdOutlineSmokingRooms, MdPhone } from "react-icons/md"
import { LuClock9, LuMoveRight } from "react-icons/lu"
import { RiArrowLeftWideLine, RiArrowRightWideLine } from "react-icons/ri"
import { GiPoolTableCorner, GiAges, GiTeacher, GiPoolTriangle } from 'react-icons/gi';
import { PiSeatFill } from 'react-icons/pi';
import { FaMoneyBill, FaYoutube } from 'react-icons/fa';
import { MdEmojiEvents } from 'react-icons/md';
import { RiBilliardsFill, RiDrinksFill } from 'react-icons/ri';
import { IoFastFood } from 'react-icons/io5';
import { BiSolidDrink } from 'react-icons/bi';
import { LuDessert } from 'react-icons/lu';
import "./ClubBarDetailPage.scss"
import addImage from "../../../../Assets/Common/add-image.jpg"

import comimgSoon from "../../../../Assets/Common/coming-soon.avif"
// import herobanner1 from "../../../../Assets/Bars&Clubs/8.jpg"
// import herobanner2 from "../../../../Assets/Bars&Clubs/9.jpg"
// import herobanner3 from "../../../../Assets/Bars&Clubs/10.jpg"
// import herobanner4 from "../../../../Assets/Bars&Clubs/12.jpg"
// import herobanner5 from "../../../../Assets/Bars&Clubs/4.jpg"
// import herobanner6 from "../../../../Assets/Bars&Clubs/7.jpg"
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom"
import { barsAndClubs } from "../../../../DataSet/barsAndClubs"
import { tournaments } from "../../../../DataSet/tournaments"
import { IoIosArrowRoundForward } from "react-icons/io"
import { useSelector } from "react-redux"
import { CgWebsite, CgYoutube } from "react-icons/cg"
import { TbDeviceLandlinePhone } from "react-icons/tb"
import { GrServices } from "react-icons/gr";

export default function ClubBarDetailPage() {
    const navigate = useNavigate()
    const {clubName} = useParams()
    const clubNameNew = clubName.replace(/-/g, ' ') // Replace hyphens with spaces
                                .split(' ') // Split the string by spaces
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalize first letter of each word
                                .join(' ')
    const clubData = useSelector((state) => {
        return state?.clubsAndBars?.data
            .find(ele => !ele?.isDeleted && ele?.name.toLowerCase() === clubNameNew.toLowerCase())
    })
    // const clubData = barsAndClubs.find(ele => ele.name === clubNameNew)
    console.log(clubData)

    const iconsMap = {
        "No. of Pool Tables": <GiPoolTableCorner />,
        "No. of Snooker Tables": <GiPoolTableCorner />,
        "Ages allowed in the club": <GiAges />,
        "Club Seating Space": <PiSeatFill />,
        "Pool Coaching": <GiTeacher />,
        "Pool & Billiard Products": <GiPoolTriangle />,
        "Table models & sizes": <FaMoneyBill />,
        "Pool Competitions & Events": <MdEmojiEvents />,
        "Billiard Balls and Cloth Type": <RiBilliardsFill />,
        "Other Services": <GrServices />,
        "Smoking": <MdOutlineSmokingRooms />,
        "Food": <IoFastFood />,
        "Drinks": <BiSolidDrink />,
        "Coffees": <RiDrinksFill />,
        "Desserts": <LuDessert />,
    };

    function convertTo12HourFormat(time24h) {
        if (!time24h) return ""; // Handle empty or undefined values
    
        let [hours, minutes] = time24h.split(":").map(Number);
        const modifier = hours >= 12 ? "PM" : "AM";
    
        // Convert hours to 12-hour format
        hours = hours % 12 || 12;
    
        return `${hours}:${String(minutes).padStart(2, '0')} ${modifier}`;
    }

    // Separate the arrays based on name property
    const foodServices = clubData?.services?.filter(service =>
        ['Food', 'Drinks', 'Coffees', 'Desserts'].includes(service.name)
    );

    const otherServices = clubData?.services?.filter(service =>
        !['Food', 'Drinks', 'Coffees', 'Desserts', 'Other Services'].includes(service.name)
    );
    
    const otherService = clubData?.services?.find(ele => ele.name === "Other Services")
    // console.log(otherService)

    const clubEvents = useSelector((state) => {
        return state.events.data
            // .filter((ele => !ele.isDeleted))
            .filter(ele => ele.ClubID == clubData?._id)
    })

    console.log(clubEvents)

    const images = clubData?.pictureGallery;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [currentIndex1, setCurrentIndex1] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const lightThemeColors = [
        "#FFEFD5", // PapayaWhip
        "#E0FFFF", // LightCyan
        "#FAFAD2", // LightGoldenRodYellow
        "#F0FFF0", // HoneyDew
        "#FFFACD", // LemonChiffon
        "#D8BFD8", // Thistle
        "#F5DEB3", // Wheat
        "#E6E6FA", // Lavender
        "#FFDAB9", // PeachPuff
        "#F0E68C", // Khaki
    ];

    const lightThemeColors2 = [
        "#FFB6C1", // LightPink
        "#98FB98", // PaleGreen
        "#AFEEEE", // PaleTurquoise
        "#FFDEAD", // NavajoWhite
    ];
    
    
    // console.log(tournament)

    // console.log("Year:", year);
    // console.log("Month:", monthName);
    // console.log("Day:", day);

    const formatDate = (isoDate) => {
        if (!isoDate) return "";  // Handle empty cases
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const isValidImage = (url) => {
        return url && /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(url);
    };

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top-left corner of the page
    }, []);

    const openLightbox = (index) => {
        // console.log('Opening image:', index);
        setCurrentIndex1(index);

        setTimeout(() => {
            setIsOpen(true);
        }, 100);
    };

    const closeLightbox = () => {
        setIsOpen(false);
    };

    const goToNext = () => {
        setCurrentIndex1((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPrev = () => {
        setCurrentIndex1((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.8 },
        },
        exit: (direction) => ({
            x: direction > 0 ? -1000 : 1000,
            opacity: 0,
            transition: { duration: 0.8 },
        }),
    };

    const textVariants = {
        initial: {
            y: 100,
            opacity: 0,
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1,
                ease: "easeOut",
                staggerChildren: 0.3, // Stagger the children by 0.3s
            },
        },

        initial2: {
            y: 50,
            opacity: 0,
        },
        animate2: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1,
                ease: "easeOut",
                staggerChildren: 0.3, // Stagger the children by 0.3s
            },
        },
      } 
    
    const childVariants = {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { duration: 0.6 } },
        initial2: { y: 30, opacity: 0 },
        animate2: { y: 0, opacity: 1, transition: { duration: 0.6 } },
    };

    const handlePrev = () => {
        setDirection(-1); // Set direction for the animation
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setDirection(1); // Set direction for the animation
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handleDotClick = (index) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const handleOpenGoogleMap = () => {
        const url = `https://www.google.com/maps?q=${clubData?.geoLocation?.coordinates[1]},${clubData?.geoLocation?.coordinates[0]}`;
        window.open(url, "_blank");
    };

    return (
        <Fragment>
            {/* <section>
                <div className="club-detailPage">
                    <motion.div
                        key={currentIndex}
                        className="banner-wrapper"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        >
                        {images?.length >= 1 ? <img src={images[currentIndex]?.path} alt="Club Banner" className="banner" /> : <img src={addImage} alt="Club Banner" className="banner" /> }
                    </motion.div>
                    <div className="overlay"></div>
                    <RiArrowLeftWideLine className="arrow-left" onClick={handlePrev}/>
                    <RiArrowRightWideLine  className="arrow-right" onClick={handleNext}/>
                    <motion.div 
                        variants={textVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: false, amount: 0.5 }}
                        key={currentIndex}
                        className="club-details container-section">
                        <motion.h1 variants={childVariants} className="clubName">{clubData?.name}</motion.h1>
                        <motion.div variants={childVariants} className="book-button-div">
                            <h3 className="clubSlogan">Book Your Games at {clubData?.name}</h3>
                            <div className="button-div">
                                <button className="book-button price">AED {clubData?.normalHrRates}</button>
                                <button className="book-button"><a href={`tel:${clubData?.phoneNo}`}>Call Now</a></button>
                            </div>
                        </motion.div>
                        <motion.div variants={childVariants} className="slogan-price-div">
                            <h4 className="clubSlogan2">{clubData?.slogan}</h4>
                            <button className="book-button2">AED {clubData?.normalHrRates}</button>
                        </motion.div>
                        <motion.div variants={childVariants} className="place-time">
                            <div className="place">
                                <MdOutlinePlace />
                                <div onClick={handleOpenGoogleMap}>
                                    <h1>{clubData?.address},</h1>
                                    <h2>{clubData?.city}</h2>
                                </div>
                            </div>
                            <div className="time">
                                <LuClock9 /> {convertTo12HourFormat(clubData?.openTime)} to {convertTo12HourFormat(clubData?.closeTime)}
                            </div>
                            <div className="time">
                                <span>AED:</span> {clubData?.normalHrRates}
                            </div>
                        </motion.div>
                        <motion.div variants={childVariants} className="happy-hour">
                            <h2>Happy Hours</h2>
                            <div className="time-price">
                                <div className="time">
                                    <LuClock9 /> {convertTo12HourFormat(clubData?.openTime)} to {convertTo12HourFormat(clubData?.closeTime)}
                                </div>
                                <div className="time">
                                    <span>AED:</span> {clubData?.happyHrRates}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                    <div className="pagination-dots">
                        {images?.map((_, index) => (
                            <div
                                key={index}
                                className={`dot ${index === currentIndex ? "active" : ""}`}
                                onClick={() => handleDotClick(index)}
                            ></div>
                        ))}
                    </div>
                </div>
            </section> */}
            <section>
                <div className="club-detail-hero container-section">
                    <div className="hero-section">
                        <div className="club-details">
                            <h1 className="club-name">{clubData?.name}</h1>
                            {clubData?.slogan && <h2 className="club-slogan">{clubData?.slogan}</h2>}
                            <div className="club-location">
                                <MdOutlinePlace />
                                <div onClick={handleOpenGoogleMap}>
                                    {clubData?.address && <p>{clubData?.address},</p>}
                                    <p>{clubData?.city}</p>
                                </div>
                            </div>
                            <h1 className="contact-info-head">Call for Bookings:</h1>
                            <div className="contact-info">
                                {clubData?.phoneNo && <a href={`tel:${clubData?.phoneNo}`}> <div className="contact"><MdPhone /> <p>{clubData?.phoneNo}</p></div></a>}
                                {clubData?.landLineNo && <a href={`tel:${clubData?.landLineNo}`}> <div className="contact"><TbDeviceLandlinePhone /> <p>{clubData?.landLineNo}</p></div></a>}
                                {clubData?.emailAddress && <a href={`mailto:${clubData?.emailAddress}`}> <div className="contact"><MdEmail /> <p>{clubData?.emailAddress}</p></div></a>}
                                {clubData?.webSite && <a href={clubData?.webSite}> <div className="contact"><CgWebsite /> <p>{clubData?.webSite}</p></div></a>}
                                {clubData?.youtubevideo && <a href={clubData?.youtubevideo}> <div className="contact"><CgYoutube /> <p>Click here to Watch Video</p></div></a>}
                            </div>
                        </div>
                        <div className="club-image">
                            <img src={clubData?.pictureGallery[0]?.path} alt="" />
                        </div>
                    </div>
                    <div className="hero-section reverse">
                        {(clubData?.introductionObjtv || (clubData?.normalHrRates || (clubData?.openTime && clubData?.closeTime)) ||  (clubData?.happyHrRates || (clubData?.startTime && clubData?.endTime))) && (
                            <div className="club-details">
                                {clubData?.introductionObjtv && <div className="club-intro">
                                    <h1>Club Introduction and Their Objective</h1>
                                    <p>{clubData?.introductionObjtv}</p>
                                </div>}
                                <div className="club-hours">
                                    {(clubData?.normalHrRates || (clubData?.openTime && clubData?.closeTime)) && <div className="working-hours">
                                        <h1>Working Hours</h1>
                                        {(clubData?.openTime && clubData?.closeTime) && <div className="time"><LuClock9 /> {convertTo12HourFormat(clubData?.openTime)} to {convertTo12HourFormat(clubData?.closeTime)}</div>}
                                        {clubData?.normalHrRates && <div className="btn-style">AED <span className="price-value">{clubData?.normalHrRates}</span></div>}
                                    </div>}
                                    {(clubData?.happyHrRates || (clubData?.startTime && clubData?.endTime)) && <div className="working-hours">
                                        <h1>Happy Hours</h1>
                                        {(clubData?.startTime && clubData?.endTime) && <div className="time"><LuClock9 /> {convertTo12HourFormat(clubData?.startTime)} to {convertTo12HourFormat(clubData?.endTime)}</div>}
                                        {clubData?.happyHrRates && <div className="btn-style">AED <span className="price-value">{clubData?.happyHrRates}</span></div>}
                                    </div>}
                                </div>
                                {clubData?.introductionObjtv && <a href={`tel:${clubData?.phoneNo}`} className="book-btn"><div className="btn-style">
                                    Book Now
                                </div></a>}
                            </div>
                        )}
                        <div className="club-image">
                            <img src={clubData?.pictureGallery[1]?.path} alt="" />
                        </div>
                    </div>
                    {(foodServices?.length > 0 || otherServices?.length > 0) && (
                        <div className="club-services">
                            {otherServices.length > 0 &&
                            <div className="food-services-section">
                                <div className="food-services-head">
                                    <h1>Club Services</h1>
                                </div>
                                <div className="food-services">
                                    {otherServices?.filter(ele=> ele.name !== "Other Services")?.map((ele, index) => {
                                        const bgColor = lightThemeColors[index % lightThemeColors.length];
                                        return (
                                            <div key={ele.id}
                                            className="food-service"
                                            style={{ backgroundColor: bgColor }}>
                                                <div className="food-service-icon">
                                                    {iconsMap[ele.name]}<br/>
                                                </div>
                                                <div className="food-service-name">
                                                    <p className="name">{ele.name}</p>
                                                    {ele.name === "Ages allowed in the club" && <p> (Minors will be accompanied by guardians)</p>}
                                                </div>
                                                <div className="food-service-description">
                                                    {ele.description}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            }
                            {foodServices.length> 0 && <div className="food-services-section">
                                <div className="food-services-head">
                                    <h1>Food Services</h1>
                                </div>
                                <div className="food-services">
                                    {foodServices?.map((ele, index) => {
                                        const bgColor = lightThemeColors2[index % lightThemeColors2.length];
                                        return (
                                            <div key={ele.id} 
                                            className="food-service"
                                            style={{ backgroundColor: bgColor }}>
                                                <div className="food-service-icon">
                                                    {iconsMap[ele.name]}
                                                </div>
                                                <div className="food-service-name">
                                                    {ele.name}
                                                </div>
                                                <div className="food-service-description">
                                                    {ele.description}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>}

                            {otherService && (
                                <div className="food-services-section">
                                <div className="food-services-head">
                                    <h1>Other Services</h1>
                                </div>
                                <div className="food-services">
                                    <div key={otherService.id}
                                        className="food-service"
                                        style={{ backgroundColor: "#F5F5DC" }}>
                                        <div className="food-service-icon">
                                            {iconsMap[otherService.name]}<br/>
                                        </div>
                                        <div className="food-service-name">
                                            <p className="name">{otherService.name}</p>
                                            {otherService.name === "Ages allowed in the club" && <p> (Minors will be accompanied by guardians)</p>}
                                        </div>
                                        <div className="food-service-description">
                                            {otherService.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                    )}
                    <div className="hero-section">
                        {(clubData?.description || clubData?.history || (clubData?.socialMedialinks.length > 0 || clubData?.youtubevideo || clubData?.webSite)) && (
                            <div className="club-details">
                                {clubData?.description && <div className="club-intro">
                                    <h1>Why they should choose "Our Club"? </h1>
                                    <p>{clubData?.description}</p>
                                </div>}
                                {clubData?.history && <div className="club-intro">
                                    <h1>History of the Club</h1>
                                    <p>{clubData?.history}</p>
                                </div>}
                                {(clubData?.socialMedialinks.length > 0 || clubData?.youtubevideo || clubData?.webSite) && <div className="social-media-links">
                                    <h1 variants={childVariants} className="social-link-head">Social Links</h1>
                                    <p variants={childVariants}>Get featured in our social media by tagging us at below platforms</p>
                                    <div variants={childVariants} className="social-links">
                                        <a href={clubData?.socialMedialinks[0]?.link}>
                                            <div className="social facebook">
                                                <FaFacebookF style={{marginTop:"10px"}}/>
                                            </div>
                                            <p>Facebook</p>
                                        </a>
                                        <a href={clubData?.socialMedialinks[1]?.link}>
                                            <div className="social instagram">
                                                <FaInstagram />
                                            </div>
                                            <p>Instagram</p>
                                        </a>
                                        <a href={clubData?.socialMedialinks[1]?.link}>
                                            <div className="social tiktok">
                                                <FaTiktok />
                                            </div>
                                            <p>Tiktok</p>
                                        </a>
                                        <a href={clubData?.website}>
                                            <div className="social website">
                                                <CgWebsite />
                                            </div>
                                            <p>Website</p></a>
                                        {/* <a href={clubData?.youtubevideo}>
                                            <div className="social youtube">
                                                <FaYoutube />
                                            </div>
                                            <p>Youtube</p>
                                        </a> */}
                                    </div>
                                </div>}
                            </div>
                        )}
                        <div className="club-image">
                            <img src={clubData?.pictureGallery[2]?.path} alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="callout-box container-section">
                    <motion.div 
                        variants={textVariants}
                        initial="initial2"
                        whileInView="animate2"
                        viewport={{ once: false, amount: 0.5 }}
                        className="callout-text">
                        <motion.h2 variants={childVariants}>Register with <span>our club</span> today & avail all the benefits</motion.h2>
                        <motion.p variants={childVariants}>
                        Join our club today and enjoy exclusive perks, special discounts, and premium services! Sign up now to unlock a world of benefits tailored just for you.
                        </motion.p>
                    </motion.div>
                    <motion.div 
                        variants={textVariants}
                        initial="initial2"
                        whileInView="animate2"
                        viewport={{ once: false, amount: 0.5 }}
                        className="callout-buttons">
                        <motion.button variants={childVariants} className="callout-btn hotel-btn"><a href={`tel:${clubData?.phoneNo}`}>Book club</a></motion.button>
                        <motion.button variants={childVariants} className="callout-btn hotel-btn"><a href="#upcoming-events">Play Tournaments</a></motion.button>
                    </motion.div>
                </div>
            </section>
            {/* <section>
                <div className="why-club">
                    {clubData?.youtubevideo && (
                        <div className="video-player">
                            <ReactPlayer url={clubData?.youtubevideo} className="video" playing={false} muted={true} controls/>
                        </div>
                    )}
                    <motion.div 
                        variants={textVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: false, amount: 0.25 }}
                        className="why-club-text">
                        {clubData?.description && (
                            <div className="why-club-top">
                                <motion.h1 variants={childVariants} className="why-club-title">Why Choose {clubData?.name}?</motion.h1>
                                <motion.p variants={childVariants} className="why-club-desc">{clubData?.description}  
                                </motion.p>
                            </div>
                        )}
                        {((clubData?.socialMedialinks?.length > 1) || (clubData?.website)) && (
                            <div className="why-club-bottom">
                                <motion.h1 variants={childVariants} className="social-link-head">Social Links</motion.h1>
                                <motion.p variants={childVariants}>Get featured in out social media by tagging us at below platforms</motion.p>
                                <motion.div variants={childVariants} className="social-links">
                                    <a href={clubData?.socialMedialinks[0]?.link}><div className="social facebook">
                                        <FaFacebookF style={{marginTop:"10px"}}/>
                                        <p>Facebook</p>
                                    </div></a>
                                    <a href={clubData?.socialMedialinks[1]?.link}><div className="social instagram">
                                        <FaInstagram />
                                        <p>Instagram</p>
                                    </div></a>
                                    <a href={clubData?.socialMedialinks[1]?.link}><div className="social tiktok">
                                        <FaTiktok />
                                        <p>Tiktok</p>
                                    </div></a>
                                    <a href={clubData?.website}><div className="social website">
                                        <CgWebsite />
                                        <p>Website</p>
                                    </div></a>
                                </motion.div>
                            </div>
                        )}
                        {clubData?.contactPerson && (
                            <div className="contact-details-div">
                                <motion.h1 variants={childVariants} className="contact-us-head">Contact Us</motion.h1>
                                <motion.div variants={childVariants} className="contact-us">
                                    {clubData?.contactPerson && <p><span>Contact Person: </span>{clubData?.contactPerson}</p>}
                                    <p><span>Phone: </span><a href={`tel:${clubData?.phoneNo}`}>{clubData?.phoneNo}</a></p>
                                    {clubData?.landLineNo && <p><span>LandLine: </span><a href={`tel:${clubData?.landLineNo}`}>{clubData?.landLineNo}</a></p>}
                                    <p><span>Email: </span><a href={`mailto:${clubData?.emailAddress}`}>{clubData?.emailAddress}</a></p>
                                </motion.div>
                            </div>
                        )}
                    </motion.div>
                    
                </div>
            </section> */}
            {/* <section>
                <div className="club-services container-section">
                    <div className="food-services-section">
                        <div className="food-services-head">
                            <h1>Club Services</h1>
                        </div>
                        <div className="food-services">
                            {otherServices?.map((ele) => {
                                return (
                                    <div key={ele.id} className="food-service">
                                        <div className="food-service-icon">
                                            {iconsMap[ele.name]}
                                        </div>
                                        <div className="food-service-name">
                                            {ele.name}
                                        </div>
                                        <div className="food-service-description">
                                            {ele.description}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="food-services-section">
                        <div className="food-services-head">
                            <h1>Food Services</h1>
                        </div>
                        <div className="food-services">
                            {foodServices?.map((ele) => {
                                return (
                                    <div key={ele.id} className="food-service">
                                        <div className="food-service-icon">
                                            {iconsMap[ele.name]}
                                        </div>
                                        <div className="food-service-name">
                                            {ele.name}
                                        </div>
                                        <div className="food-service-description">
                                            {ele.description}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section> */}
            {/* <section id="upcoming-events">
                <div className="upcoming-events container-section">
                    <div className="heading">
                        <h1 className='main-heading'>Upcoming Events</h1>
                        <hr className="hr-1"/><hr className="hr-2"/>
                        <h3 className="second-heading">all</h3>
                    </div>
                    <hr className="hr"/>
                    {clubEvents.length !== 0 ? (
                        clubEvents.slice(0, 3)?.map((ele) => {

                            const date = formatDate(ele.StartingDate);
                            const [day, month, year] = date.split("-");
                            const monthNames = [
                            "January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"
                            ];

                            const monthName = monthNames[parseInt(month, 10) - 1];
                            return (
                                <>
                                    <div className="events">
                                        <div className="img-div">
                                            <img src={ele.EventImage ? ele.EventImage : addImage} alt="event-image" />
                                        </div>
                                        <div className="event-info">
                                            <div className="left">
                                                {day}
                                                <span>{monthName.slice(0,3)} {year}</span>
                                            </div>
                                            <div className="right">
                                                <h1>{ele.EventName}</h1>
                                                <div className="time">
                                                <div className="arrow" onClick={() => {navigate(`/events/${ele.EventName.replace(/\s+/g, '-').toLowerCase()}`)}}><IoIosArrowRoundForward /></div>
                                                    <span>05:00 PM</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </>
                            )
                        })
                    ) : (
                        <div className="events-comingsoon">
                            <img src={comimgSoon} alt="" />
                        </div>
                    )}
                </div>
            </section> */}
            <section>
                <div className="about-us container-section">
                    <motion.div 
                        variants={textVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: false, amount: 0.25 }}
                        className="history">
                        <motion.h2 variants={childVariants} className="history-title">Club Gallery</motion.h2>
                        {/* <motion.p variants={childVariants}>{clubData?.history}</motion.p> */}
                        <motion.div 
                            variants={textVariants}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: false, amount: 0.25 }}
                            className="gallery">
                            {images?.map((ele, index) => (
                                <motion.div key={index} className="gallery-item" onClick={() => openLightbox(index)}>
                                    <img src={ele.path} alt={`Gallery ${index + 1}`}/>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
                {isOpen && (
                    <Lightbox
                        mainSrc={images[currentIndex1].path}  // Access the 'path' property
                        nextSrc={images[(currentIndex1 + 1) % images.length].path}  // Same here
                        prevSrc={images[(currentIndex1 - 1 + images.length) % images.length].path}  // And here
                        onCloseRequest={closeLightbox}
                        onMovePrevRequest={goToPrev}
                        onMoveNextRequest={goToNext}
                    />
                )}
            </section>
            <section>
                <motion.div 
                    variants={textVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: false, amount: 0.25 }}
                    className="book-now-box">
                    <div className="left">
                        <motion.h1 variants={childVariants}>BOOK YOUR PARTY</motion.h1>
                        <motion.p variants={childVariants}>Gather your friends, choose your dates and experience Paradise!</motion.p>
                    </div>
                    <motion.button variants={childVariants}><a href={`tel:${clubData?.phoneNo}`}>Book Now</a></motion.button>
                </motion.div>
            </section>
        </Fragment>
    )
}