import "./styles.css"

import { uid } from "react-uid";
import ShowCard from "../ShowCard";
import { useShowListContext } from "../../contexts/ShowList";
import RatingStars from "../RatingStars";
import { useShowRatingsListContext } from "../../contexts/ShowRatingList";
import CommentCount from "../CommentCount";
import { useCommentListContext } from "../../contexts/CommentList";

const MAX_SHOWS_RENDERED = 5;

function ShowsBar(props) {

    const showListContext = useShowListContext();
    const shows = props.shows || showListContext.getShows();
    const ratingContext = useShowRatingsListContext();
    const commentContext = useCommentListContext();

    return (
        <div className="showsbar-row">
            {
                shows.slice(0, MAX_SHOWS_RENDERED).map(show => {
                    return show.showId !== props.currentShowId ? 
                    <div className="showsbar-column">
                        <ShowCard changePage={props.changePage} show={show} key={uid(show)}/>
                        {props.showRating ? <RatingStars ratingInfo={ratingContext.getShowRatingById(show.showId)}></RatingStars> : null}
                        {props.showCommentCount ? <CommentCount count={commentContext.getCommentsByShowId(show.showId).length}></CommentCount> : null}
                    </div>
                    : null;
                })
            }

        </div>
    );
}

export default ShowsBar;