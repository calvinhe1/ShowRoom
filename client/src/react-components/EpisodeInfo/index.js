import "./styles.css";

import {useState} from "react";

import { useUserProfileContext } from './../../contexts/UserProfile';
import { useShowListContext } from "../../contexts/ShowList";
import ShowRating from "./../ShowRating";
import { useEpisodeListContext } from "../../contexts/EpisodeList";

import ShowRatingEpisode from "./../ShowRatingEpisode";



function EpisodeInfo(props) {

    const currentUser =  useUserProfileContext().profile;
    const showContext = useShowListContext();
    const show = showContext.getShowById(props.currentShowId);

    const episodeContext = useEpisodeListContext();
    const episode = episodeContext.getEpisode(props.currentShowId, props.episode)
    
    const [edited, setEdited] = useState(false);


    //Should store genres as an array 
    function getGenre(genres) {
        if (!genres || genres.length === 0) return '';

        let res = genres[0]
        if (genres.length > 1) {
            for (let i = 1; i < genres.length; i++) {
                res = res + ', ' + genres[i];
            }
        }
        return res;
    }

    function editEpisode(e) {
        
        let temp = Object.assign({}, episode)
        if (e.target.name === 'genre') { 
            temp[e.target.name] = e.target.value.split(',').map(c => c.trim())
        } else if (e.target.name === 'picture') {
            temp[e.target.name] = e.target.value.replaceAll('//', '/');
        } else {
            temp[e.target.name] = e.target.value;
        }
        episodeContext.setEpisode(temp, props.currentShowId);
        setEdited(true);
    }

    function saveEpisode(e) {
        e.preventDefault();
        setEdited(false);
        //TODO send changes to server
    }

    return (
        <div>
            <div className={!currentUser?.isAdmin ? "user-view show-info" : "show-info"}>
                {/** TODO this image input can be used for admins to set new images */}
                <img src={episode?.picture} alt="show picture" className="show-picture"></img>
                { 
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
                
                {props.episode == "Cover" ? null : <ShowRatingEpisode episode={episode}></ShowRatingEpisode>}
            
            </div>
        </div>
    );
}

export default EpisodeInfo;