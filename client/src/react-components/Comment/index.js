import "./styles.css";

import { useUserProfileContext } from './../../contexts/UserProfile';
import { useUserListContext } from "../../contexts/UserList";
import { useCommentListContext } from "../../contexts/CommentList";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../actions/user";
import { Link } from "react-router-dom";
import { deleteComment } from "../../actions/comment";

function Comment(props) {

    const [commentUser, setCommentUser] = useState({});

    useEffect(() => {
        getUserInfo(props.comment.authorId).then(res => {
            setCommentUser(res);
        })
    }, []);

    const userContext = useUserProfileContext();
    const currentUser = userContext.profile;
    const commentContext = useCommentListContext();

    function removeComment(e) {
        e.preventDefault();
        deleteComment(props.comment._id).then(() => {
            const filteredC = props.comments.filter(c => c !== props.comment._id);
            props.setComments(filteredC);
        });
    }

    function likeComment(){
        //TODO
        vote(true)
    }

    function dislikeComment (){
        //TODO
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
            
            <div class="break"></div>

            <div className="comment-meta-data">
                <span className="vote-section">
                    <span className="vote-container">
                        <i className="fa fa-thumbs-up" id={"likeIcon" + props.comment._id} aria-hidden="true" onClick={likeComment}></i>
                        <span className="vote-number" id={"likeNum" + props.comment._id}>0</span>
                    </span>
                    <span className="vote-container">
                        <i className="fa fa-thumbs-down" id={"dislikeIcon" + props.comment._id} aria-hidden="true" onClick={dislikeComment}></i>
                        <span className="vote-number" id={"dislikeNum" + props.comment._id}>0</span>
                    </span>
                </span>

                <span className="comment-date">{new Date(props.comment.createdAt).toLocaleDateString("en-US")}</span>
                {
                        currentUser?._id === props.comment.authorId || currentUser?.isAdmin ?
                        <button onClick={removeComment} className="comment-delete">X</button> : null
                }
            </div>
        </span>
    );
}

export default Comment;