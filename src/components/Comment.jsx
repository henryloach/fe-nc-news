const Comment = ({ comment, commentVotes, setCommentVotes }) => {

    const {
        body,
        author,
        created_at,
        votes
    } = comment

    const formattedDate = new Date(created_at).toLocaleString()

    return (
        <>
            <p>{body}</p>
            <div className="comment-details">
                <span>{author}</span>
                <span onClick={() => {}}>⇧</span>
                <span>{votes}</span>
                <span>{created_at}</span>
            </div>
        </>
    )
}

export default Comment