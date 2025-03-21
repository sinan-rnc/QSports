import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { barsAndClubs } from "../../../DataSet/barsAndClubs"

import "./RecentBars.scss"
import addImage from "../../../Assets/Common/add-image.jpg"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function RecentBars() {
    const navigate = useNavigate()
    const clubsAndBars = useSelector((state) => {
        return state?.clubsAndBars?.data
            .filter(ele => !ele?.isDeleted && ele?.clubType === "Bar")
    })
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
        <section className="recentBars" id="recentBars">
            {clubsAndBars.length >= 1 && (
                <div className="recentBars-section container-section">
                    <div className="recentBars-header">
                        <div className='header-top'>
                            <div className="heading">
                                <h1 className='main-heading'>Recent Bars</h1>
                                <hr className="hr-1"/><hr className="hr-2"/>
                                <h3 className="second-heading">New</h3>
                            </div>
                            <div className="arrow-div">
                                {/* <h4 className="active">Upcoming Events</h4>
                                <h4>Ongoing Events</h4> */}
                                <a href="/bars"><h4>Show All</h4></a>
                                <button className="arrow-bar prev-arrow-bar"><span>❮</span></button>
                                <button className="arrow-bar next-arrow-bar"><span>❯</span></button>
                            </div>
                        </div>
                        {/* <img src={stick} alt="" className="stick"/> */}
                        {/* <hr/> */}
                    </div>
                    <Swiper
                        modules={[ Navigation, Pagination]}
                        navigation={{
                            nextEl: '.next-arrow-bar',
                            prevEl: '.prev-arrow-bar',
                        }}
                        pagination={false}
                        spaceBetween={20}
                        slidesPerView={screenWidth >= 2000 ? 4 : screenWidth >= 1200 ? 3 : screenWidth >= 800 ? 2 : 1}
                        // loopFillGroupWithBlank= {true}
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
                        className="recentBars-grid"
                    >
                        {clubsAndBars.map((ele, index) => (
                            <SwiperSlide key={index}>
                                <div className="recentBars-card" onClick={() => {navigate(`/clubs/${ele.name.replace(/\s+/g, '-').toLowerCase()}`)}}>
                                    <div className="recentBars-image">
                                        {/* <MdOutlineZoomOutMap /> */}
                                        {ele.image ? <img src={ele.image} alt=""/> : <img src={addImage} alt=""/>}
                                    </div>
                                    <div className="recentBars-details">
                                    <div className="left">
                                        <h3>{ele.name}</h3>
                                        <p>{ele.city}</p>
                                        <div className="rating">
                                            <span className="star">&#9733;</span>
                                            <span className="star">&#9733;</span>
                                            <span className="star">&#9733;</span>
                                            <span className="star">&#9733;</span>
                                            <span className="star">&#9733;</span>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <p className="price">AED {ele.normalHrRates}</p>
                                        <button><a href={`tel:${ele.phoneNo}`}>Book Now</a></button>
                                        {/* <ImEnlarge /> */}
                                    </div>
                                </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </section>
    )
}