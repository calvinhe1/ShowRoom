import "./styles.css";

import ShowInfo from "../../react-components/ShowInfo";
import ShowsBar from "../../react-components/ShowsBar";
import CommentSection from "../../react-components/CommentSection";
import EpisodesCommentSection from "../../react-components/EpisodesCommentSection";

import { useEpisodeListContext } from "../../contexts/EpisodeList";
import {useState, useEffect} from "react";

import { uid } from "react-uid";
import EpisodeInfo from "../../react-components/EpisodeInfo";

import { useEpisodeRatingsListContext } from "../../contexts/EpisodeRatingList";

import EpisodesBar from "../../react-components/EpisodesBar";
import { getShowById } from "../../actions/show";
import { getAllSeasonsByShow } from "../../actions/season";

function ShowPage(props) {

    const [value, setValue] = useState("Cover");
    const [episode, setEpisode] = useState(false);
    const [show, setShow] = useState(props.showId)
    const [currentShow, setCurrentShow] = useState({});
    useEffect(() => {
        getShowById(props.showId).then(res => {
            setCurrentShow(res.data);
        });
    }, [])

    const episodeRatingsContext = useEpisodeRatingsListContext();
    const highestRatedEpisodes = episodeRatingsContext.getHighestRatedIds(props.showId)
    const topThree = highestRatedEpisodes == undefined ? [] : highestRatedEpisodes.slice(0,3)

    const [seasons, setSeasons] = useState([]);
    useEffect(() => {
        getAllSeasonsByShow(props.showId)
            .then(res => {
                setSeasons(res.data.seasons);
            })
    }, [])

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
        <div className="pageContainer">
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
                     {currentShow?.title}
                </span>
            </div>
            {
            episode? <EpisodeInfo currentShowId={props.showId} currentShow={currentShow} setCurrentShow={setCurrentShow} episode={value}></EpisodeInfo> : 
            <ShowInfo currentShowId={props.showId} currentShow={currentShow} setCurrentShow={setCurrentShow} ></ShowInfo>
            }  
            
            <div>
                <div className="show-page-show-bars-left">
                {
                    seasons.map(season => {
                        return (
                                <div className ="showbartwo" onClick={handleOnChange} key={uid(season)}>
                                    <h2>{season}</h2>
                                    <EpisodesBar currentShowId={props.showId} season={season}/>
                            
                                </div>
                        )
            
                    })
                }
                    <div className="showbartwo">
                        <h2>Recommended</h2>
                        <ShowsBar changePage={props.changePage} currentShowId={props.showId}/>
                    </div>
                </div>
                <div className="show-page-comments-right">
                    <CommentSection showId={props.showId} />
                </div>
            </div>
        </div>

    );
}

export default ShowPage;