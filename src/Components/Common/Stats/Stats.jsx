import { FaCalendarCheck, FaHandshake } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { RiBilliardsFill } from "react-icons/ri";

import "./Stats.scss"

export default function Stats() {
    return (
        <section className="stats container">
            <div className="stats_div">
                <div className="stats">
                    <RiBilliardsFill />
                    <div>
                        <h1>Exciting Tournaments</h1>
                        <p>Compete and win big</p>
                    </div>
                </div>
                <div className="stats">
                    <FaCalendarCheck />
                    <div>
                        <h1>Hassle-Free Bookings</h1>
                        <p>Book your spot now</p>
                    </div>
                </div>
                <div className="stats">
                    <GrUpdate />
                    <div>
                        <h1>Real-Time Updates</h1>
                        <p>Stay updated effortlessly</p>
                    </div>
                </div>
                <div className="stats">
                    <FaHandshake />
                    <div>
                        <h1>Exclusive Deals</h1>
                        <p>Save more, party more</p>
                    </div>
                </div>
            </div>
            <hr/>
        </section>
    )
}