import { useContext, useState } from "react"
import { UserContext } from "../contexts/User"
import { postCommentByArticleId } from "../api"

const CommentForm = ({ setShowCommentForm, setComments, article_id }) => {

    const { loggedInUser: username } = useContext(UserContext)
    const [commentPostError, setCommentPostError] = useState(false)

    const handleSubmit = event => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const body = formData.get("comment")
        setCommentPostError(false)
        postCommentByArticleId(article_id, { username, body })
            .then(newComment => {
                setShowCommentForm(false)
                setComments(comments => [newComment, ...comments])
            })
            .catch(err => {
                setCommentPostError(true)
            })
    }

    return (
        <>
            {commentPostError && <p>There was an error posting your comment.</p>}
            <form className="comment-form" onSubmit={handleSubmit}>
                <input name="comment" type="text" />
                <button type="submit"> Post </button>
            </form>
        </>
    )
}

export default CommentForm