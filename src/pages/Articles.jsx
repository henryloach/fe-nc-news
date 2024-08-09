import useAPI from "../hooks/useAPI";
import ArticlePreview from "../components/ArticlePreview";
import { getArticles, getNumArticles } from "../api";
import QueryForm from "../components/QueryForm";
import { useEffect, useRef, useState } from "react";

const Articles = ({ urlQuery, setUrlQuery }) => {

    const [offset, setOffset] = useState(0)
    const [allowLoadMore, setAllowLoadMore] = useState(true)

    const {
        data: articles,
        setData: setArticles,
        isLoading,
        error
    } = useAPI(
        () => getArticles({ ...urlQuery, p: offset })
        , [urlQuery, offset]
        , true
    )

    const {
        data: numArticles,
        setData: setNumArticles,
        isLoading: isNumLoading,
        error: numError
    } = useAPI(
        () => getNumArticles({ ...urlQuery, p: offset })
        , [urlQuery]
    )

    useEffect(() => {
        setOffset(0)
        setArticles([])
    }, [urlQuery])

    const debounceTimeout = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            const {
                scrollTop,
                clientHeight,
                scrollHeight
            } = document.documentElement

            const distanceFromBot = scrollHeight - scrollTop - clientHeight

            if (distanceFromBot < 150 && articles.length < numArticles && allowLoadMore) {
                clearTimeout(debounceTimeout.current)

                setAllowLoadMore(false)

                debounceTimeout.current = setTimeout(() => {
                    setOffset(cur => cur + 10)
                    setAllowLoadMore(true)
                }, 150)
            }
        }

        window.addEventListener("scroll", handleScroll)
        window.addEventListener("touchmove", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("touchmove", handleScroll)
        }
        
    }, [articles])

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>
    if (isNumLoading) return <p>Loading...</p>
    if (numError) return <p>Error: {numError.message}</p>

    return (
        <div className="article-page">
            <QueryForm setUrlQuery={setUrlQuery} />
            <h2>Articles</h2>
            <p>Total Results: {numArticles}</p>
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