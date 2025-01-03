import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { tournaments } from "../../../DataSet/tournaments"

import "./TopTournaments.scss"

export default function TopTournaments() {
    return (
        <section className="tournaments">
            <div className="tournament-section container-section">
                <div className="tournament-header">
                    <button className="arrow prev-arrow"><span>❮</span></button>
                    <h2>Top Tournaments</h2>
                    <button className="arrow next-arrow"><span>❯</span></button>
                </div>
                <Swiper
                    modules={[EffectCoverflow, Navigation, Pagination]}
                    navigation={{
                        nextEl: '.next-arrow',
                        prevEl: '.prev-arrow',
                    }}
                    pagination={{ clickable: true }}
                    spaceBetween={40}
                    slidesPerView={3}
                    loop={true}
                    autoplay={{
                        delay: 3000, // Delay in milliseconds between slides
                        disableOnInteraction: false, // Autoplay won't stop on interaction
                      }}
                    speed={1000}
                    autoplaySpeed={2000}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 50,
                        modifier: 1,
                        slideShadows: false, 
                      }}
                    className="tournament-grid"
                >
                    {tournaments.slice(0, 6).map((ele, index) => (
                        <SwiperSlide key={index}>
                            <div className="tournament-card">
                                <div className="tournament-image">
                                    <img src={ele.image} alt="" />
                                </div>
                                <div className="tournament-details">
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