import { Fragment, useEffect, useState } from "react"
import { motion } from "framer-motion"
// import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css';
import ReactPlayer from "react-player"

import { MdOutlinePlace } from "react-icons/md"
import { LuClock9, LuMoveRight } from "react-icons/lu"
import { RiArrowLeftWideLine, RiArrowRightWideLine } from "react-icons/ri"
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

    const clubEvents = useSelector((state) => {
        return state.events.data
            // .filter((ele => !ele.isDeleted))
            .filter(ele => ele.ClubID == clubData?._id)
    })

    // console.log(clubEvents)

    const images = clubData?.pictureGallery;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [currentIndex1, setCurrentIndex1] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

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

    return (
        <Fragment>
            <section>
                <div className="club-detailPage">
                    <motion.div
                        // key={currentIndex}
                        className="banner-wrapper"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        >
                        {images.length >= 1 ? <img src={images[currentIndex]?.path} alt="Club Banner" className="banner" /> : <img src={addImage} alt="Club Banner" className="banner" /> }
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
                            <button className="book-button"><a href={`tel:${clubData?.phoneNo}`}>Call Now</a></button>
                        </motion.div>
                        <motion.h4 variants={childVariants} className="clubSlogan2">{clubData?.slogan}</motion.h4>
                        <motion.div variants={childVariants} className="place-time">
                            <div className="place">
                                <MdOutlinePlace />
                                <div>
                                    <h1>{clubData?.city}</h1>
                                    <h2>Dubai, UAE</h2>
                                </div>
                            </div>
                            <div className="time">
                                <LuClock9 /> 9:00 PM to 3:00 AM
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
                <div className="callout-box container-section">
                    <motion.div 
                        variants={textVariants}
                        initial="initial2"
                        whileInView="animate2"
                        viewport={{ once: false, amount: 0.5 }}
                        className="callout-text">
                        <motion.h2 variants={childVariants}>VOTED AS <span>BEST CLUB</span> IN THE WORLD</motion.h2>
                        <motion.p variants={childVariants}>
                        Thousands of party goers embark on the beautiful Mykonos island every year, ready to enjoy an all-day experience at one of the most famous beach clubs in the world.
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
            <section>
                <div className="why-club">
                    {clubData?.youtubevideo && (
                        <div className="video-player">
                            <ReactPlayer url={clubData?.youtubevideo} className="video" playing={false} muted={true} controls/>
                        </div>
                    )}
                    {clubData.description && (
                    <motion.div 
                        variants={textVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: false, amount: 0.25 }}
                        className="why-club-text">
                        
                            <div className="why-club-top">
                                <motion.h1 variants={childVariants} className="why-club-title">Why Choose {clubData?.name}?</motion.h1>
                                <motion.p variants={childVariants} className="why-club-desc">{clubData?.description}  
                                </motion.p>
                            </div>
                    {clubData.socialMedialinks.length > 1 && (
                        <div className="why-club-bottom">
                            <motion.h1 variants={childVariants} className="social-link-head">Social Links</motion.h1>
                            <motion.p variants={childVariants}>Get featured in out instagram by tagging us @{clubData?.name.replace(/\s+/g, "").toLowerCase()}.</motion.p>
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
                            </motion.div>
                        </div>
                    )}
                    </motion.div>
                    )}
                </div>
            </section>
            <section id="upcoming-events">
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
                                            <img src={ele.EventImage} alt=""/>
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
            </section>
            <section>
                <div className="about-us container-section">
                    <motion.div 
                        variants={textVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: false, amount: 0.25 }}
                        className="history">
                        <motion.h2 variants={childVariants} className="history-title">History of the Club</motion.h2>
                        <motion.p variants={childVariants}>{clubData?.history}</motion.p>
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