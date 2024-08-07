import { useContext } from "react"
import { UserContext } from "../contexts/User"
import { deleteCommentById } from "../api"


const Delete = ({ setComments, author, comment_id, comment }) => {

    const { loggedInUser } = useContext(UserContext)

    const handleDelete = comment_id => {
        setComments(comments => {
            return comments.filter(comment => comment.comment_id !== comment_id)
        })
        deleteCommentById(comment_id).catch( err => {
            setComments(comments => [comment, ...comments])
        })
    }
    
    if (loggedInUser === author)
        return (
            <span>
                <button onClick={()=>handleDelete(comment_id)}>Delete</button>
            </span>
        )

    else
        return (
            <span>
            </span>
        )
}

export default Delete 