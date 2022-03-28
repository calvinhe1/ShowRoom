import "./styles.css";
import { useShowRatingsListContext } from "../../contexts/ShowRatingList";
import { useCommentListContext } from "../../contexts/CommentList";
import ShowsBar from "../ShowsBar";
import { useShowListContext } from "../../contexts/ShowList";
import {useSeasonListContext } from "../../contexts/Season";
import { uid } from "react-uid";


//Rather than displaying the home elements, display by season.

function ShowSeasonsBars() {

    const showContext = useShowListContext();
    const defaultGenres = ['Action', 'Drama', 'Fantasy'];

    const ratingContext = useShowRatingsListContext();
    const highestRatedIds = ratingContext.getHighestRatedIds();
    const highestRatedShows = highestRatedIds.map(id => showContext.getShowById(id));

    const commentContext = useCommentListContext();
    const mostTalkedAboutIds = commentContext.getMostCommentedIds();
    const mostTalkedAboutShows = mostTalkedAboutIds.map(id => showContext.getShowById(id));

    //display seasons.
    const seasonContext = useSeasonListContext();
    const seasons = seasonContext.getSeasons();

    return (
        <div className="showbars-container">
            {
               seasons.map(season => {
                    return (
                        <div className = "showbar" key={uid(season)} >
                            <h2>{season.season}</h2>
                            <ShowsBar shows={showContext.getShowsBySeason(season.season)}></ShowsBar>
                        </div>
                    )

               })

            }
      </div>
    )
}

export default ShowSeasonsBars;