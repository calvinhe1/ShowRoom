import "./styles.css"

import {useState} from "react";
import { uid } from "react-uid";
import ShowCard from "../ShowCard";

function ShowsBar(props) {

    return (
        <div>
            {
                props.shows.map(show => {
                    return show.showId !== props.currentShowId ? <ShowCard changePage={props.changePage} show={show} key={uid(show)}/> : null;
                })
            }

        </div>
    );
}

export default ShowsBar;