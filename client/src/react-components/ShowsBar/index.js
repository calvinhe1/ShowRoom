import "./styles.css"

import { uid } from "react-uid";
import ShowCard from "../ShowCard";
import RatingStars from "../RatingStars";
import CommentCount from "../CommentCount";
import { useEffect, useRef, useState } from "react";
import { getAllShows } from "../../actions/show";

const MAX_SHOWS_RENDERED = 10;

function ShowsBar(props) {
    const element = useRef(null);
    const [shows, setShows] = useState([]);

    useEffect(() => {
        if (props.shows) {
            setShows(props.shows);
        } else {
            getAllShows().then(res => {
                setShows(res.data.shows);
            })
        }
    }, [props.shows])
    

    function scrollRight() {
        element.current.children[1].scrollBy({left: 20, behaviour: "smooth"});
        setTimeout(() => {
            if (element.current.children[2].matches(':hover')) {
                scrollRight(); 
            }
        }, 100);
    }

    function scrollLeft() {
        element.current.children[1].scrollBy({left: -20, behaviour: "smooth"});
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
                    return show._id !== props.currentShowId ? 
                    <div className="showsbar-column" key={uid(show)}>
                        <ShowCard changePage={props.changePage} show={show} />
                        {props.showRating ? <RatingStars ratingInfo={show.ratings} ></RatingStars> : null}
                        {props.showCommentCount ? <CommentCount count={show.commentCount} ></CommentCount> : null}
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