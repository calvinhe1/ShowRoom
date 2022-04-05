import "./styles.css"

import { uid } from "react-uid";
import { useEffect, useRef, useState } from "react";

import ShowEpisodeCard from "../ShowEpisodeCard";
import { getAllEpisodesBySeason } from "../../actions/episode";

function EpisodesBar(props) {
   
    const [episodes, setEpisodes] = useState([]);
    useEffect(() => {
        getAllEpisodesBySeason(props.season._id).then(res => {
            setEpisodes(res.data.episodes);
        })
    }, [])
    //Extract episodes that match show.
    let episodesOfShow = []

    console.log("EPISODES BAR!: ", episodes)
    for (let i =0; i<episodes.length; i++) {
        if (episodes[i].showId == props.currentShowId && episodes[i].season == props.season) {
            episodesOfShow.push(episodes[i])
        }
    }

    const element = useRef(null);

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
                episodes.map(episode => {
                    return (
                        <div className="showsbar-column" key={uid(episode)}>
                            <ShowEpisodeCard episode={episode}  />
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