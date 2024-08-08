import { Link } from "react-router-dom"
import { getTopics } from "../api"
import useAPI from "../hooks/useAPI"

const Topics = ({ setUrlQuery }) => {
    const {
        data: topics,
        setData: setTopics,
        isLoading,
        error
    } = useAPI(getTopics)

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div className="topics-page">
            <h2>Topics</h2>
            <ul>
                {topics.map(topic => {
                    return <li key={topic.slug}>
                        <hr />
                        <h3><Link
                            onClick={() => setUrlQuery({ topic: topic.slug })}
                            to="/articles"
                        >
                            {topic.description}
                        </Link></h3>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default Topics