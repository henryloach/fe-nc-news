import { useContext } from "react"
import { UserContext } from "../contexts/User"

const Votes = ({ votes, handleVote, author, forceNoButtons }) => {
    const { loggedInUser } = useContext(UserContext)

    if (loggedInUser !== author && !forceNoButtons)
        return (
            <span>
                <button className="vote-arrow" onClick={() => handleVote(+1)}>⇧</button>
                <span>{votes}</span>
                <button className="vote-arrow" onClick={() => handleVote(-1)}>⇩</button>
            </span>
        )

    else
        return (
            <span>
                <span>{votes}</span>
            </span>
        )
}

export default Votes