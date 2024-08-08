import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <p>Oops you got lost... <Link to="/">back to safety</Link></p>
    )
}

export default NotFound