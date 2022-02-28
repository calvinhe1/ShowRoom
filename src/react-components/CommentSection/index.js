import "./styles.css"

import Comment from "../Comment";

import {uid} from "react-uid";

import {useState} from "react";

import { useUserProfileContext } from './../../contexts/UserProfile';

function CommentSection(props) {

    const [comment, setComment] = useState('');

    const currentUser = useUserProfileContext().profile;

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
        newComment.commentId = Math.floor(Math.random() * 100000);
        props.addComment(newComment);
        setComment('');
    }

    return (
        <div className="comment-section-container">
            <label className="comment-label">Comment Section!</label>
            <div className="comment-section">
                {
                    props.comments.map(c => {
                        return c.showId === props.currentShowId ? <Comment comment={c} users={props.users} deleteComment={props.deleteComment} key={uid(c)}/> : null;
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