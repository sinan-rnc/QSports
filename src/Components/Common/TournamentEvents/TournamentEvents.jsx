import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import stick from "../../../Assets/Common/Billiard-Stick.png"

import "./TournamentEvents.scss"
import { MdOutlineZoomOutMap } from 'react-icons/md';
import { tournaments } from '../../../DataSet/tournaments';
import { useNavigate } from 'react-router-dom';

export default function TournamentEvents() {
    const navigate = useNavigate()
    return (
        <section className="tournamentevents">
        <div className="tournamentevents-section container-section">
            <div className="tournamentevents-header">
                <div className='header-top'>
                    <div className="heading">
                        <h1 className='main-heading'>Tournament Events</h1>
                        <hr className="hr-1"/><hr className="hr-2"/>
                        <h3 className="second-heading">New</h3>
                    </div>
                    <div className="arrow-div">
                        <h4 className="active">Upcoming Events</h4>
                        <h4>Ongoing Events</h4>
                        <a href="/tournaments"><h4>Show All</h4></a>
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
                slidesPerView={3}
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
                {tournaments.map((ele, index) => (
                    <SwiperSlide key={index}>
                        <div className="tournamentevents-card" onClick={() => {navigate(`/events/${ele.name.replace(/\s+/g, '-').toLowerCase()}`)}}>
                            <div className="tournamentevents-image">
                                {/* <MdOutlineZoomOutMap /> */}
                                <img src={ele.image} alt="" />
                            </div>
                            <div className="tournamentevents-details">
                                <div className="top">
                                    <div className="left">
                                        <h3>{ele.name}</h3>
                                        <p>{ele.type}</p>
                                        <p>At {ele.clubName}</p>
                                    </div>
                                    <div className="right">
                                        <p className="price">AED {ele.fees}</p>
                                        <p className="dateNTime">{ele.date} at {ele.time}</p>
                                        <button>Register Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        </section>
    )
}