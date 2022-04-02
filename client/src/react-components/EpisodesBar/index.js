import "./styles.css"

import { uid } from "react-uid";
import ShowCard from "../ShowCard";
import { useShowListContext } from "../../contexts/ShowList";
import RatingStars from "../RatingStars";
import { useShowRatingsListContext } from "../../contexts/ShowRatingList";
import CommentCount from "../CommentCount";
import { useCommentListContext } from "../../contexts/CommentList";
import { useEffect, useRef } from "react";

import {useEpisodeListContext} from "../../contexts/EpisodeList";

import ShowEpisodeCard from "../ShowEpisodeCard";

const MAX_SHOWS_RENDERED = 10;

function EpisodesBar(props) {

    const showListContext = useShowListContext();
    const shows = props.shows || showListContext.getShows();
    const ratingContext = useShowRatingsListContext();
    const commentContext = useCommentListContext();

    //get episodes from show.
    const episodeContext = useEpisodeListContext();
   
    const episodes = episodeContext.getEpisodes()

    //Extract episodes that match show.
    let episodesOfShow = []

    for (let i =0; i<episodes.length; i++) {
        if (episodes[i].showId == props.currentShowId && episodes[i].season == props.season) {
            episodesOfShow.push(episodes[i])
        }
    }

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
                episodesOfShow.slice(0, MAX_SHOWS_RENDERED).map(episode => {
                    return (
                        <div className="showsbar-column" key={uid(episode.episode)}>
                            <ShowEpisodeCard episode={episode} />
                        </div>  
                    )                 
                })
            }
            </div>
            <div className="showsbar-column scroll-button scroll-button-right">
                <button className="fa fa-angle-right fa-5x" onMouseOver={scrollRight}></button>    
            </div>
        </div>
    );
}

export default EpisodesBar;