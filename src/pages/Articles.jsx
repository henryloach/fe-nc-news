import useCreateResource from "../hooks/useCreateResource";
import { getArticles } from "../api";
import ArticlePreview from "../components/ArticlePreview";

const Articles = () => {

    const { data: articles, isLoading, error } = useCreateResource(getArticles)

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.msg}</p>

    return (
        <div className="article-page">
            <h2>Articles</h2>
            <ul>
                {articles.map(article => {
                    return <li key={article.article_id}>
                        <hr />
                        <ArticlePreview article={article}/>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default Articles