import useCreateResource from "../hooks/useCreateResource";
import ArticlePreview from "../components/ArticlePreview";
import { getArticles } from "../api";

const Articles = ({urlQuery}) => {

    const {
        data: articles,
        setData: setArticles,
        isLoading,
        error
    } = useCreateResource(() => getArticles(urlQuery))

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div className="article-page">
            <h2>Articles</h2>
            <ul>
                {articles.map(article => {
                    return <li key={article.article_id}>
                        <hr />
                        <ArticlePreview article={article} setArticles={setArticles} />
                    </li>
                })}
            </ul>
        </div>
    )
}

export default Articles