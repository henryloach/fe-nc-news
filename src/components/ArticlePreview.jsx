import { Link } from "react-router-dom"
import Votes from "./Votes"

const ArticlePreview = ({ article, setArticles }) => {

    const {
        article_id,
        title,
        topic,
        author,
        created_at,
        votes,
        article_img_url,
        comment_count
    } = article

    const formattedDate = new Date(created_at).toLocaleString()

    return (
        <div className="article-preview">
            <h3><Link to={`/articles/${article_id}`}>{title}</Link></h3>
            <img src={article_img_url} alt="article-preview-image" />
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
                <Votes votes={votes} forceNoButtons={true} />
                <span className="article-details__date">
                    <span> Date</span>
                    <span>{formattedDate}</span>
                </span>
            </div>
        </div>
    )
}

export default ArticlePreview