import useCreateResource from "../hooks/useCreateResource"
import { useParams } from "react-router-dom"
import { getArticleById, getCommentsByArticleId } from "../api"
import Comment from "../components/Comment"

const Article = () => {
    const { article_id } = useParams()

    // Toto - perhaps change this back to the custom hook fetching just one resource and use it twice
    const { data, isLoading, error } =
        useCreateResource([
            () => getArticleById(article_id),
            () => getCommentsByArticleId(article_id)
        ])

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    const [article, comments] = data

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

    // TODO conditionaly render something if comments.length is zero

    return (
        <div>
            <div>
                <img src={article_img_url} alt="article-image" />
                <h2>{title}</h2>
                <div className="article-preview__details">
                    <span>{topic}</span>
                    <span>{author}</span>
                    <span>votes: {votes}</span>
                    <span>comments: {comment_count}</span>
                    <span>{formattedDate}</span>
                </div>
                <p>{body}</p>
            </div>
            <div className="comments">
                <ul>
                    {comments.map(comment => {
                        return <li key={comment.comment_id}>
                            <hr />
                            <Comment comment={comment} />
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Article 