import { useContext, useRef, useState } from "react"
import { UserContext } from "../contexts/User"
import { postCommentByArticleId } from "../api"

const CommentForm = ({ setShowCommentForm, setComments, article_id, setArticle }) => {

    const { loggedInUser: username } = useContext(UserContext)
    const [commentPostError, setCommentPostError] = useState(false)
    const commentText = useRef(null)

    const handleSubmit = event => {
        event.preventDefault()
        const body = commentText.current.value
        setCommentPostError(false)
        setShowCommentForm(false)
        postCommentByArticleId(article_id, { username, body })
            .then(newComment => {
                setComments(comments => [newComment, ...comments])
                setArticle(article => {
                    return {...article, comment_count: article.comment_count + 1}
                })
                setCommentPostError(false)
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
                <label htmlFor="newComment">
                    <textarea
                        id="newComment"
                        ref={commentText}
                        name="comment"
                        autoComplete="off"
                        rows="1"
                        cols="64"
                        onChange={handleInputChange}
                        placeholder="Write your comment here"
                        required 
                    ></textarea>
                    <button title="post your comment" type="submit"> Post </button>
                </label>
            </form>
        </>
    )
}

export default CommentForm