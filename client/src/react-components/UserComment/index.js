import "./styles.css";

import { useShowListContext } from "../../contexts/ShowList";

function UserComment(props) {

    const showListContext = useShowListContext();

    function getShowPicture() {
        const show = showListContext.getShowById(props.comment.showId);
        return show.picture;
    }

    return (
        <div className="recent-comment-container">
            <img className="recent-comment-show" src={getShowPicture()}></img>
            <span className="recent-comment-text">{props.comment.text}</span>
            <span className="recent-comment-date">{props.comment.date}</span>
        </div>
    );
}

export default UserComment;