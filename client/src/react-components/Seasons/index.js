import "./styles.css";
import { useShowRatingsListContext } from "../../contexts/ShowRatingList";
import { useCommentListContext } from "../../contexts/CommentList";
import ShowsBar from "../ShowsBar";
import { useShowListContext } from "../../contexts/ShowList";
import {useSeasonListContext} from "../../contexts/Season";
import { uid } from "react-uid";

//Idea of this component is to bring the season dropdown menu
function Seasons() {

    const seasonContext = useSeasonListContext();
    const seasons = seasonContext.getSeasons();
 
    return (
        <div id="filter">
            <h2>Seasons: </h2>
            <form>
                <select name="seasons">
                    <option value="" selected disabled hidden>Pick season</option>
                    {
                        seasons.map(season => {
                            return (
                                <option>{season.season}</option>       
                            )
                        })
                    }
                </select>
            </form>
        </div>
    )
}

export default Seasons;