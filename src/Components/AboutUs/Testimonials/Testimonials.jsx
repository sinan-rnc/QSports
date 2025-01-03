import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

import Quote from '../../../Assets/Common/blockquote.svg';

import "./Testimonials.scss"

const reviews = [
    {
        id: 1,
        name: 'Michael Johnson, Event Manager',
        companyName: 'Manchester United Supporters Club',
        text: 'Qsports has created a remarkable platform that connects clubs and bars seamlessly. Their attention to detail and commitment to building a vibrant community of players, fans, and owners is unmatched.',
    },
    {
        id: 2,
        name: 'Emma Thompson, Marketing Director',
        companyName: 'Barcelona Fan Club',
        text: 'The passion of Qsports for fostering camaraderie and engagement within the club and bar scene is evident in every aspect of their platform. It’s a one-stop destination for all enthusiasts.',
    },
    {
        id: 3,
        name: "David Williams, Operations Head",
        companyName: "Chelsea FC Social Club",
        text: 'Working with Qsports has been an absolute pleasure. Their dedication to creating engaging tournaments and comprehensive listings for top-tier clubs is commendable.',
    },
    {
        id: 4,
        name: "Sophia Martinez, Community Manager",
        companyName: "Real Madrid Supporters Club",
        text: 'Qsports truly stands out as a platform that brings players, fans, and club owners together under one roof. Their seamless registration systems and event management are exceptional.',
    },
    {
        id: 5,
        name: "Liam Brown, Club Organizer",
        companyName: "Juventus Fans Society",
        text: 'I have rarely come across a platform as dynamic and engaging as Qsports. Their commitment to providing top-notch experiences for club and bar enthusiasts is unparalleled.',
    },
    {
        id: 6,
        name: "Olivia Davis, Coordinator",
        companyName: "Bayern Munich Fan Club",
        text: 'Qsports has redefined the way we connect with clubs and bars. Their efforts to elevate experiences with tournaments and curated venues have set a new standard.',
    },
    {
        id: 7,
        name: "James Wilson, Founder",
        companyName: "Liverpool Legends Club",
        text: 'The Qsports platform is an outstanding example of innovation in the world of clubs and bars. Their vision of fostering engagement and fun is inspiring.',
    },
    {
        id: 8,
        name: "Ava White, Senior Organizer",
        companyName: "Paris Saint-Germain Supporters Association",
        text: 'Qsports has turned the simple idea of connecting enthusiasts into a dynamic platform that delivers exceptional value to clubs, bars, and their patrons.',
    },
    {
        id: 9,
        name: "Ethan Green, Membership Manager",
        companyName: "AC Milan Fan Network",
        text: 'What sets Qsports apart is their ability to provide a seamless experience for all involved – from players to club owners. Their passion and professionalism are unmatched.',
    },
    {
        id: 10,
        name: "Charlotte Taylor, Event Planner",
        companyName: "Inter Milan Supporters Club",
        text: 'Qsports has created a platform that not only connects clubs and bars but also fosters an engaging and fun community for everyone involved. Their attention to detail is exceptional.',
    },
    {
        id: 11,
        name: "William Harris, Engagement Lead",
        companyName: "Tottenham Hotspur Social Club",
        text: 'Qsports has proven to be a reliable partner in the club and bar scene. Their innovative approach to bringing players, fans, and owners together is truly groundbreaking.',
    },
    {
        id: 12,
        name: "Isabella Scott, Brand Manager",
        companyName: "Arsenal Gunners Community",
        text: 'The team at Qsports has done an outstanding job of creating a platform that elevates club and bar experiences. Their ability to foster engagement and fun is second to none.',
    },
];



export default function Testimonials() {
    return (
        <section id="testimonials" className="testimonial-container">
            <div className="heading">
                <h1 className='main-heading'>Testimonials</h1>
                <hr className="hr-1"/><hr className="hr-2"/>
                <h3 className="second-heading">What people says</h3>
            </div>
    
            <div className="slider-container">
                <blockquote>
                    <img className="top-quote quote" src={Quote} alt="quote" />
                    <img className="bottom-quote quote" src={Quote} alt="quote" />
                </blockquote>
        
                <Splide
                    options={{
                    perPage: 2,
                    gap: 40,
                    autoplay: true,
                    speed: 5000,
                    rewind: true,
                    rewindByDrag: true,
                    }}
                >
                    {reviews.map((review) => (
                    <SplideSlide key={review.id}>
                        {/* <img className="review-img" src={review.image} alt="" /> */}
                        <div className="content">
                        <p className="text">{review.text}</p>
                        <div className="info">
                            <div className="rating">
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                                <span className="star">&#9734;</span>
                            </div>
                            <p className="company">{review.companyName}</p>
                            <p className="user">{review.name}</p>
                        </div>
                        </div>
                    </SplideSlide>
                    ))}
                </Splide>
            </div>
        </section>
        );
    };