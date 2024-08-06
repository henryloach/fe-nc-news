const Votes = ({ votes, handleVote }) => {
    return (
        <span>
            <button className="vote-arrow" onClick={() => handleVote(+1)}>⇧</button>
            <span>{votes}</span>
            <button className="vote-arrow" onClick={() => handleVote(-1)}>⇩</button>
        </span>
    )
}

export default Votes