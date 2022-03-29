import "./styles.css";
import React from "react";
import { useEpisodeListContext } from "../../contexts/EpisodeList";
import { useShowListContext } from "../../contexts/ShowList";
import {useState, useEffect} from "react";


import { uid } from "react-uid";
import {Link, useNavigate} from 'react-router-dom';

import { EpisodeInfo } from "../EpisodeInfo"


function ShowEpisodes(props) {

    //const showListContext = useShowListContext();
    //const shows = showListContext.getShows();
    //const show = showListContext.getShowById(props.currentShowId);

    const [pick, setPick] = useState("Cover");
    const [episode, setEpisode] = useState(false);

    const episodeListContext = useEpisodeListContext();
    const episodes = episodeListContext.getEpisodes();

    console.log(episodes)  

    useEffect(() => {        
        if (pick == "Cover") {
            setEpisode(false)
        }
        else {
            setEpisode(true)
        }
        
     }, [pick]);

     const handleOnChange = (e) => {
      
        setPick(e.target.value)
    }



    let episodesArray = []

    //episodes for show.
    for (let i =0; i<episodes.length; i++) {
        if (props.currentShowId == episodes[i].showId) {
            episodesArray.push(episodes[i])
        }

    }
        
    function clickShow(e) {
        e.preventDefault()
        console.log("When clicked, navigate to episode page.")
    }

    //Should return the list of episodes (go through episodes, if it matches show id, show the corresponding episode number (For now))
    return (
        
        <div className="epContainer">
            <br></br>
            <span className="ep" onClick={handleOnChange}>
                Cover
            </span>
            {   
                episodesArray.map(episode => {
                    return (
                        <span key={uid(episode)} className="ep"  onClick={handleOnChange}>
                            {episode.episode}
                        </span>
                    )
                })
            }
          
        </div>
    )

}

export default ShowEpisodes 