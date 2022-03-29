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
import EpisodeInfo from "../../react-components/EpisodeInfo";


function ShowPage(props) {


    const [value, setValue] = useState("Cover");
    const [episode, setEpisode] = useState(false);
    const [show, setShow] = useState(props.showId)

    const episodeListContext = useEpisodeListContext();
    const episodes = episodeListContext.getEpisodes();

    const episodesShow = episodeListContext.getAllEpisodesByShow(props.showId)

    console.log("Show: ", props.showId)
    console.log("Show: ", show)


    useEffect(() => {        
        if (value == "Cover") {
        
            setEpisode(false)
         
        }
        else {
         
            setEpisode(true)
         
        }
      
        
     }, [value]);

        const handleOnChange =  (e) => {
        let test = e.target.getAttribute("value")

    
        //ensure value is actually set before moving on.
       setValue(test)
       setShow(props.showId)

        //the error is because it registers episode componetn a gain, because PICK did not actually change. Matter of fact, use effect didn't even execute. THAT Means value DID not change in value./
 
    }
 
    return (
        <div>
            
            <div className="epContainer" value ={value} onClick={handleOnChange} >
                <br></br>
                <span className="ep" value={"Cover" }>
                     Cover
                </span>
                {   

                    episodesShow.map(episode => {
                        return (
                            <span key={uid(episode)} className="ep" value={episode.episode}  >
                                {episode.episode}
                            </span>
                        )
                    })
                }
            </div>
            {
            //just see if it's old show.!
            episode && props.showId == show ? <EpisodeInfo currentShowId={props.showId} episode={value}></EpisodeInfo> : <ShowInfo currentShowId={props.showId} ></ShowInfo>
            }
            
            <div className="showbar">
                <ShowsBar changePage={props.changePage} currentShowId={props.showId}/>
            </div>

            <CommentSection currentShowId={props.showId} />
    
        </div>

    );
}

export default ShowPage;