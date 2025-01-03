import { Fragment, useState } from "react"
import { motion } from "framer-motion"
// import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css';
import ReactPlayer from "react-player"

import { MdOutlinePlace } from "react-icons/md"
import { LuClock9 } from "react-icons/lu"
import { RiArrowLeftWideLine, RiArrowRightWideLine } from "react-icons/ri"
import "./ClubDetailPage.scss"

import herobanner1 from "../../../Assets/Bars&Clubs/8.jpg"
import herobanner2 from "../../../Assets/Bars&Clubs/9.jpg"
import herobanner3 from "../../../Assets/Bars&Clubs/10.jpg"
import herobanner4 from "../../../Assets/Bars&Clubs/12.jpg"
import herobanner5 from "../../../Assets/Bars&Clubs/4.jpg"
import herobanner6 from "../../../Assets/Bars&Clubs/7.jpg"
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function ClubDetailPage() {
    const images = [herobanner1, herobanner2, herobanner3, herobanner4, herobanner5, herobanner6];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [currentIndex1, setCurrentIndex1] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const openLightbox = (index) => {
        console.log('Opening image:', index);
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
                        <img src={images[currentIndex]} alt="Club Banner" className="banner" />
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
                        <motion.h1 variants={childVariants} className="clubName">Neon Nights Club</motion.h1>
                        <motion.div variants={childVariants} className="book-button-div">
                            <h3 className="clubSlogan">Book Your Games at Neon Nights Club</h3>
                            <button className="book-button">Call Now</button>
                        </motion.div>
                        <motion.h4 variants={childVariants} className="clubSlogan2">The true Paradise Experience</motion.h4>
                        <motion.div variants={childVariants} className="place-time">
                            <div className="place">
                                <MdOutlinePlace />
                                <div>
                                    <h1>Dubai Marina</h1>
                                    <h2>Dubai, UAE</h2>
                                </div>
                            </div>
                            <div className="time">
                                <LuClock9 /> 9:00 PM to 12:00 AM
                            </div>
                        </motion.div>
                    </motion.div>
                    <div className="pagination-dots">
                        {images.map((_, index) => (
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
                        <motion.h2 variants={childVariants}>VOTED #3 <span>BEST CLUB</span> IN THE WORLD</motion.h2>
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
                        <motion.button variants={childVariants} className="callout-btn hotel-btn">Book club</motion.button>
                        <motion.button variants={childVariants} className="callout-btn hotel-btn">Play Tournaments</motion.button>
                    </motion.div>
                </div>
            </section>
                        <section>
                <div className="why-club">
                    <div className="video-player">
                        <ReactPlayer url="https://youtu.be/Up9JSdyP2mM?si=cTVgCmzvgD76-WD3" className="video" playing={true} muted={true} controls/>
                    </div>
                    <motion.div 
                        variants={textVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: false, amount: 0.25 }}
                        className="why-club-text">
                        <div className="why-club-top">
                            <motion.h1 variants={childVariants} className="why-club-title">Why Choose Neon Nights Club?</motion.h1>
                            <motion.p variants={childVariants} className="why-club-desc">Neon Nights Club stands out as the ultimate destination for nightlife enthusiasts, offering an unmatched blend of vibrant ambiance, exceptional service, and world-class entertainment. Our club boasts a state-of-the-art sound system, dazzling light displays, and a luxurious interior designed to provide an unforgettable experience. Whether you're here to dance the night away or relax in our exclusive lounge areas, Neon Nights Club caters to every mood and preference. We take pride in hosting themed nights, celebrity performances, and exciting future programs that ensure there's always something fresh and exhilarating for our guests. With a convenient location, top-tier security, and a dedicated team committed to exceeding expectations, Neon Nights Club guarantees an unparalleled nightlife experience.  
                            </motion.p>
                        </div>
                        <div className="why-club-bottom">
                            <motion.h1 variants={childVariants} className="social-link-head">Social Links</motion.h1>
                            <motion.p variants={childVariants}>Get featured in out instagram by tagging us @neonnightclub.</motion.p>
                            <motion.div variants={childVariants} className="social-links">
                                <div className="social instagram">
                                    <FaInstagram />
                                    <p>Instagram</p>
                                </div>
                                <div className="social facebook">
                                    <FaFacebookF style={{marginTop:"10px"}}/>
                                    <p>Facebook</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
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
                        <motion.p variants={childVariants}>Neon Nights Club first opened its doors in 2010, quickly becoming a landmark in the city's nightlife scene. In its early days, the club offered an intimate yet electrifying atmosphere, attracting a diverse crowd of partygoers and music lovers. The club’s opening was marked by an exclusive launch party featuring renowned DJs, setting the tone for the many unforgettable nights to come. Over the years, it hosted a wide array of exciting events, from live music performances to themed parties and international DJ sets. As the club evolved, it expanded its programs to include high-profile celebrity appearances, dance competitions, and private events, all while staying true to its mission of providing a unique and dynamic nightlife experience for its patrons. Today, Neon Nights Club continues to be a trendsetter, constantly evolving to meet the desires of its ever-growing fan base.</motion.p>
                        <motion.div 
                            variants={textVariants}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: false, amount: 0.25 }}
                            className="gallery">
                            {images.map((ele, index) => (
                                <motion.div key={index} className="gallery-item" onClick={() => openLightbox(index)}>
                                    <img src={ele} alt={`Gallery ${index + 1}`}/>
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
                    <motion.button variants={childVariants}>Book Now</motion.button>
                </motion.div>
            </section>
        </Fragment>
    )
}