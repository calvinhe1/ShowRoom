import "./styles.css"

import Comment from "../Comment";

import {uid} from "react-uid";

import {useEffect, useState} from "react";

import { useUserProfileContext } from './../../contexts/UserProfile';
import { useCommentListContext } from "../../contexts/CommentList";
import { createComment, getCommentsByTopicId } from "../../actions/comment";

function CommentSection(props) {

    const [comment, setComment] = useState('');

    const userContext = useUserProfileContext();
    const currentUser = userContext.profile;

    //const comments = commentContext.getCommentsByShowId(props.currentShowId);
    const [comments, setComments] = useState([]);
    useEffect(() => {
        if(props.showId) {
            getCommentsByTopicId(props.showId)
                .then(res => {
                    setComments(res.data.comments);
                })
        }
    }, [props.showId])

    function changeComment(e) {
        e.preventDefault();
        setComment(e.target.value);
    }

    function postNewComment(e) {
        if (comment === '') return;
        createComment(currentUser._id, props.episode ? "episode" : "show", props.showId, comment)
            .then(() => {
                setComment('');
            });
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