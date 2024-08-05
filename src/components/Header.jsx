import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li>Topics</li>
                    <li><Link to="/articles">Articles</Link></li>
                    <li>Login</li>
                    <li>Sign Up</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header