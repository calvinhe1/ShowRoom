import "./styles.css";

import { useUserProfileContext } from './../../contexts/UserProfile';

function Comment(props) {

    const currentUser = useUserProfileContext().profile;

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
            <img className="comment-user" src={getProfilePicture()} alt={currentUser.userName}></img>
            <span className="comment-text">{props.comment.text}</span>
            {/** TODO more feautres, likes? dislikes? etc */}
            {
                currentUser?.userId === props.comment.userId || currentUser?.isAdmin ?
                <button onClick={deleteComment} className="comment-delete">X</button> : null
            }
            <span className="comment-date">{props.comment.date}</span>
        </div>
    );
}

export default Comment;