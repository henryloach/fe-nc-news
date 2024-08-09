import { useContext } from "react"
import { UserContext } from "../contexts/User"
import useAPI from "../hooks/useAPI"
import { getArticles } from "../api"
import { Link } from "react-router-dom"

const Home = () => {
    const { loggedInUser } = useContext(UserContext)

    const {
        data: mostCommented,
        isLoading: isMostCommentedLoading,
        error: mostCommentedError
    } = useAPI(() => {
        return getArticles({
            sort_by: 'comment_count',
            order: 'desc',
            limit: 1
        })
    })

    const {
        data: mostLiked,
        isLoading: isMostLikedLoading,
        error: mostLikedError
    } = useAPI(() => {
        return getArticles({
            sort_by: 'votes',
            order: 'desc',
            limit: 1
        })
    })

    const {
        data: mostRecent,
        isLoading: isMostRecentLoading,
        error: mostRecentError
    } = useAPI(() => {
        return getArticles({
            sort_by: 'created_at',
            order: 'desc',
            limit: 1
        })
    })

    if (isMostCommentedLoading) return <p>Loading...</p>
    if (mostCommentedError) return <p>Error: {mostCommentedError.message}</p>

    if (isMostLikedLoading) return <p>Loading...</p>
    if (mostLikedError) return <p>Error: {mostLikedError.message}</p>

    if (isMostRecentLoading) return <p>Loading...</p>
    if (mostRecentError) return <p>Error: {mostRecentError.message}</p>

    return (
        <>
            <div className = "banner">nc-news</div>
            <div className="home-page-articles">
                <article>
                    <h2>Most Recent Article:</h2>
                    <h3><Link to={`/articles/${mostRecent[0].article_id}`}>
                        {mostRecent[0].title}
                    </Link></h3>
                    <img src={mostRecent[0].article_img_url} alt="article image" />
                </article>

                <article>

                    <h2>Most Liked Article:</h2>
                    <h3><Link to={`/articles/${mostLiked[0].article_id}`} >
                        {mostLiked[0].title}
                    </Link></h3>
                    <img src={mostLiked[0].article_img_url} alt="article image" />

                </article>

                <article>
                    <h2>Most Commented Article:</h2>
                    <h3><Link to={`/articles/${mostCommented[0].article_id}`}>
                        {mostCommented[0].title}
                    </Link></h3>
                    <img src={mostCommented[0].article_img_url} alt="article image" />
                </article>
            </div>
        </>
    )
}

export default Home;

