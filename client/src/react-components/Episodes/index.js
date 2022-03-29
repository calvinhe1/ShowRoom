import "./styles.css";
import React from "react";
import { useEpisodeListContext } from "../../contexts/EpisodeList";
import { useShowListContext } from "../../contexts/ShowList";
import {useState} from "react";


import { uid } from "react-uid";
import {Link, useNavigate} from 'react-router-dom';

function ShowEpisodes(props) {

    const showListContext = useShowListContext();
    const shows = showListContext.getShows();
    const show = showListContext.getShowById(props.currentShowId);

    const episodeListContext = useEpisodeListContext();
    const episodes = episodeListContext.getEpisodes();


    console.log("SHOWS: ")
    console.log(shows)
    console.log(episodes)  //Why is episodes null?


    function clickShow(e) {
        e.preventDefault()
        console.log("When clicked, navigate to episode page.")

    }

    //Should return the list of episodes (go through episodes, if it matches show id, show the corresponding episode number (For now))
    return (
        <div>
            {   
                shows.map(show => {
                    return (
                        <div key={uid(show)}>
                            <Link to={"/show_page/" + show.showId}>
                                <button className="Name"> {show.title} </button>
                            </Link>
                        </div>
                    )
                })
            }
            <br></br>
            <span className="ep">1</span>
            <span className="ep">2</span>
            <span className="ep">3</span>
            <span className="ep">4</span>
        </div>
    )

}

export default ShowEpisodes 