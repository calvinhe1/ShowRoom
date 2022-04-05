import ShowPage from "../ShowPage";

import {useParams} from "react-router-dom";

import {useState} from "react";

/** 
 *  This file is used to propogate changes in the show_page parameter, react needs a parent to pass
 *  in a changed state to trigger a re-render.
 */

function ShowPageWrapper(props) {

    let { id } = useParams();

    const [showId, setShowId] = useState(id);

    function changePage(id) {
        setShowId(id);
    }

    return (
        <ShowPage changePage={changePage} showId={showId} />
    )
}

export default ShowPageWrapper;