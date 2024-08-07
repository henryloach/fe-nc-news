import { Link } from "react-router-dom"
import { patchArticleVotesById } from "../api"
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

    const handleVote = (increment) => {
        setArticles(articles => {
            return articles.map(article => {
                if (article.article_id === article_id) {
                    return { ...article, votes: article.votes + increment }
                }
                else return article
            })
        })
        patchArticleVotesById(article_id, increment)
            .catch(() => { // TODO maybe make the arrow go red for a second somehow
                setArticles(articles => {
                    return articles.map(article => {
                        if (article.article_id === article_id) {
                            return { ...article, votes: article.votes - increment }
                        }
                        else return article
                    })
                })
            })
    }

    const formattedDate = new Date(created_at).toLocaleString()

    return (
        <div className="article-preview">
            <h3><Link to={`/articles/${article_id}`}>{title}</Link></h3>
            <img src={article_img_url} alt="article-preview-image"/>
            <div className="article-details">
                <span>{topic}</span>
                <span>{author}</span>
                <Votes votes={votes} forceNoButtons={true}/>
                <span>comments: {comment_count}</span>
                <span>{formattedDate}</span>
            </div>
        </div>
    )
}

export default ArticlePreview