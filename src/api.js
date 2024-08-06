import axios from "axios"

const apiClient = axios.create({
    baseURL: "https://be-nc-news-uc0d.onrender.com/api",
    timeout: 1000
})

export const getArticles = () => {
    return apiClient.get("/articles")
        .then(response => {
            return response.data.articles
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