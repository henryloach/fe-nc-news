import { useContext } from "react"
import { UserContext } from "../contexts/User"
import { patchCommentVotesById } from "../api"

const Votes = ({ votes, setComments, author, forceNoButtons, comment_id }) => {

    const { loggedInUser } = useContext(UserContext)

    const handleVote = (increment) => {
        setComments(comments => {
            return comments.map(comment => {
                if (comment.comment_id === comment_id) {
                    return { ...comment, votes: comment.votes + increment }
                }
                else return comment
            })
        })
        patchCommentVotesById(comment_id, increment)
            .catch(() => { // TODO maybe make the arrow go red for a second somehow
                setComments(comments => {
                    return comments.map(comment => {
                        if (comment.comment_id === comment_id) {
                            return { ...comment, votes: comment.votes - increment }
                        }
                        else return comment
                    })
                })
            })
    }

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