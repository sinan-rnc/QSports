import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import "./Highlights.scss"

import img1 from "../../../Assets/Highlights/img1.jpeg"
import img2 from "../../../Assets/Highlights/img2.jpeg"
import img3 from "../../../Assets/Highlights/img3.jpeg"
import img4 from "../../../Assets/Highlights/img4.jpeg"
// import img5 from "../../../Assets/Highlights/img5.jpeg"
// import img6 from "../../../Assets/Highlights/img6.jpeg"
// import img7 from "../../../Assets/Highlights/img7.jpeg"
// import img8 from "../../../Assets/Highlights/img8.jpeg"
import img9 from "../../../Assets/Highlights/img9.jpeg"
import img10 from "../../../Assets/Highlights/img10.jpeg"
import img11 from "../../../Assets/Highlights/img11.jpeg"
import img12 from "../../../Assets/Highlights/img12.jpeg"
import { useEffect, useState } from 'react';

export default function Highlights() {
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
    return (
        <section>
            <div className="highlights container-section">
                <div className="heading-div">
                    <div className='heading'>
                        <h1 className='main-heading'>HighLights 2024</h1>
                        <hr className="hr-1"/><hr className="hr-2"/>
                    </div>
                    <h3 className="second-heading">Immerse yourself in the pulse of the game!<br/>Capture and share your exciting action shots on @qsports and join our vibrant Instagram community.</h3>
                </div>
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    navigation={{
                        nextEl: '.next-arrow1',
                        prevEl: '.prev-arrow1',
                    }}
                    pagination={false}
                    spaceBetween={20}
                    slidesPerView={screenWidth >= 2000 ? 5 : screenWidth >= 1200 ? 4 : screenWidth >= 800 ? 3 : 2}
                    loop={true}
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                      }}
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
                    className="highlights-container"
                >
                    <SwiperSlide>
                        <div className="img-container">
                            <img src={img1} alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="img-container">
                            <img src={img2} alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="img-container">
                            <img src={img3} alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="img-container">
                            <img src={img4} alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="img-container">
                            <img src={img9} alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="img-container">
                            <img src={img10} alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="img-container">
                            <img src={img11} alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="img-container">
                            <img src={img12} alt="" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    )
}