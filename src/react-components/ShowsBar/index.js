import "./styles.css"

import {useState} from "react";
import { uid } from "react-uid";
import ShowCard from "../ShowCard";

function ShowsBar(props) {

    const [shows, setShows] = useState(props.shows);

    return (
        <div>
            {
                shows.map(show => {
                    return show.showId !== props.currentShow ? <ShowCard show={show} key={uid(show)}/> : null;
                })
            }

        </div>
    );
}

export default ShowsBar;