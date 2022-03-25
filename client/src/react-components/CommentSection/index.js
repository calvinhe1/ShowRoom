import "./styles.css"

import Comment from "../Comment";

import {uid} from "react-uid";

import {useState} from "react";

import { useUserProfileContext } from './../../contexts/UserProfile';
import { useCommentListContext } from "../../contexts/CommentList";

function CommentSection(props) {

    const [comment, setComment] = useState('');

    const userContext = useUserProfileContext();
    const currentUser = userContext.profile;

    const commentContext = useCommentListContext();
    const comments = commentContext.getCommentsByShowId(props.currentShowId);

    function changeComment(e) {
        e.preventDefault();
        setComment(e.target.value);
    }

    function postNewComment(e) {
        if (comment === '') return;
        const newComment = {
            showId: props.currentShowId,
            userId: currentUser.userId,
            text: comment,
            date: new Date().toDateString(),
        }
        //TODO better uuid's (for server)
        commentContext.addComment(newComment);
        setComment('');
    }

    return (
        <div className="comment-section-container">
            <label className="comment-label">Comment Section!</label>
            <div className="comment-section">
                {
                    comments.map(c => {
                        return c.showId === props.currentShowId ? <Comment comment={c} key={uid(c)}/> : null;
                    })
                }
                {
                    currentUser.userId !== undefined ? <div className="comment-new-container">
                        <input type="text" placeholder="Enter comment" value={comment} className="comment-new" onChange={changeComment}></input>
                        <button onClick={postNewComment} className="post-button">Post</button>
                    </div> : null
                }
            </div>
        </div>
    );
}

export default CommentSection;