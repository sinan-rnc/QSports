import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import stick from "../../../Assets/Common/Billiard-Stick.png"

import "./UpcomingEvents.scss"
import { MdOutlineZoomOutMap } from 'react-icons/md';
import { tournaments } from '../../../DataSet/tournaments';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import addImage from "../../../Assets/Common/add-image.jpg"

export default function UpcomingEvents() {
    const navigate = useNavigate()
    const [ filterBy, setFilterBy ] = useState("upcoming")

    const events = useSelector((state) => {
        return state.events.data
    })

    const getProcessedEvents = () => {
        const currentDate = new Date(); // Get the current date
    
        let filteredArray = events.filter((ele) => {
    
            // Filter based on event type (Upcoming or Outgoing)
            if (filterBy === "upcoming") {
                return new Date(ele.StartingDate) > currentDate; // Events that haven't started yet
            } else if (filterBy === "outgoing") {
                return new Date(ele.EndingDate) < currentDate; // Events that have already ended
            }
    
            return true; // If no event type is specified, return all events
        });
    
        return filteredArray;
    };
    

    // console.log(events)

    const formatDate = (isoDate) => {
        if (!isoDate) return "";  // Handle empty cases
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const [screenWidth, setScreenWidth] = useState(0);
    
        useEffect(() => {
          // Function to update screen size
          const updateScreenSize = () => {
            setScreenWidth(window.innerWidth);
          };
      
          // Initial size update
          updateScreenSize();
      
          // Add event listener for screen resize
          window.addEventListener("resize", updateScreenSize);
      
          // Cleanup on component unmount
          return () => {
            window.removeEventListener("resize", updateScreenSize);
          };
        }, []);
        // console.log(clubsAndBars)

    return (
        <section className="tournamentevents">
        <div className="tournamentevents-section container-section">
            <div className="tournamentevents-header">
                <div className='header-top'>
                    <div className="heading">
                        <h1 className='main-heading'>Upcoming Events</h1>
                        <hr className="hr-1"/><hr className="hr-2"/>
                        <h3 className="second-heading">New</h3>
                    </div>
                    <div className="arrow-div">
                        <h4 className={filterBy === "upcoming" ? "active" : ""} onClick={() => {setFilterBy("upcoming")}}>Upcoming Events</h4>
                        <h4 className={filterBy === "ongoing" ? "active" : ""} onClick={() => {setFilterBy("ongoing")}}>Ongoing Events</h4>
                        <a href="/events" ><h4>Show All</h4></a>
                        <button className="arrow1 prev-arrow2"><span>❮</span></button>
                        <button className="arrow1 next-arrow2"><span>❯</span></button>
                    </div>
                </div>
                {/* <img src={stick} alt="" className="stick"/> */}
                {/* <hr/> */}
            </div>
            <Swiper
                modules={[ Navigation, Pagination]}
                navigation={{
                    nextEl: '.next-arrow2',
                    prevEl: '.prev-arrow2',
                }}
                pagination={false}
                spaceBetween={20}
                slidesPerView={screenWidth >= 2000 ? 4 : screenWidth >= 1200 ? 3 : screenWidth >= 800 ? 2 : 1}
                loop={true}
                speed={1000}
                effect={'coverflow'}
                grabCursor={true}
                // centeredSlides={true}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 50,
                    modifier: 1,
                    slideShadows: false, 
                  }}
                className="tournamentevents-grid"
            >

                {getProcessedEvents().length >= 1 ? (
                    getProcessedEvents()?.map((ele, index) => (
                        <SwiperSlide key={index}>
                            <div className="tournamentevents-card" onClick={() => {navigate(`/events/${ele.EventName.replace(/\s+/g, '-').toLowerCase()}`)}}>
                                <div className="tournamentevents-image">
                                    {/* <MdOutlineZoomOutMap /> */}
                                    {/* <img src={ele.EventImage} alt="" /> */}
                                    {ele.EventImage ? <img src={ele.EventImage} alt=""/> : <img src={addImage} alt=""/>}
                                </div>
                                <div className="tournamentevents-details">
                                    <div className="top">
                                        <div className="left">
                                            <h3>{ele?.EventName}</h3>
                                            <p>{ele.EventType}</p>
                                            {/* <p>At {ele.ClubID}</p> */}
                                        </div>
                                        <div className="right">
                                            <p className="price">AED {ele.EnrollmentFee}</p>
                                            <p className="dateNTime">{formatDate(ele.StartingDate)}</p>
                                            <button>Register Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <div className="no-events">
                        <h2>No {filterBy} Events Found</h2>
                    </div>
                )}
                
            </Swiper>
        </div>
        </section>
    )
}