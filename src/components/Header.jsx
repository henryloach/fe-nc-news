import { Link } from "react-router-dom"

const Header = ({setUrlQuery}) => {
    
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/topics">Topics</Link></li>
                    <li><Link
                        to="/articles"
                        onClick={() => setUrlQuery({})}>
                        Articles
                    </Link></li>
                    <li>Login</li>
                    <li>Sign Up</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header