import "./styles.css";

import { useUserProfileContext } from './../../contexts/UserProfile';
import { useUserListContext } from "../../contexts/UserList";
import { useCommentListContext } from "../../contexts/CommentList";

function Comment(props) {

    const userContext = useUserProfileContext();
    const currentUser = userContext.profile;

    const userListContext = useUserListContext();

    const commentContext = useCommentListContext();

    function deleteComment(e) {
        e.preventDefault();
        commentContext.deleteCommentById(props.comment.commentId);
    }

    function getProfilePicture() {
        const user = userListContext.getUserById(props.comment.userId);
        return user.profilePicture;
    }

    return (
        <div className="comment-container">
            {/** TODO when profiles are set up <Link to={"/profile/" + props.comment.userId}/> */}

            <img className="comment-user" src={getProfilePicture()} alt={currentUser.userName}></img>

            <div className="comment-text">{props.comment.text}</div>
            <div className="comment-vote">
                <button className="vote-button"> Like </button>
                <button className="vote-button"> Dislike </button>
            </div>


            <div className="comment-date">{props.comment.date}</div>
            <button onClick={deleteComment} className="comment-delete">X</button>
            {/* {
                    currentUser?.userId === props.comment.userId || currentUser?.isAdmin ?
                    <button onClick={deleteComment} className="comment-delete">X</button> : null
            } */}
        </div>
    );
}

export default Comment;