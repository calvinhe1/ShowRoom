import "./styles.css"

import { uid } from "react-uid";
import ShowCard from "../ShowCard";
import { useShowListContext } from "../../contexts/ShowList";

function ShowsBar(props) {

    const showListContext = useShowListContext();
    const shows = showListContext.getShows();

    return (
        <div>
            {
                shows.map(show => {
                    return show.showId !== props.currentShowId ? <ShowCard changePage={props.changePage} show={show} key={uid(show)}/> : null;
                })
            }

        </div>
    );
}

export default ShowsBar;