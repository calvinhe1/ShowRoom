import "./styles.css";

function Comment(props) {

    function deleteComment() {
        props.deleteComment(props.comment.commentId);
    }

    function getProfilePicture() {
        const user = props.users.find(user => user.userId === props.comment.userId);
        return user.profilePicture;
    }

    return (
        <div className="comment-container">
            {/** TODO when profiles are set up <Link to={"/profile/" + props.comment.userId}/> */}
            <img className="comment-user" src={getProfilePicture()} alt={props.currentUser.userName}></img>
            <span className="comment-text">{props.comment.text}</span>
            {/** TODO more feautres, likes? dislikes? etc */}
            {
                props.currentUser?.userId === props.comment.userId || props.currentUser?.isAdmin ?
                <button onClick={deleteComment} className="comment-delete">X</button> : null
            }
            <span className="comment-date">{props.comment.date}</span>
        </div>
    );
}

export default Comment;