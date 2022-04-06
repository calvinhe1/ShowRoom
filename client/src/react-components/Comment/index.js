import "./styles.css";

import { useUserProfileContext } from './../../contexts/UserProfile';
import { useEffect, useState } from "react";
import { getUserInfo } from "../../actions/user";
import { Link } from "react-router-dom";
import { deleteComment, likeDislikeComment } from "../../actions/comment";

function Comment(props) {

    const [commentUser, setCommentUser] = useState({});

    useEffect(() => {
        getUserInfo(props.comment.authorId).then(res => {
            setCommentUser(res);
        })
    }, []);

    const userContext = useUserProfileContext();
    const currentUser = userContext.profile;

    function removeComment(e) {
        e.preventDefault();
        deleteComment(props.comment._id).then(() => {
            const filteredC = props.comments.filter(c => c._id !== props.comment._id);
            props.setComments(filteredC);
        });
    }

    /** Trickery to get the state change */
    function modifyComments() {
        const newArr= [...props.comments];
        const index = newArr.findIndex((a) => a._id === props.comment._id);
        newArr[index] = Object.assign({}, props.comment);
        props.setComments(newArr);
    }

    function likeComment(){
        if (currentUser._id == null){
            alert("You must be logged in to vote");
            return
        }
        props.comment.numLikes++;
        modifyComments()
        likeDislikeComment(props.comment._id, "like");
    }

    function dislikeComment (){
        if (currentUser._id == null){
            alert("You must be logged in to vote");
            return
        }
        props.comment.numDislikes++;
        modifyComments()
        likeDislikeComment(props.comment._id, "dislike");
    }

    return (
        <span className="comment-container">
            {/** TODO when profiles are set up <Link to={"/profile/" + props.comment.userId}/> */}

            <Link to={'/user/' + commentUser._id}>
                <img className="comment-user" src={commentUser.image_url} alt={commentUser.username}></img>
            </Link>

            <div className="comment-text">{props.comment.content}</div>
            
            <div class="break"></div>

            <div className="comment-meta-data">
                <span className="vote-section">
                    <span className="vote-container">
                        <i className="fa fa-thumbs-up" id={"likeIcon" + props.comment._id} aria-hidden="true" onClick={likeComment}></i>
                        <span className="vote-number" id={"likeNum" + props.comment._id} >({props.comment.numLikes || '0'})</span>
                    </span>
                    <span className="vote-container">
                        <i className="fa fa-thumbs-down" id={"dislikeIcon" + props.comment._id} aria-hidden="true" onClick={dislikeComment}></i>
                        <span className="vote-number" id={"dislikeNum" + props.comment._id} >({props.comment.numDislikes || '0'})</span>
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