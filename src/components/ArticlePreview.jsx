import { Link } from "react-router-dom"

const ArticlePreview = ({ article }) => {
    const {
        article_id,
        title,
        topic,
        author,
        created_at,
        votes,
        comment_count
    } = article

    const formattedDate = new Date(created_at).toLocaleString()

    return (
        <div className="article-preview">
            <h3><Link to={`/articles/${article_id}`}>{title}</Link></h3>
            <div className="article-preview__details">
                <span>{topic}</span>
                <span>{author}</span>
                <span>votes: {votes}</span>
                <span>comments: {comment_count}</span>
                <span>{formattedDate}</span>
            </div>
        </div>
    )
}

export default ArticlePreview