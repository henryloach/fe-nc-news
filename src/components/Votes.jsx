import { useContext } from "react"
import { UserContext } from "../contexts/User"
import { patchArticleVotesById, patchCommentVotesById } from "../api"

const Votes = ({ votes, setComments, setArticle, author, forceNoButtons, comment_id, article_id }) => {

    const { loggedInUser } = useContext(UserContext)

    const handleCommentVote = (increment) => {
        setComments(comments => {
            return comments.map(comment => {
                if (comment.comment_id === comment_id) {
                    return { ...comment, votes: comment.votes + increment }
                }
                else return comment
            })
        })
        patchCommentVotesById(comment_id, increment)
            .catch(() => { // TODO maybe make the arrow go red for a second somehow
                setComments(comments => {
                    return comments.map(comment => {
                        if (comment.comment_id === comment_id) {
                            return { ...comment, votes: comment.votes - increment }
                        }
                        else return comment
                    })
                })
            })
    }

    const handleArticleVote = (increment) => {
        setArticle(article => {
            return { ...article, votes: article.votes + increment }
        })
        patchArticleVotesById(article_id, increment)
            .catch(() => { // TODO maybe make the arrow go red for a second somehow
                setArticle(article => {
                    return { ...article, votes: article.votes - increment }
                })
            })
    }

    const handleVote = (increment) => {
        if (setComments) return handleCommentVote(increment)
        if (setArticle) return handleArticleVote(increment)
    }


    if (loggedInUser !== author && !forceNoButtons)
        return (
            <span>
                <button className="vote-arrow" onClick={() => handleVote(+1)}>⇧</button>
                <span>{votes}</span>
                <button className="vote-arrow" onClick={() => handleVote(-1)}>⇩</button>
            </span>
        )

    else
        return (
            <span>
                <span>{votes}</span>
            </span>
        )
}

export default Votes