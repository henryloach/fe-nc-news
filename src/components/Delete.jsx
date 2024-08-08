import { useContext } from "react"
import { UserContext } from "../contexts/User"
import { deleteCommentById } from "../api"


const Delete = ({ setComments, author, comment_id, comment, setArticle }) => {

    const { loggedInUser } = useContext(UserContext)

    const handleDelete = comment_id => {
        setComments(comments => {
            return comments.filter(comment => comment.comment_id !== comment_id)
        })
        setArticle(article => {
            return { ...article, comment_count : article.comment_count - 1 }
        })
        deleteCommentById(comment_id)
            .catch(err => {
                setComments(comments => [comment, ...comments])
                setArticle(article => {
                    return { ...article, comment_count : article.comment_count + 1 }
                })
                
            })
    }

    if (loggedInUser === author)
        return (
            <span>
                <button onClick={() => handleDelete(comment_id)}>Delete</button>
            </span>
        )

    else
        return (
            <span>
            </span>
        )
}

export default Delete 