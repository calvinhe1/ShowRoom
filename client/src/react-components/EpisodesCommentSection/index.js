import "./styles.css"

import Comment from "../Comment";
import EpisodeComment from "../EpisodeComment";
import {uid} from "react-uid";
import {useState} from "react";

import { useUserProfileContext } from './../../contexts/UserProfile';
import { useCommentListContext } from "../../contexts/CommentList";
import { useEpisodeCommentListContext } from "../../contexts/EpisodeCommentList";

function EpisodesCommentSection(props) {

    const [comment, setComment] = useState('');
    const userContext = useUserProfileContext();
    const currentUser = userContext.profile;

    //const commentContext = useCommentListContext();
    //const comments = commentContext.getCommentsByShowId(props.currentShowId);
    const episodeCommentContext =useEpisodeCommentListContext();
    const episodeComments = episodeCommentContext.getEpisodeComments(props.episode, props.currentShowId)

    function changeComment(e) {
        e.preventDefault();
        setComment(e.target.value);
    }
    
    function postNewComment(e) {
        if (comment === '') return;
        const newComment = {
            showId: props.currentShowId,
            episodeId: props.episode,
            userId: currentUser.userId,
            text: comment,
            date: new Date().toDateString(),
        }
        //TODO better uuid's (for server)
        episodeCommentContext.addEpisodeComment(newComment);
        setComment('');
    }

    return (
        <div className="comment-section-container">
            <label className="comment-label">Comment Section!</label>
            <div className="comment-section">
                {
                    episodeComments.map(c => {
                        return c.showId === props.currentShowId ? <EpisodeComment comment={c} key={uid(c)}/> : null;
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

export default EpisodesCommentSection;