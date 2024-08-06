import useCreateResource from "../hooks/useCreateResource";
import ArticlePreview from "../components/ArticlePreview";
import { getArticles } from "../api";

const Articles = () => {

    const { data, isLoading, error } = useCreateResource([getArticles])

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    const [articles] = data

    return (
        <div className="article-page">
            <h2>Articles</h2>
            <ul>
                {articles.map(article => {
                    return <li key={article.article_id}>
                        <hr />
                        <ArticlePreview article={article} />
                    </li>
                })}
            </ul>
        </div>
    )
}

export default Articles