import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { barsAndClubs } from "../../../DataSet/barsAndClubs"

import "./RecentClubs.scss"

export default function RecentBars() {
    return (
        <section className="recentClubs" id="recentClubs">
            <div className="recentClubs-section container-section">
                <div className="recentClubs-header">
                    <div className='header-top'>
                        <div className="heading">
                            <h1 className='main-heading'>Recent Clubs</h1>
                            <hr className="hr-1"/><hr className="hr-2"/>
                            <h3 className="second-heading">New</h3>
                        </div>
                        <div className="arrow-div">
                            {/* <h4 className="active">Upcoming Events</h4>
                            <h4>Ongoing Events</h4> */}
                            <a href="/clubs"><h4>Show All</h4></a>
                            <button className="arrow-club prev-arrow-club"><span>❮</span></button>
                            <button className="arrow-club next-arrow-club"><span>❯</span></button>
                        </div>
                    </div>
                    {/* <img src={stick} alt="" className="stick"/> */}
                    {/* <hr/> */}
                </div>
                <Swiper
                    modules={[ Navigation, Pagination]}
                    navigation={{
                        nextEl: '.prev-arrow-club',
                        prevEl: '.next-arrow-club',
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
                    className="recentClubs-grid"
                >
                    {barsAndClubs.filter(ele => ele.category === "Club").map((ele, index) => (
                        <SwiperSlide key={index}>
                            <div className="recentClubs-card">
                                <div className="recentClubs-image">
                                    {/* <MdOutlineZoomOutMap /> */}
                                    <img src={ele.image} alt="" />
                                </div>
                                <div className="recentClubs-details">
                                <div className="left">
                                    <h3>{ele.name}</h3>
                                    <p>{ele.city}</p>
                                    <div classNameName="rating">
                                        <span classNameName="star">&#9733;</span>
                                        <span classNameName="star">&#9733;</span>
                                        <span classNameName="star">&#9733;</span>
                                        <span classNameName="star">&#9733;</span>
                                        <span classNameName="star">&#9733;</span>
                                    </div>
                                </div>
                                <div className="right">
                                    <p className="price">AED {ele.amount}</p>
                                    <button>Book Now</button>
                                    {/* <ImEnlarge /> */}
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