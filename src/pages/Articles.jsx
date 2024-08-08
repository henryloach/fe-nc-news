import useAPI from "../hooks/useAPI";
import ArticlePreview from "../components/ArticlePreview";
import { getArticles } from "../api";
import QueryForm from "../components/QueryForm";

const Articles = ({ urlQuery, setUrlQuery }) => {

    const {
        data: articles,
        setData: setArticles,
        isLoading,
        error
    } = useAPI(() => getArticles(urlQuery), [urlQuery])

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div className="article-page">
            <QueryForm setUrlQuery={setUrlQuery} />
            <h2>Articles</h2>
            {articles.length === 0 && <p>No articles found...</p>}
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