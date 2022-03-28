import "./styles.css";

import {useState} from "react";

import { useUserProfileContext } from './../../contexts/UserProfile';
import { useShowListContext } from "../../contexts/ShowList";
import ShowRating from "./../ShowRating";

function ShowInfo(props) {

    const currentUser =  useUserProfileContext().profile;
    const showContext = useShowListContext();
    const show = showContext.getShowById(props.currentShowId);

    const [edited, setEdited] = useState(false);

    //Store seasons as an array


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

    function editShow(e) {
        
        let temp = Object.assign({}, show)
        if (e.target.name === 'genre') { 
            temp[e.target.name] = e.target.value.split(',').map(c => c.trim())
        } else if (e.target.name === 'picture') {
            temp[e.target.name] = e.target.value.replaceAll('//', '/');
        } else {
            temp[e.target.name] = e.target.value;
        }
        showContext.setShow(temp);
        setEdited(true);
    }

    function saveShow(e) {
        e.preventDefault();
        setEdited(false);
        //TODO send changes to server
    }

    return (
        <div>
            <div className={!currentUser?.isAdmin ? "user-view show-info" : "show-info"}>
                {/** TODO this image input can be used for admins to set new images */}
                <img src={show?.picture} alt="show picture" className="show-picture"></img>
                { 
                    currentUser?.isAdmin ? 
                    <input type="file" onChange={editShow} name="picture"></input> : null
                }
                <div className="show-text">
                    <form>
                        <div>
                            <label>Title: </label>
                            <input type="text" 
                                placeholder="title" 
                                name="title" 
                                disabled={!currentUser?.isAdmin}
                                onChange={editShow}
                                value={show?.title}></input>
                        </div>
                        <div>
                            <label>Genre: </label>
                            <input type="text" 
                                placeholder="genre" 
                                name="genre" 
                                disabled={!currentUser?.isAdmin}
                                onChange={editShow}
                                value={getGenre(show?.genre)}></input>
                        </div>
                        <div>
                            <label>Start Date: </label>
                            <input type="date" 
                                placeholder="start date" 
                                name="startDate" 
                                disabled={!currentUser?.isAdmin}
                                onChange={editShow}
                                value={show.startDate}></input>
                       
                        
                            {show.endDate || currentUser?.isAdmin ? 
                                <div>
                                    <label>End Date: </label>
                                    <input type="date" 
                                        placeholder="end date" 
                                        name="endDate" 
                                        disabled={!currentUser?.isAdmin}
                                        onChange={editShow}
                                        value={show.endDate}></input>
                                </div> :
                                <label>Ongoing</label>
                            }
                        </div>
                        <div>
                            <label>Season start: </label>
                            <input type="text" 
                                placeholder="season" 
                                name="season" 
                                disabled={!currentUser?.isAdmin}
                                onChange={editShow}
                                value={show.season}></input>
                        </div>
                        <div>
                            <label>Description: </label>
                            <br></br>
                            <textarea type="text"
                                placeholder="description"
                                name="description"
                                disabled={!currentUser?.isAdmin}
                                onChange={editShow}
                                value={show.description}></textarea>
                        </div>
                        { currentUser?.isAdmin && edited ?     
                            <div className="edit-buttons">
                                <button onClick={saveShow} className="admin-button save-button">SAVE</button>
                            </div> :
                            null     
                        }                         
                    </form>
                </div>
                <ShowRating show={show}></ShowRating>
            </div>
        </div>
    );
}

export default ShowInfo;