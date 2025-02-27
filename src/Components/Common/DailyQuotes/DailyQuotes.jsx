import "./DailyQuotes.scss"

import quote from "../../../Assets/Common/blockquote.svg"
import axios from "axios";
import { backendApi } from "../../../Apis/api";
import { useEffect, useState } from "react";

export default function DailyQuotes() {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    // Format the date as "YYYY-MM-DD"
    const formattedDate = `${day.toString().padStart(2, "0")}-${month.toString().padStart(2, "0")}-${year}`;

    const [quoteOfTheDay, setQuoteOfTheDay] = useState("");
    // console.log(quoteOfTheDay)

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${backendApi}/quote/read-quote-of-the-day`, {})
                // console.log(response.data.data)
                setQuoteOfTheDay(response.data.data)
            } catch(err) {
                // console.log(err);
                // alert(err.response.data.message)
            }
        }) ()
    }, [setQuoteOfTheDay])

    return (
        <section>
            <div className="quotes-section">
                <div className="heading">
                    <h1 className='main-heading'>Quote of the Day</h1>
                    <hr className="hr-1"/><hr className="hr-2"/>
                    <h3 className="second-heading">{formattedDate}</h3>
                </div>
                <div className="quote-container">
                    <blockquote className="quote">
                        <img className="top-quote" src={quote} alt="quote" />
                        <img className="bottom-quote" src={quote} alt="quote" />
                    </blockquote>
                    {quoteOfTheDay ? (
                        <>
                            <h1 className="quotepara">{quoteOfTheDay?.quote}</h1>
                            <p className="author">- {quoteOfTheDay?.author}</p>
                        </>
                    ) : (
                        <h1 className="quotepara">No Quote for Today</h1>
                    )}
                    
                </div>
            </div>
        </section>
    )
}