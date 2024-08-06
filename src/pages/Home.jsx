import Header from "../components/Header"

import { useContext } from "react"
import { UserContext } from "../contexts/User"

const Home = () => {
    const { loggedInUser } = useContext(UserContext)

    return (
        <>
            <div>Home</div>
            <p>Logged in as: {loggedInUser}</p>
        </>
    )
}

export default Home;

