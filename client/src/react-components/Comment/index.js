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
        console.log(props.comment.userId)
        // const user = userListContext.getUserById(props.comment.userId);
        // return user.profilePicture;
    }

    function likeComment(){
        console.log(currentUser)
        // commentContext.likeCommentByIds(props.comment.commentId);
    }

    return (
        <div className="comment-container">
            {/** TODO when profiles are set up <Link to={"/profile/" + props.comment.userId}/> */}

            {getProfilePicture()}
            {/* <img className="comment-user" src={getProfilePicture()} alt={currentUser.userName}></img> */}

            <div className="comment-text">{props.comment.text}</div>
            <div className="vote-section">
                <div className="vote-container">
                    <button className="vote-button" onClick={likeComment}> Like </button>
                    <span className="vote-number"> NUMBER </span>
                </div>
                <div className="vote-container">
                    <button className="vote-button" > Dislike </button>
                    <span className="vote-number"> NUMBER </span>
                </div>
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