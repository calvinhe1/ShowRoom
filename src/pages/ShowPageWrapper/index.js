import ShowPage from "../ShowPage";

import {useParams} from "react-router-dom";

import {useState} from "react";

/** 
 *  This file is used to propogate changes in the show_page parameter, react needs a parent to pass
 *  in a changed state to trigger a re-render.
 */

function ShowPageWrapper(props) {

    let { id } = useParams();

    id === undefined ? id = 0 : id = parseInt(id);

    const [showId, setShowId] = useState(id);

    function changePage(id) {
        id === undefined ? id = 0 : id = parseInt(id);
        setShowId(id);
    }

    return (
        <ShowPage changePage={changePage} shows={props.shows} showId={showId} comments={props.comments} changeShow={props.changeShow} addComment={props.addComment} deleteComment={props.deleteComment} users={props.users}/>
    )
}

export default ShowPageWrapper;