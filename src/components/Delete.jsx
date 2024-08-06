import { useContext } from "react"
import { UserContext } from "../contexts/User"

const Delete = ({ handleDelete, author }) => {
    const { loggedInUser } = useContext(UserContext)

    if (loggedInUser === author)
        return (
            <span>
                <button onClick={handleDelete}>Delete</button>
            </span>
        )

    else
        return (
            <span>
            </span>
        )
}

export default Delete