import axios from "axios"

const apiClient = axios.create({
    baseURL: "https://be-nc-news-uc0d.onrender.com/api",
    timeout: 1000
})

export const getArticles = (urlQuery) => {
    const queryString =
        Object.entries(urlQuery)
            .map(([field, value]) => `${field}=${value}`)
            .join('&')

    return apiClient.get(`/articles?${queryString}`)
        .then(response => {
            return response.data.articles
        })
}

export const getTopics = () => {
    return apiClient.get("/topics")
        .then(response => {
            return response.data.topics
        })
}

export const getUsers = () => {
    return apiClient.get("/users")
    .then(response => {
        return response.data.users
    })
}

export const getArticleById = article_id => {
    return apiClient.get(`/articles/${article_id}`)
        .then(response => {
            return response.data.article
        })
}

export const getCommentsByArticleId = article_id => {
    return apiClient.get(`/articles/${article_id}/comments`)
        .then(response => {
            return response.data.comments
        })
}

export const patchCommentVotesById = (comment_id, increment) => {
    const requestBody = {
        inc_votes: increment
    }

    return apiClient.patch(`/comments/${comment_id}`, requestBody)
        .then(response => {
            return response.data.comment
        })
}

export const patchArticleVotesById = (article_id, increment) => {
    const requestBody = {
        inc_votes: increment
    }

    return apiClient.patch(`/articles/${article_id}`, requestBody)
        .then(response => {
            return response.data.article
        })
}

export const postCommentByArticleId = (article_id, requestBody) => {
    return apiClient.post(`/articles/${article_id}/comments`, requestBody)
        .then(response => {
            return response.data.newComment
        })
}

export const deleteCommentById = comment_id => {
    return apiClient.delete(`/comments/${comment_id}`)
}