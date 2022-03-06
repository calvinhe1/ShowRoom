import "./styles.css"

import { uid } from "react-uid";
import ShowCard from "../ShowCard";
import { useShowListContext } from "../../contexts/ShowList";
import RatingStars from "../RatingStars";
import { useShowRatingsListContext } from "../../contexts/ShowRatingList";
import CommentCount from "../CommentCount";
import { useCommentListContext } from "../../contexts/CommentList";
import { useEffect, useRef } from "react";

const MAX_SHOWS_RENDERED = 10;

function ShowsBar(props) {

    const showListContext = useShowListContext();
    const shows = props.shows || showListContext.getShows();
    const ratingContext = useShowRatingsListContext();
    const commentContext = useCommentListContext();

    const element = useRef(null);

    function scrollRight() {
        element.current.children[1].scrollBy({left: 10, behaviour: "smooth"});
        setTimeout(() => {
            if (element.current.children[2].matches(':hover')) {
                scrollRight(); 
            }
        }, 100);
    }

    function scrollLeft() {
        element.current.children[1].scrollBy({left: -10, behaviour: "smooth"});
        setTimeout(() => {
            if (element.current.children[0].matches(':hover')) {
                scrollLeft();
            }
        }, 100);
    }

    return (
        <div ref={element}>
            <div className="showsbar-column scroll-button scroll-button-left">
                <button className="fa fa-angle-left fa-5x" onMouseOver={scrollLeft}></button>    
            </div>
            <div className="showsbar-row">
            {
                shows.slice(0, MAX_SHOWS_RENDERED).map(show => {
                    return show.showId !== props.currentShowId ? 
                    <div className="showsbar-column" key={uid(show)}>
                        <ShowCard changePage={props.changePage} show={show} />
                        {props.showRating ? <RatingStars ratingInfo={ratingContext.getShowRatingById(show.showId)} ></RatingStars> : null}
                        {props.showCommentCount ? <CommentCount count={commentContext.getCommentsByShowId(show.showId).length} ></CommentCount> : null}
                    </div>
                    : null;
                })
            }
            </div>
            <div className="showsbar-column scroll-button scroll-button-right">
                <button className="fa fa-angle-right fa-5x" onMouseOver={scrollRight}></button>    
            </div>
        </div>
    );
}

export default ShowsBar;