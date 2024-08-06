const Comment = ({ comment }) => {

    const {
        body,
        author,
        votes,
        created_at
    } = comment

    const formattedDate = new Date(created_at).toLocaleString()

    return (
        <>
            <span>{author}</span>
            <p>{body}</p>
            <span>{votes}</span>
            <span>{created_at}</span>
        </>
    )
}

export default Comment