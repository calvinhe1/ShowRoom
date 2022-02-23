import "./styles.css";

import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import ShowsBar from "../ShowsBar";

function ShowInfo(props) {

    let { id } = useParams();

    id === undefined ? id = 0 : id = parseInt(id);

    let tempShow = props.showList.find(show => show.showId === id);

    const [show, setShow] = useState(tempShow);

    useEffect(() => {
        console.log(props);
    }, [props]);

    const [edited, setEdited] = useState(false);

     //Should store genres as an array 
     function getGenre(genres) {
        if (!genres) return;

        let res = genres[0]
        if (genres.length > 1) {
            for (let i = 1; i < genres.length; i++) {
                res = res + ', ' + genres[i];
            }
        }
        return res;
    }

    const changeShow = e => {
        let temp = Object.assign({}, show)
        e.target.name === 'genre' ? 
            temp[e.target.name] = e.target.value.split(',').map(c => c.trim()) :
            temp[e.target.name] = e.target.value;
        setShow(temp);
        setEdited(true);
    }

    function saveChanges(e) {
        e.preventDefault();
        //TODO this would send new info to the server
    }

    function discardChanges(e) {
        e.preventDefault();
        //TODO this would discard changes and load in what's from the server
        let temp = Object.assign({}, props.show);
        setShow(temp);
    }

    return (
        <div>
            <div className={props.user.isAdmin ? "admin-view show-info" : "show-info"}>
                <img src={show.picture} alt="show picture" className="show-picture"></img>
                <div className="show-text">
                    <form>
                        <div>
                            <label>Title: </label>
                            <input type="text" 
                                placeholder="title" 
                                name="title" 
                                disabled={!props.user.isAdmin}
                                onChange={changeShow}
                                value={show.title}></input>
                        </div>
                        <div>
                            <label>Genre: </label>
                            <input type="text" 
                                placeholder="genre" 
                                name="genre" 
                                disabled={!props.user.isAdmin}
                                onChange={changeShow}
                                value={getGenre(show.genre)}></input>
                        </div>
                        <div>
                            <label>Start Date: </label>
                            <input type="date" 
                                placeholder="start date" 
                                name="startDate" 
                                disabled={!props.user.isAdmin}
                                onChange={changeShow}
                                value={show.startDate}></input>
                       
                        
                            {show.endDate || props.user.isAdmin? 
                                <span>
                                    <label>End Date: </label>
                                    <input type="date" 
                                        placeholder="end date" 
                                        name="endDate" 
                                        disabled={!props.user.isAdmin}
                                        onChange={changeShow}
                                        value={show.endDate}></input>
                                </span> :
                                <label>Ongoing</label>
                            }
                        </div>
                        <div>
                            <label>Description: </label>
                            <input type="text"
                                placeholder="description"
                                name="description"
                                disabled={!props.user.isAdmin}
                                onChange={changeShow}
                                value={show.description}></input>
                        </div>
                        { props.user.isAdmin && edited ?     
                            <div className="edit-buttons">
                                <button onClick={saveChanges}>SAVE</button>
                                <button onClick={discardChanges}>DISCARD</button>
                            </div> :
                            null     
                        }                         
                    </form>
                    <ShowsBar shows={props.showList} currentShow={id}/>
                </div>
            </div>
        </div>
    );
}

export default ShowInfo;