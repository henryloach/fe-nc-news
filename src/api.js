import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://be-nc-news-uc0d.onrender.com/api",
    timeout: 1000
})

export const getArticles = () => {
    console.log("from API");
    return apiClient.get("/articles")
        .then( response => {
            return response.data.articles
        })
}