import React, { useRef } from 'react'
import useAPI from '../hooks/useAPI'
import { getTopics, getUsers } from '../api'

const QueryForm = ({ setUrlQuery }) => {
    const formRef = useRef(null)

    const {
        data: topics,
        isLoading: areTopicsLoading,
        error: topicsError
    } = useAPI(getTopics)

    const {
        data: authors,
        isLoading: areAuthorsLoading,
        error: authorsError
    } = useAPI(getUsers)

    const handleSubmit = event => {
        event.preventDefault()
        const formData = new FormData(formRef.current)
        const sortValue = formData.get('sortBy')
        const orderValue = formData.get('order')
        const topicValue = formData.get('topic')
        const authorValue = formData.get('author')
        setUrlQuery(urlQuery => {
            const queryObj = {
                ...urlQuery,
                sort_by: sortValue,
                order: orderValue,
                topic: topicValue,
                author: authorValue
            }

            for (const key in queryObj) {
                if (queryObj[key] === "any") {
                    delete queryObj[key]
                }
            }

            return queryObj
        })
    }

    const handleReset = () => {
        setUrlQuery({})
    }

    if (areTopicsLoading) return <p>Loading...</p>
    if (topicsError) return <p>Error: {topicsError.message}</p>
    if (areAuthorsLoading) return <p>Loading...</p>
    if (authorsError) return <p>Error: {authorsError.message}</p>

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <label htmlFor="sortBy"> sort:
                <select id="sortBy" name="sortBy">
                    <option value="created_at">date added</option>
                    <option value="votes">votes</option>
                    <option value="title">title</option>
                    <option value="comment_count">comments</option>
                </select>
            </label>

            <label htmlFor='ascending'>
                <input type="radio" id="ascending" name="order" value="asc" /> Ascending
            </label>
            <label htmlFor='descending'>
                <input type="radio" id="descending" name="order" value="desc" defaultChecked /> Descending
            </label>

            <label htmlFor="topic"> topic: 
                <select name="topic" id="topic">
                    <option value="any">Any</option>
                    {topics.map(topic => {
                        return <option
                            key={topic.slug}
                            value={topic.slug}
                        >
                            {topic.slug}
                        </option>
                    })}
                </select>
            </label>

            <label htmlFor="author"> author: 
                <select name="author" id="author">
                    <option value="any">Any</option>
                    {authors.map(author => {
                        return <option
                            key={author.username}
                            value={author.username}
                        >
                            {author.username}
                        </option>
                    })}
                </select>
            </label>


            <button type="submit">Apply Filters</button>
            <button type='reset' onClick={handleReset}>Reset Filters</button>
        </form>
    )
}

export default QueryForm
