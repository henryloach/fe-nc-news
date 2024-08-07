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

    const formattedDate = new Date(created_at).toLocaleString()

    return (
        <>
            <p>{body}</p>
            <div className="comment-details">
                <span>{author}</span>
                <Votes
                    votes={votes}
                    setComments={setComments}
                    author={author}
                    comment_id={comment_id}
                />
                <Delete
                    comment={comment}
                    setComments={setComments}
                    author={author}
                    comment_id={comment_id}
                />
                <span>{formattedDate}</span>
            </div>
        </>
    )
}

export default Comment