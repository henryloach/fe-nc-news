import { deleteCommentById, patchCommentVotesById } from "../api"
import Delete from "./Delete"
import Votes from "./Votes"

const Comment = ({ comment, setComments }) => {

    const {
        comment_id,
        body,
        author,
        created_at,
        votes
    } = comment

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

    const handleDelete = comment_id => {
        deleteCommentById(comment_id)
        setComments(comments => {
            return comments.filter(comment => comment.comment_id !== comment_id)
        })
    }

    const formattedDate = new Date(created_at).toLocaleString()

    return (
        <>
            <p>{body}</p>
            <div className="comment-details">
                <span>{author}</span>
                <Votes votes={votes} handleVote={handleVote} author={author} />
                <Delete handleDelete={handleDelete} author={author}/>
                <span>{formattedDate}</span>
            </div>
        </>
    )
}

export default Comment