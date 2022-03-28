import "./styles.css";

import ShowInfo from "../../react-components/ShowInfo";
import ShowsBar from "../../react-components/ShowsBar";
import CommentSection from "../../react-components/CommentSection";
import ShowEpisodes from "../../react-components/Episodes";

function ShowPage(props) {

    return (
        <div>
            <ShowEpisodes currentShowId={props.showId}/>
            <ShowInfo currentShowId={props.showId} ></ShowInfo>
            
            <div className="showbar">
                <ShowsBar changePage={props.changePage} currentShowId={props.showId}/>
            </div>

            <CommentSection currentShowId={props.showId} />
    
        </div>

    );
}

export default ShowPage;