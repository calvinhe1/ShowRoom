import "./styles.css";

import ShowInfo from "../../react-components/ShowInfo";
import ShowsBar from "../../react-components/ShowsBar";
import CommentSection from "../../react-components/CommentSection";
import ShowEpisodes from "../../react-components/Episodes";


import { useEpisodeListContext } from "../../contexts/EpisodeList";
import { useShowListContext } from "../../contexts/ShowList";
import {useState, useEffect} from "react";

import { uid } from "react-uid";
import {Link, useNavigate} from 'react-router-dom';
import { EpisodeInfo } from "../../react-components/EpisodeInfo"


function ShowPage(props) {


    const [pick, setPick] = useState("Cover");
    const [episode, setEpisode] = useState(false);

    const episodeListContext = useEpisodeListContext();
    const episodes = episodeListContext.getEpisodes();

    const episodesShow = episodeListContext.getAllEpisodesByShow(props.showId)



    useEffect(() => {        
        if (pick == "Cover") {
            setEpisode(false)
        }
        else {
            setEpisode(true)
        }
        
     }, [pick]);

     const handleOnChange = (e) => {
        let test = e.target.getAttribute("value")
        setPick(test)
        console.log(pick)
    }
 
    return (
        <div>
            
            <div className="epContainer" >
                <br></br>
                <span className="ep" value="Cover" onClick={handleOnChange}  >
                     Cover
                </span>
                {   

                    episodesShow.map(episode => {
                        return (
                            <span key={uid(episode)} className="ep" value={episode.episode} onClick={handleOnChange} >
                                {episode.episode}
                            </span>
                        )
                    })
                }
            </div>
            {episode ? <ShowInfo currentShowId={props.showId} ></ShowInfo> : <h1>Hey</h1>}
            

            <div className="showbar">
                <ShowsBar changePage={props.changePage} currentShowId={props.showId}/>
            </div>

            <CommentSection currentShowId={props.showId} />
    
        </div>

    );
}

export default ShowPage;