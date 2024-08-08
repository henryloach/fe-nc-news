import { useContext, useState } from "react"
import { UserContext } from "../contexts/User"
import { patchArticleVotesById, patchCommentVotesById } from "../api"

const Votes = ({ votes, setComments, setArticle, author, forceNoButtons, comment_id, article_id }) => {

    const { loggedInUser } = useContext(UserContext)

    const [submittedVote, setSubmittedVote] = useState(0)

    const [upButtonStyle, setUpButtonStyle] = useState({})
    const [downButtonStyle, setDownButtonStyle] = useState({})

    const styleSuccess = (increment) => {
        if (increment === 1) {
            setUpButtonStyle({ backgroundColor: "blue", color: "white" })
            setTimeout(() => {
                setUpButtonStyle({})
            }, 150)
        }

        if (increment === -1) {
            setDownButtonStyle({ backgroundColor: "blue", color: "white" })
            setTimeout(() => {
                setDownButtonStyle({})
            }, 150)
        }
    }

    const styleFail = (increment) => {
        if (increment === 1) {
            setUpButtonStyle({ backgroundColor: "red", color: "white" })
            setTimeout(() => {
                setUpButtonStyle({})
            }, 150)
        }

        if (increment === -1) {
            setDownButtonStyle({ backgroundColor: "red", color: "white" })
            setTimeout(() => {
                setDownButtonStyle({})
            }, 150)
        }
    }

    const handleCommentVote = (increment) => {

        styleSuccess(increment)

        setSubmittedVote(curVote => curVote + increment)

        setComments(comments => {
            return comments.map(comment => {
                if (comment.comment_id === comment_id) {
                    return { ...comment, votes: comment.votes + increment }
                }
                else return comment
            })
        })
        patchCommentVotesById(comment_id, increment)
            .catch(() => {
                styleFail(increment)

                setSubmittedVote(curVote => curVote - increment)

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
        styleSuccess(increment)

        setSubmittedVote(curVote => curVote + increment)

        setArticle(article => {
            return { ...article, votes: article.votes + increment }
        })
        patchArticleVotesById(article_id, increment)
            .catch(() => {
                styleFail(increment)

                setSubmittedVote(curVote => curVote - increment)

                setArticle(article => {
                    return { ...article, votes: article.votes - increment }
                })
            })
    }

    const handleVote = (increment) => {
        if (setComments) return handleCommentVote(increment)
        if (setArticle) return handleArticleVote(increment)
    }

    console.log(submittedVote)

    if (loggedInUser !== author && !forceNoButtons)
        return (
            <span>
                <button style={upButtonStyle}
                    className="vote-arrow"
                    onClick={() => handleVote(+1)}
                    disabled={submittedVote === 1}
                >⇧</button>
                <span>{votes}</span>
                <button
                    style={downButtonStyle}
                    className="vote-arrow"
                    onClick={() => handleVote(-1)}
                    disabled={submittedVote === -1}
                >⇩</button>
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