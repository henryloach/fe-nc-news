import useAPI from "../hooks/useAPI"
import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { getArticleById, getCommentsByArticleId } from "../api"
import Comment from "../components/Comment"
import Votes from "../components/Votes"
import CommentForm from "../components/CommentForm"

const Article = () => {
    const { article_id } = useParams()
    const [offset, setOffset] = useState(0)
    const [allowLoadMore, setAllowLoadMore] = useState(true)

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
    } = useAPI(
        () => getCommentsByArticleId(article_id, { p: offset })
        , [offset]
        , true
    )

    const debounceTimeout = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            const {
                scrollTop,
                clientHeight,
                scrollHeight
            } = document.documentElement

            const distanceFromBot = scrollHeight - scrollTop - clientHeight

            if (distanceFromBot < 150 && comments.length < article.comment_count && allowLoadMore) {
                clearTimeout(debounceTimeout.current)

                setAllowLoadMore(false)

                debounceTimeout.current = setTimeout(() => {
                    setOffset(cur => cur + 10)
                    setAllowLoadMore(true)
                }, 150)
            }
        }

        window.addEventListener("scroll", handleScroll)
        window.addEventListener("touchmove", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("touchmove", handleScroll)
        }

    }, [comments, article])

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
            <article>
                <img src={article_img_url} alt="article-image" />
                <h2>{title}</h2>
                <p className="article-text">{body}</p>
                <div className="article-details">
                    <span className="article-details__topic">
                        <span>topic</span>
                        <span>{topic}</span>
                    </span>
                    <span className="article-details__author">
                        <span>author</span>
                        <span>{author}</span>
                    </span>
                    <span className="article-details__comments">
                        <span>comments</span>
                        <span>{comment_count}</span>
                    </span>
                    <Votes votes={votes} setArticle={setArticle} author={author} article_id={article_id} />
                    <span className="article-details__date">
                        <span> Date</span>
                        <span>{formattedDate}</span>
                    </span>
                </div>
            </article>

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