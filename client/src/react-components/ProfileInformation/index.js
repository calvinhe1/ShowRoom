import "./styles.css"

import UserShow from "../UserShow";
import UserComment from "../UserComment";

import { useShowListContext } from './../../contexts/ShowList';
import { useCommentListContext } from "../../contexts/CommentList";

// use wildcard in url to get information for specific user

function ProfileInformation(props) {

    const showContext = useShowListContext(); 
    const commentContext = useCommentListContext();

    // replace with real data
    const username = "Claudia"
    const ids = [0, 1, 2]
    const comments = commentContext.getCommentsByUserId(0);

    return (
        <div className="info-container">

            <div className="profile-info-container">
                <div className="profile-picture"></div>
                <div className="username"> {username}'s Profile </div>
            </div>

            <div className="top-shows-container">
                <div className="top-shows-title">{username}'s Top Shows</div>
                <div className="top-shows">
                    {
                        ids.map(i => {
                            return <UserShow show={showContext.getShowById(i)}/>;
                        })
                    }
                </div>
                    
            </div>

            <div className="recent-comments-container">
                <div className="recent-comments-title">{username}'s Recent Comments</div>
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