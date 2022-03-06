import "./styles.css"

import UserComment from "../UserComment";

import {uid} from "react-uid";

import {useState} from "react";

import { useUserProfileContext } from './../../contexts/UserProfile';
import { useCommentListContext } from "../../contexts/CommentList";

function UserCommentSection(props) {

    const [comment, setComment] = useState('');

    const userContext = useUserProfileContext();
    const currentUser = userContext.profile;

    const commentContext = useCommentListContext();
    const comments = commentContext.getCommentsByUserId(currentUser.userId);

    return (
        <div className="comment-section-container">
            <div className="comment-section">
                {
                    comments.map(c => {
                        return <UserComment comment={c} key={uid(c)}/>;
                    })
                }
            </div>
        </div>
    );
}

export default UserCommentSection;