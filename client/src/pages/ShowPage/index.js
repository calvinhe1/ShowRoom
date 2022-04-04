import "./styles.css";

import ShowInfo from "../../react-components/ShowInfo";
import ShowsBar from "../../react-components/ShowsBar";
import CommentSection from "../../react-components/CommentSection";
import EpisodesCommentSection from "../../react-components/EpisodesCommentSection";

import { useEpisodeListContext } from "../../contexts/EpisodeList";
import { useShowListContext } from "../../contexts/ShowList";
import {useState, useEffect} from "react";

import { uid } from "react-uid";
import {Link, useNavigate} from 'react-router-dom';
import EpisodeInfo from "../../react-components/EpisodeInfo";

import { useEpisodeRatingsListContext } from "../../contexts/EpisodeRatingList";

import  ShowEpisodeCard from "../../react-components/ShowEpisodeCard";
import EpisodesBar from "../../react-components/EpisodesBar";



function ShowPage(props) {

    const [value, setValue] = useState("Cover");
    const [episode, setEpisode] = useState(false);
    const [show, setShow] = useState(props.showId)

    const episodeListContext = useEpisodeListContext();
    const episodes = episodeListContext.getEpisodes();

    const episodesShow = episodeListContext.getAllEpisodesByShow(props.showId)
    const episodeRatingsContext = useEpisodeRatingsListContext();
    const highestRatedEpisodes = episodeRatingsContext.getHighestRatedIds(props.showId)
    const topThree = highestRatedEpisodes == undefined ? [] : highestRatedEpisodes.slice(0,3)


    //extract all the seasons for this show.
    const showListContext = useShowListContext();
    const shows = showListContext.getShowById(props.showId)  //extract seasons out.

    const ratings = []

    for (let i=0; i<topThree.length; i++) {
        const epRating = episodeRatingsContext.getEpisodeRatingById(props.showId, topThree[i].episode).rating
        if (epRating != undefined)
            ratings.push(episodeRatingsContext.getEpisodeRatingById(props.showId, topThree[i].episode).rating)
    }

    
    if (show != props.showId) {
        setEpisode(false)
        setShow(props.showId)
        setValue("Cover")
    }

    useEffect(() => {    
        window.scrollTo(0,0)
        if (value == "Cover") {
            setEpisode(false)
        }
        else {
            setEpisode(true)
        }
        
     }, [value]);

        const handleOnChange =  (e) => {
        e.preventDefault()
        let test = e.target.getAttribute("value")

            //ensure value is actually set before moving on.
        if (test != null) {
            setValue(test)
            setShow(props.showId)
        }
        }

    //extract top 3 most rated episodes, and put into cover page. (Also indicate the rating on it.)
    return (
        <div>
            {
            !episode && topThree.length != 0? 
            (
            <div className = "highestRatedEpisodes"  onClick={handleOnChange} > Top Rated Episodes! 
            <br></br><br></br>
                {   
                    topThree.map(episode =>  {
                        return (
                            <div key={uid(episode.episode)} className = "ep" value={episode.episode} >{"Episode " + episode.episode}<br></br>
                            <div key={uid(episode.rating)} className = "rating"  value={episode.episode} >Rating: {episode.rating.toFixed(1)} </div>
                            
                            </div>                        
                        )
                    })
                }
            </div>) : null
            }
            
            <div className="epContainer" value ={value} onClick={handleOnChange} >
                <br></br>
                <span className="ep" value={"Cover" }>
                     {shows.title}
                </span>
                {   
                    /* Show episodes on top
                    episodesShow.map(episode => {
                        return (
                            <span key={uid(episode)} className="ep" value={episode.episode}  >
                                {episode.episode}
                            </span>  
                        )
                    })*/
                }      
            </div>
            {
            episode? <EpisodeInfo currentShowId={props.showId} episode={value}></EpisodeInfo> : <ShowInfo currentShowId={props.showId} ></ShowInfo>
            }   

            {
            shows.season.map(season => {
                return (
                        <div className ="showbar" onClick={handleOnChange} key={uid(season)}>
                            <h2>{season}</h2>
                            <EpisodesBar currentShowId={props.showId} season={season}/>
                        </div>
                )
       
            })
            }
          
            <div className="showbar">
                <h2>Recommended</h2>
                <ShowsBar changePage={props.changePage} currentShowId={props.showId}/>
            </div>

            {
            //show episode or show comment section.
            episode? <EpisodesCommentSection currentShowId={props.showId} episode={value} /> : <CommentSection currentShowId={props.showId} />
            }
        </div>

    );
}

export default ShowPage;