import "./styles.css";

import { useUserProfileContext } from './../../contexts/UserProfile';
import { useUserListContext } from "../../contexts/UserList";
import { useCommentListContext } from "../../contexts/CommentList";
import { useShowListContext } from "../../contexts/ShowList";

function UserComment(props) {

    const userContext = useUserProfileContext();
    const currentUser = userContext.profile;

    const userListContext = useUserListContext();
    const showListContext = useShowListContext();
    const commentContext = useCommentListContext();

    function deleteComment(e) {
        e.preventDefault();
        commentContext.deleteCommentById(props.comment.commentId);
    }

    function getShowPicture() {
        const show = showListContext.getShowById(props.comment.showId);
        return show.picture;
    }

    return (
        <div className="recent-comment-container">
            <img className="recent-comment-show" src={getShowPicture()}></img>
            <span className="recent-comment-text">{props.comment.text}</span>
            <span className="recent-comment-date">{props.comment.date}</span>
        </div>
    );
}

export default UserComment;