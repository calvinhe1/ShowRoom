import "./styles.css";

import ShowInfo from "../../react-components/ShowInfo";
import ShowsBar from "../../react-components/ShowsBar";
import CommentSection from "../../react-components/CommentSection";

function ShowPage(props) {

    return (
        <div>
            <ShowInfo key={props.showId} shows={props.shows} currentShowId={props.showId} changeShow={props.changeShow}></ShowInfo>
            
            <div className="showbar">
                <ShowsBar changePage={props.changePage} shows={props.shows} currentShowId={props.showId}/>
            </div>

            <CommentSection currentShowId={props.showId} comments={props.comments} addComment={props.addComment} deleteComment={props.deleteComment} users={props.users}/>
        </div>

    );
}

export default ShowPage;