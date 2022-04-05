import "./styles.css";

import {useEffect, useState} from "react";

import { useUserProfileContext } from './../../contexts/UserProfile';
import ShowRating from "./../ShowRating";
import { modifyShow } from "../../actions/show";

function ShowInfo(props) {

    const currentUser =  useUserProfileContext().profile;
    const [show, setShow] = useState(props.currentShow);
    const [genre, setGenre] = useState('');

    useEffect(() => {
        setShow(props.currentShow)
        setGenre(getGenre(props.currentShow.genres));
    }, [props.currentShow]);

    const [edited, setEdited] = useState(false);


    //Should store genres as an array 
    function getGenre(genres) {
        let res = '';
        if(genres) {
            genres.forEach(g => {
            res = res + g + ' ';
        })
        }
        return res;
    }

    function getSeason(seasons) {
        if (!seasons || seasons.length === 0) return '';

        let res = seasons[0]
        if (seasons.length > 1) {
            for (let i = 1; i < seasons.length; i++) {
                res = res + ', ' + seasons[i];
            }
        }
        return res;
    }


    function editShow(e) {
        
        let temp = Object.assign({}, show)
        setEdited(true);
        if (e.target.name === 'genre') {
            setGenre(e.target.value);
            return;
        } else if (e.target.name === 'picture' || e.target.name === 'season') {
            temp[e.target.name] = e.target.value.replaceAll('//', '/');
        } else {
            temp[e.target.name] = e.target.value;
        }
        setShow(temp);
    }

    function saveShow(e) {
        e.preventDefault();
        setEdited(false);
        const genreArr = genre.split(',').map(c => c.trim());
        const showInfo = {
            _id: show._id,
            title: show.title,
            description: show.description,
            genres: genreArr,
            tags: show.tags,
            image_url: show.image_url
        }
        modifyShow(showInfo)
    }

    return (
        <div>
            <div className={!currentUser?.isAdmin ? "user-view show-info" : "show-info"}>
                {/** TODO this image input can be used for admins to set new images */}
                <img src={show?.image_url} alt="show picture" className="show-picture"></img>
                { 
                    currentUser?.isAdmin ? 
                    //TODO cloudinary
                    <input type="file" className="add-show-picture-button" onChange={editShow} name="picture"></input> : null
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
                                value={show?.title} className="info"></input>
                        </div>
                        <div>
                            <label>Genre: </label>
                            <input type="text" 
                                placeholder="genre" 
                                name="genre" 
                                disabled={!currentUser?.isAdmin}
                                onChange={editShow}
                                value={genre} className="info"></input>
                        </div>
                        <div>
                            <label>Season(s): </label>
                            <input type="text" 
                                placeholder="season" 
                                name="season" 
                                disabled={!currentUser?.isAdmin}
                                onChange={editShow}
                                value={getSeason(show?.season)} className="info"></input>
                        </div>
                        <div>
                            <label>Description: </label>
                            <br></br>
                            <textarea type="text"
                                placeholder="description"
                                name="description"
                                disabled={!currentUser?.isAdmin}
                                onChange={editShow}
                                value={show.description} className="info"></textarea>
                        </div>
                        { currentUser?.isAdmin && edited ?     
                            <div className="edit-buttons">
                                <button onClick={saveShow} className="admin-button save-button">SAVE</button>
                            </div> :
                            null     
                        }                         
                    </form>
                </div>
                <ShowRating show={show} setShow={setShow}></ShowRating>
            </div>
        </div>
    );
}

export default ShowInfo;