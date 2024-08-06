import useCreateResource from "../hooks/useCreateResource"
import { useParams } from "react-router-dom"
import { getArticleById, getCommentsByArticleId, patchArticleVotesById } from "../api"
import Comment from "../components/Comment"

const Article = () => {
    const { article_id } = useParams()

    const {
        data: article,
        setData: setArticle,
        isLoading: isArticleLoading,
        error: articleError
    } = useCreateResource(() => getArticleById(article_id))

    const {
        data: comments,
        setData: setComments,
        isLoading: areCommentsLoading,
        error: commentsError
    } = useCreateResource(() => getCommentsByArticleId(article_id))

    const handleVote = (increment) => {
        setArticle(article => {
            return { ...article, votes: article.votes + increment }
        })
        patchArticleVotesById(article_id, increment)
            .catch(() => { // TODO maybe make the arrow go red for a second somehow
                setArticle(article => {
                    return { ...article, votes: article.votes - increment }
                })
            })
    }

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
                <div className="article-preview__details">
                    <span>{topic}</span>
                    <span>{author}</span>
                    <span>
                        <button className="vote-arrow" onClick={() => handleVote(+1)}>⇧</button>
                        <span>{votes}</span>
                        <button className="vote-arrow" onClick={() => handleVote(-1)}>⇩</button>
                    </span>
                    <span>comments: {comment_count}</span>
                    <span>{formattedDate}</span>
                </div>
                <p>{body}</p>
            </div>
            <div className="comments">
                <h3>Comments:</h3>
                <ul>
                    {comments.map(comment => {
                        return <li key={comment.comment_id}>
                            <hr />
                            <Comment comment={comment} setComments={setComments} />
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Article 