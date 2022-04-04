import "./styles.css"

import UserShow from "../UserShow";
import UserComment from "../UserComment";

import { useShowListContext } from './../../contexts/ShowList';
import { useCommentListContext } from "../../contexts/CommentList";
import { useState } from "react";
import { getUserInfo } from "../../actions/user";

function ProfileInformation(props) {

    const showContext = useShowListContext(); 
    const commentContext = useCommentListContext();

    const [user, setUser] = useState({});
    if (Object.keys(user).length === 0) {
        getUserInfo(props.id).then(res => {
            setUser(res);
        })
    }

    const DEFAULT_IMAGE = "/images/profile-picture.jpg";

    // replace with real data
    const ids = [0, 1, 2]
    const comments = commentContext.getCommentsByUserId(0);

    return (
        <div className="info-container">

            <div className="profile-info-container">
                <img className="profile-picture" src={user.image_url || DEFAULT_IMAGE}></img>
                <div className="username"> {user.username}'s Profile </div>
            </div>

            /** TODO style the bio */
            <div>{user.bio}</div>

            <div className="top-shows-container">
                <div className="top-shows-title">{user.username}'s Top Shows</div>
                <div className="top-shows">
                    {
                        ids.map(i => {
                            return <UserShow show={showContext.getShowById(i)}/>;
                        })
                    }
                </div>
                    
            </div>

            <div className="recent-comments-container">
                <div className="recent-comments-title">{user.username}'s Recent Comments</div>
                <div className="user-comments">
                {
                    comments.map(c => {
                        return <UserComment comment={c}/>;
                    })
                }
                </div>
            </div>
        </div>
    );
}

export default ProfileInformation;