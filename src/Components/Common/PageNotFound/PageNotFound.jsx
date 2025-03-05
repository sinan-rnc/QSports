import image from "../../../Assets/Common/page-not-found.svg"
import "./PageNotFound.scss"

export default function PageNotFound() {
    return (
        <section className="page-not-found">
            <img src={image} alt=""/>
            <p>Go Back to <a href="/">Home Page</a></p>
        </section>
    )
}