import "./styles.css";

import {useState} from "react";

import { useUserProfileContext } from './../../contexts/UserProfile';
import { useShowListContext } from "../../contexts/ShowList";
import ShowRating from "./../ShowRating";
import { useEpisodeListContext } from "../../contexts/EpisodeList";

import ShowRatingEpisode from "./../ShowRatingEpisode";

import { modifyShow } from "../../actions/show";


import { modifyEpisode } from "../../actions/episode";

import { useEffect } from 'react';


function EpisodeInfo(props) {

    const currentUser =  useUserProfileContext().profile;

    //const episodeContext = useEpisodeListContext();
    // const episode = episodeContext.getEpisode(props.currentShowId, props.episode)
    const [episode, setEpisode] = useState(props.episode)

    useEffect(() => {
        setEpisode(props.episode)
    }, [props.episode]);

    const [edited, setEdited] = useState(false);


    function editEpisode(e) {
        e.preventDefault()
        setEdited(true);
        let temp = Object.assign({}, episode)
        /*
        if (e.target.name === 'genre' || e.target.name === 'season') { 
            temp[e.target.name] = e.target.value.split(',').map(c => c.trim())
        } */
        
        if (e.target.name === 'picture') {
            temp[e.target.name] = e.target.value.replaceAll('//', '/');
        } else {
            temp[e.target.name] = e.target.value;
        }
        setEpisode(temp);
        //episodeContext.setEpisode(temp, props.currentShowId);
     
    }

    function saveEpisode(e) {
        e.preventDefault();
        setEdited(false);

        const episodeInfo = {
            _id: episode.episode,
            showId: episode.showId,
            seasonId: episode.seasonId,
            episodeNum: episode.episode,
            title: episode.title,
            description: episode.description,
            airDate: episode.airData,
            image_url: episode.image_url
        }
        
        console.log("Episode info", episodeInfo)
        modifyEpisode(episodeInfo)


        //TODO send changes to server
    }

    return (
        <div>
            <div className={!currentUser?.isAdmin ? "user-view show-info" : "show-info"}>
                {/** TODO this image input can be used for admins to set new images */}
                <img src={episode?.image_url} alt="show picture" className="show-picture"></img>
                { 
                    //TODO cloudinary
                    currentUser?.isAdmin ? 
                    <input type="file" onChange={editEpisode} name="picture"></input> : null
                }
                <div className="show-text">
                    <form>
                        <div>
                            <label>Episode: </label>
                            <input type="text" 
                                placeholder="episode" 
                                name="episode" 
                                disabled={!currentUser?.isAdmin}
                                onChange={editEpisode}
                                value={episode?.episode}></input>
                        </div>
                        <div>
                            <label>Season: </label>
                            <input type="text" 
                                placeholder="episode" 
                                name="episode" 
                                disabled={!currentUser?.isAdmin}
                                onChange={editEpisode}
                                value={episode?.seasonId}></input>
                        </div>
                        <div>
                            <label>Released: </label>
                            <input type="text" 
                                placeholder="episode" 
                                name="episode" 
                                disabled={!currentUser?.isAdmin}
                                onChange={editEpisode}
                                value={episode?.airDate}></input>
                        </div>

                        <div>
                            <label>Title: </label>
                            <input type="text" 
                                placeholder="title" 
                                name="title" 
                                disabled={!currentUser?.isAdmin}
                                onChange={editEpisode}
                                value={episode?.title}></input>
                        </div>              
                        <div>
                            
                            <label>Description: </label>
                            <br></br>
                            <textarea type="text"
                                placeholder="description"
                                name="description"
                                disabled={!currentUser?.isAdmin}
                                onChange={editEpisode}
                                value={episode?.description}></textarea>
                        </div>
                        <div>
                            <label> <a href={episode?.link}>Watch here!</a></label>
                            <input type="text" 
                                name="link" 
                                disabled={!currentUser?.isAdmin}
                                onChange={editEpisode}></input>
                        </div> 
                        { currentUser?.isAdmin && edited ?     
                            <div className="edit-buttons">
                                <button onClick={saveEpisode} className="admin-button save-button">SAVE</button>
                            </div> :
                            null     
                        }                         
                    </form>
                </div>
                
                {/*props.episode == "Cover" ? null : <ShowRatingEpisode episode={episode}></ShowRatingEpisode>*/}
            
            </div>
        </div>
    );
}

export default EpisodeInfo;