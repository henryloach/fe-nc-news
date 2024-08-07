import { useContext, useRef, useState } from "react"
import { UserContext } from "../contexts/User"
import { postCommentByArticleId } from "../api"

const CommentForm = ({ setShowCommentForm, setComments, article_id }) => {

    const { loggedInUser: username } = useContext(UserContext)
    const [commentPostError, setCommentPostError] = useState(false)
    const commentText = useRef(null)

    const handleSubmit = event => {
        event.preventDefault()
        const body = commentText.current.value
        setCommentPostError(false)
        if (body === "") return
        setShowCommentForm(false)
        postCommentByArticleId(article_id, { username, body })
            .then(newComment => {
                setComments(comments => [newComment, ...comments])
                commentText.current.value = ''
            })
            .catch(err => {
                setCommentPostError(true)
                setShowCommentForm(true)
            })
    }

    const handleInputChange = () => {
        if (commentText.current) {
            commentText.current.style.height = "auto"
            commentText.current.style.height = `${commentText.current.scrollHeight}px`
        }
    }

    return (
        <>
            {commentPostError && <p>There was an error posting your comment.</p>}
            <form className="comment-form" onSubmit={handleSubmit}>
                <textarea
                    ref={commentText}
                    name="comment"
                    autoComplete="off"
                    rows="1"
                    cols="64"
                    onChange={handleInputChange}
                    placeholder="Write your comment here"
                ></textarea>
                <button type="submit"> Post </button>
            </form>
        </>
    )
}

export default CommentForm