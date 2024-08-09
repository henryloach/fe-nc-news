import Delete from "./Delete"
import Votes from "./Votes"

const Comment = ({ comment, setComments, setArticle }) => {

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
            <p className="comment-text">{body}</p>
            <div className="comment-details">
                <span className="article-details__author">
                    <span>author</span>
                    <span>{author}</span>
                </span>
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
                    setArticle={setArticle}
                />
                <span className="article-details__date">
                    <span> Date</span>
                    <span>{formattedDate}</span>
                </span>
            </div>
        </>
    )
}

export default Comment