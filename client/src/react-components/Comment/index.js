import "./styles.css";

import { useUserProfileContext } from './../../contexts/UserProfile';
import { useUserListContext } from "../../contexts/UserList";
import { useCommentListContext } from "../../contexts/CommentList";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../actions/user";
import { Link } from "react-router-dom";

function Comment(props) {

    const [commentUser, setCommentUser] = useState({});

    useEffect(() => {
        getUserInfo(props.comment.authorId).then(res => {
            setCommentUser(res);
        })
    }, []);

    const userContext = useUserProfileContext();
    const currentUser = userContext.profile;

    const userListContext = useUserListContext();

    const commentContext = useCommentListContext();

    function deleteComment(e) {
        e.preventDefault();
        commentContext.deleteCommentById(props.comment.commentId);
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
            commentContext.likeCommentByIds(props.comment.commentId, currentUser.userId)
        }
        else {
            dislikeIcon.style.color = "deepSkyBlue"
            likeIcon.style.color = "black"   
            commentContext.dislikeCommentByIds(props.comment.commentId, currentUser.userId)
        }

        // replace with amount of users that like/dislike the comment
        const likeCount = 0
        const dislikeCount = 0

        likeNum.innerText = likeCount
        dislikeNum.innerText = dislikeCount

    }


    return (
        <span className="comment-container">
            {/** TODO when profiles are set up <Link to={"/profile/" + props.comment.userId}/> */}

            <Link to={'/user/' + commentUser._id}>
                <img className="comment-user" src={commentUser.image_url} alt={currentUser.username}></img>
            </Link>

            <div className="comment-text">{props.comment.content}</div>
            <div className="vote-section">
                <div className="vote-container">
                    <i className="fa fa-thumbs-up" id={"likeIcon" + props.comment._id} aria-hidden="true" onClick={likeComment}></i>
                    <span className="vote-number" id={"likeNum" + props.comment._id}>0</span>
                </div>
                <div className="vote-container">
                    <i className="fa fa-thumbs-down" id={"dislikeIcon" + props.comment._id} aria-hidden="true" onClick={dislikeComment}></i>
                    <span className="vote-number" id={"dislikeNum" + props.comment._id}>0</span>
                </div>
            </div>


            <div className="comment-date">{new Date(props.comment.createdAt).toLocaleDateString("en-US")}</div>
            {
                    currentUser?._id === props.comment.authorId || currentUser?.isAdmin ?
                    <button onClick={deleteComment} className="comment-delete">X</button> : null
            }
        </span>
    );
}

export default Comment;