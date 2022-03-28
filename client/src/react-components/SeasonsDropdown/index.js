import "./styles.css";
import { useShowRatingsListContext } from "../../contexts/ShowRatingList";
import { useCommentListContext } from "../../contexts/CommentList";
import ShowsBar from "../ShowsBar";
import { useShowListContext } from "../../contexts/ShowList";
import {useSeasonListContext} from "../../contexts/Season";
import { uid } from "react-uid";

//Need this to re-render page.
import { ShowSeasonBars } from "../ShowSeasonBars";
import { useState, useEffect } from "react";


//Idea of this component is to bring the season dropdown menu
function SeasonsDropdown() {

    const [pick, setPick] = useState("All");
    const [season, setSeason] = useState(false);

    useEffect(() => {
        if (season == false) {
            setSeason(true)
        }
     });

    const handleOnChange = (e) => {
        setPick(e.target.value)
    }

    const renderChange = () => {
        return pick;
    }

    const seasonContext = useSeasonListContext();
    const seasons = seasonContext.getSeasons();

    return (
        <div id="filter">
            <h1>{renderChange()}</h1>
            <h2>Seasons: </h2>
            <form>
                <select name="seasons" onChange={handleOnChange} value={pick}>
                    <option value="All">All</option>
                    {
                        seasons.map(season => {
                            return (
                                <option value={season.season}>{season.season}</option>       
                            )
                        })
                    }
                </select>
            </form>
        
        </div>
    )
}

export default SeasonsDropdown;