import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Fragment } from "react";
import { tournaments } from "../../../../DataSet/tournaments";
import { MdOutlineEmojiEvents, MdOutlinePlace } from "react-icons/md"
import { LuClock9 } from "react-icons/lu"
import { RiArrowLeftWideLine, RiArrowRightWideLine } from "react-icons/ri"

import "./EventDetailPage.scss"

import event1 from "../../../../Assets/Events/1.jpg"
import event2 from "../../../../Assets/Events/2.webp"
import event3 from "../../../../Assets/Events/3.jpg"
import event4 from "../../../../Assets/Events/4.jpg"
import event5 from "../../../../Assets/Events/5.jpg"
import event6 from "../../../../Assets/Events/6.jpg"

import image from "../../../../Assets/Tournaments/image4.png"
import { BsCalendarDate } from "react-icons/bs";
import { useSelector } from "react-redux";
import axios from "axios";
import { backendApi } from "../../../../Apis/api";
import { useAuth } from "../../../../Context/AuthContext";

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

export default function EventDetailPage() {
    const { user, setAlertMessage, setAlertMessageColor } = useAuth()
    const navigate = useNavigate()
    const {eventName} = useParams()
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    // const [eventClub, setEventClub] = useState("");

    const eventNameNew = eventName.replace(/-/g, ' ') // Replace hyphens with spaces
                                .split(' ') // Split the string by spaces
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalize first letter of each word
                                .join(' ')

    // console.log(eventNameNew)

    const eventData = useSelector((state) => {
        return state?.events?.data
            .find(ele => !ele?.isDeleted && ele?.EventName.toLowerCase() === eventNameNew.toLowerCase())
    })

    const eventClub = useSelector((state) => {
        return state?.clubsAndBars?.data
            .find(ele => !ele?.isDeleted && ele?._id === eventData?.ClubID)
    })

    // console.log(eventClub)

    const images = eventClub?.pictureGallery;
    // console.log(images)

    // useEffect(() => {
    //     if (eventData) {
    //         (async () => {
    //             try {
    //                 const response = await axios.post(`${backendApi}/club/read-club`, { _id: eventData?.ClubID })
    //                 console.log(response.data.data)
    //                 setEventClub(response.data.data)
    //             } catch(err) {
    //                 console.log(err);
    //                 alert(err.response.data.message)
    //             }
    //         }) ()
    //     }
    // }, [eventData])

    // console.log(eventData)
    // console.log(eventClub)
    // const eventData = tournaments.find(ele => ele.name === eventNameNew)

    const formatDate = (isoDate) => {
        if (!isoDate) return "";  // Handle empty cases
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
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

    useEffect(() => {
            window.scrollTo(0, 0); // Scroll to the top-left corner of the page
    }, []);

    const handleRegsiterEvent = async () => {
        if(!user) {
            setAlertMessage("Login to register for the event")
            setAlertMessageColor("red")
        } else {
            const formData = {
                EventID: eventData._id,
                UserID: user._id,
                Fee: eventData.EnrollmentFee,
                FeePaid: true
            }
            try {
                await axios.post(`${backendApi}/enrollment/create-enrollment`, formData, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setAlertMessage("Successfully registered for the event")
                setAlertMessageColor("green")
            } catch(err) {
                setAlertMessage("Unable to register for the event")
                setAlertMessageColor("red")
            }
            


        }

    }

    return (
        <Fragment>
            <section>
                <div className="event-detailPage">
                    <motion.div
                        // key={currentIndex}
                        className="banner-wrapper"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        >
                        {images && <img src={images[currentIndex]?.path} alt="Club Banner" className="banner" />}
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
                        <motion.h1 variants={childVariants} className="clubName">{eventData?.EventName}</motion.h1>
                        <motion.div variants={childVariants} className="book-button-div">
                            <h3 className="clubSlogan">Secure Your Spot at {eventData?.EventName}</h3>
                            <button className="book-button" onClick={handleRegsiterEvent}>
                                {/* <a href={`tel:${eventClub?.phoneNo}`}> */}
                                Register Now
                                {/* </a> */}
                            </button>
                        </motion.div>
                        <motion.h4 variants={childVariants} className="clubSlogan2">Unleash the Champion in You – The Premier Tournament Awaits!</motion.h4>
                        <motion.div variants={childVariants} className="place-time">
                            <div className="place">
                                <MdOutlinePlace />
                                <div>
                                    <h1>{eventClub?.name},</h1>
                                    <h1>
                                        {eventClub?.city},<br/>
                                        {eventClub?.address}</h1>
                                    <h2></h2>
                                </div>
                            </div>
                            <div className="type">
                                <MdOutlineEmojiEvents /> {eventData?.EventType}
                            </div>
                            
                            <div className="date">
                                <BsCalendarDate /> {formatDate(eventData?.StartingDate)}
                            </div>
                            <div className="time">
                                <LuClock9 /> 9:00 PM to 12:00 AM
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
            </section>
            <section>
                <div className="event-callout-box container-section">
                    <motion.div 
                        variants={textVariants}
                        initial="initial2"
                        whileInView="animate2"
                        viewport={{ once: false, amount: 0.5 }}
                        className="callout-text">
                        <motion.h2 variants={childVariants}>VOTED #{eventData?.id} <span>BEST TOURNAMENT</span> IN THE WORLD</motion.h2>
                        <motion.p variants={childVariants}>
                        Join thousands of fans in Dubai for an unforgettable experience at one of the most prestigious events in the heart of this iconic city.
                        </motion.p>
                    </motion.div>
                    <motion.div 
                        variants={textVariants}
                        initial="initial2"
                        whileInView="animate2"
                        viewport={{ once: false, amount: 0.5 }}
                        className="callout-buttons">
                        <motion.button variants={childVariants} className="callout-btn hotel-btn" onClick={() => {navigate(`/clubs/${eventClub?.name?.replace(/\s+/g, '-').toLowerCase()}`)}}>View club</motion.button>
                        <motion.button variants={childVariants} className="callout-btn hotel-btn"><a href={`tel:${eventClub?.phoneNo}`}>Register Tournaments</a></motion.button>
                    </motion.div>
                </div>
            </section>
            <section>
                <div className="event-about-us container-section">
                    <motion.div 
                        variants={textVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: false, amount: 0.25 }}
                        className="history">
                        <motion.h2 variants={childVariants} className="history-title">Legacy of Champions</motion.h2>
                        <motion.p className="history-description" variants={childVariants}>{eventClub?.name} has been a premier hub for tournaments and competitive events since 2010. Known for hosting iconic tournaments like The Cue Masters Cup and Dubai Championship League, the club has brought together top players and fans from around the world. Partnering with renowned venues like BreakPoint Arena, it has set new standards for thrilling matchups and elite competitions. With a rich legacy of past tournaments and a commitment to excellence, Eight Ball Showdown continues to shape the future of cue sports in Dubai.</motion.p>
                        {/* <motion.div 
                            variants={textVariants}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: false, amount: 0.25 }}
                            className="gallery">
                            {images.map((ele, index) => (
                                <motion.div key={index} className="gallery-item">
                                    <img src={ele} alt={`Gallery ${index + 1}`}/>
                                </motion.div>
                            ))}
                        </motion.div> */}
                        <div className="event-details">
                            <div className="left">
                                {/* <img src={eventData?.EventImage} alt=""/> */}
                                <img src={eventData?.EventImage} alt="" />
                            </div>
                            <div className="right">
                                <h1 className="event-name">{eventData?.EventName}</h1>
                                <h2 className="event-type">{eventData?.EventType}</h2>
                                <h3 className="event-fees">Fees: {eventData?.EnrollmentFee} AED</h3>
                                <div className="date-div">
                                    <div className="date">
                                        <span>From</span>
                                        <h3> {formatDate(eventData?.StartingDate)}</h3>
                                    </div>
                                    <div className="date">
                                        <span>To</span>
                                        <h3>{formatDate(eventData?.EndingDate)}</h3>
                                    </div>
                                </div>
                                <h4 className="enrollment-date">Last Enrollment Date: {formatDate(eventData?.LastEnrollmentDate)}</h4>
                                <h3 className="max-player">Max Player: {eventData?.MaxPlayers}</h3>
                                <p>{eventData?.EventName} is an electrifying pool and billiards league that brings together top cue sports enthusiasts for a thrilling competition. Players showcase their precision, strategy, and skill in an intense yet sportsmanlike environment. Whether you're a seasoned pro or a rising star, this league promises high-stakes matches, strategic play, and unforgettable moments on the table.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
                {/* {isOpen && (
                    <Lightbox
                        mainSrc={images[currentIndex1]}
                        nextSrc={images[(currentIndex1 + 1) % images.length]}
                        prevSrc={images[(currentIndex1 - 1 + images.length) % images.length]}
                        onCloseRequest={closeLightbox}
                        onMovePrevRequest={goToPrev}
                        onMoveNextRequest={goToNext}
                    />
                )} */}
            </section>
            <section>
                <motion.div 
                    variants={textVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: false, amount: 0.25 }}
                    className="register-now-box">
                    <div className="left">
                        <motion.h1 variants={childVariants}>REGISTER FOR THE TOURNAMENT</motion.h1>
                        <motion.p variants={childVariants}>Assemble your team, select your dates, and gear up for an unforgettable battle to claim victory and showcase your skills!</motion.p>
                    </div>
                    <div className="right">
                        <motion.button variants={childVariants}><a href={`tel:${eventClub?.phoneNo}`}>Register Now</a></motion.button>
                    </div>
                </motion.div>
            </section>
        </Fragment>
    )
}