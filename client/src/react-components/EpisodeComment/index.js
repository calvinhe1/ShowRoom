import "./styles.css";

import { useUserProfileContext } from './../../contexts/UserProfile';
import { useUserListContext } from "../../contexts/UserList";
import { useCommentListContext } from "../../contexts/CommentList";

import { useEpisodeCommentListContext } from "../../contexts/EpisodeCommentList";

function EpisodeComment(props) {

    const userContext = useUserProfileContext();
    const currentUser = userContext.profile;

    const userListContext = useUserListContext();
    //const commentContext = useCommentListContext();
    const episodeCommentContext = useEpisodeCommentListContext();

    function deleteComment(e) {
        e.preventDefault();
        episodeCommentContext.deleteEpisodeCommentById(props.comment.commentId);
    }

    function getProfilePicture() {
        const user = userListContext.getUserById(props.comment.userId);
        return user.profilePicture;
    }

    function likeComment(){
        vote(true)
    }

    function dislikeComment (){
        vote(false)
    }

    function vote(clickedLike){
        if (currentUser.userId == null){
            alert("You must be logged in to vote");
            return
        }

        const likeIcon = document.getElementById("likeIcon" + props.comment.commentId);
        const likeNum = document.getElementById("likeNum" + props.comment.commentId);
        const dislikeIcon = document.getElementById("dislikeIcon" + props.comment.commentId);
        const dislikeNum = document.getElementById("dislikeNum" + props.comment.commentId);

        if (clickedLike){
            likeIcon.style.color = "deepSkyBlue"
            dislikeIcon.style.color = "black"
            episodeCommentContext.likeEpisodeCommentByIds(props.comment.commentId, currentUser.userId)
        }
        else {
            dislikeIcon.style.color = "deepSkyBlue"
            likeIcon.style.color = "black"   
            episodeCommentContext.dislikeEpisodeCommentByIds(props.comment.commentId, currentUser.userId)
        }

        // replace with amount of users that like/dislike the comment
        const likeCount = 0
        const dislikeCount = 0

        likeNum.innerText = likeCount
        dislikeNum.innerText = dislikeCount

    }


    return (
        <div className="comment-container">
            {/** TODO when profiles are set up <Link to={"/profile/" + props.comment.userId}/> */}

            <img className="comment-user" src={getProfilePicture()} alt={currentUser.userName}></img>

            <div className="comment-text">{props.comment.text}</div>
            <div className="vote-section">
                <div className="vote-container">
                    <i className="fa fa-thumbs-up" id={"likeIcon" + props.comment.commentId} aria-hidden="true" onClick={likeComment}></i>
                    <span className="vote-number" id={"likeNum" + props.comment.commentId}>0</span>
                </div>
                <div className="vote-container">
                    <i className="fa fa-thumbs-down" id={"dislikeIcon" + props.comment.commentId} aria-hidden="true" onClick={dislikeComment}></i>
                    <span className="vote-number" id={"dislikeNum" + props.comment.commentId}>0</span>
                </div>
            </div>


            <div className="comment-date">{props.comment.date}</div>
            {
                    currentUser?.userId === props.comment.userId || currentUser?.isAdmin ?
                    <button onClick={deleteComment} className="comment-delete">X</button> : null
            }
        </div>
    );
}

export default EpisodeComment;