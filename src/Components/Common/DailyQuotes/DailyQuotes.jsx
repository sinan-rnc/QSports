import "./DailyQuotes.scss"

import quote from "../../../Assets/Common/blockquote.svg"

export default function DailyQuotes() {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    // Format the date as "YYYY-MM-DD"
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;

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
                    <h1 className="quotepara">Believe you can and you're halfway there.</h1>
                    <p className="author">- Theodore Roosevelt</p>
                </div>
            </div>
        </section>
    )
}