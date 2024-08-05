const ArticlePreview = ({ article }) => {
    const {
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
            <h3>{title}</h3>
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