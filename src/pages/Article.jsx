import useAPI from "../hooks/useAPI"
import {  useState } from "react"
import { useParams } from "react-router-dom"
import { getArticleById, getCommentsByArticleId } from "../api"
import Comment from "../components/Comment"
import Votes from "../components/Votes"
import CommentForm from "../components/CommentForm"

const Article = () => {
    const { article_id } = useParams()

    const [showCommentForm, setShowCommentForm] = useState(false)

    const {
        data: article,
        setData: setArticle,
        isLoading: isArticleLoading,
        error: articleError
    } = useAPI(() => getArticleById(article_id))

    const {
        data: comments,
        setData: setComments,
        isLoading: areCommentsLoading,
        error: commentsError
    } = useAPI(() => getCommentsByArticleId(article_id))

    // TODO refactor conditional rendering
    if (isArticleLoading) return <p>Loading...</p>
    if (areCommentsLoading) return <p>Loading...</p>
    if (articleError) return <p>Error: {articleError.message}</p>
    if (commentsError) return <p>Error: {commentsError.message}</p>

    const {
        title,
        topic,
        author,
        created_at,
        votes,
        comment_count,
        body,
        article_img_url
    } = article

    const formattedDate = new Date(created_at).toLocaleString()

    return (
        <div>
            <div>
                <img src={article_img_url} alt="article-image" />
                <h2>{title}</h2>
                <div className="article-details">
                    <span>{topic}</span>
                    <span>{author}</span>
                    <Votes votes={votes} setArticle={setArticle} author={author} article_id={article_id} />
                    {/* TODO comments.length changed dynamically 
                    on post/delete comments but it's
                    but it's the paginated comments not the total */}
                    <span>comments: {comment_count} </span>
                    <span>{formattedDate}</span>
                </div>
                <p>{body}</p>
            </div>

            <div className="comments">
                <h3>Comments:</h3>
                <button onClick={() => setShowCommentForm(state => !state)}>
                    {showCommentForm ? "Back" : "Post New Comment"}
                </button>
                {showCommentForm && <CommentForm
                    setShowCommentForm={setShowCommentForm}
                    setComments={setComments}
                    article_id={article_id}
                    setArticle={setArticle}
                />}
                {!comments.length && <p>No comments to display...</p>}
                <ul>
                    {comments.map(comment => {
                        return <li key={comment.comment_id}>
                            <hr />
                            <Comment comment={comment} setComments={setComments} setArticle={setArticle} />
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Article 