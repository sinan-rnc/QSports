import "./UnAuthorized.scss"

import image from '../../../Assets/Common/401 Error Unauthorized-cuate.svg'

export default function UnAuthorized() {
    return (
        <section className="unauthorized">
            <img src={image} alt=""/>
            <h1>You are not authorized to access this page</h1>
            <p>Go Back to <a href="/">Home Page</a></p>
        </section>
    )
}