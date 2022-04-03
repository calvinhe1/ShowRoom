import ShowPage from "../ShowPage";
import {useParams} from "react-router-dom";

import ShowSeasonBars from "../../react-components/ShowSeasonBars";
import "./styles.css";
import {Link, useNavigate} from 'react-router-dom';
import SeasonsDropdown from "../../react-components/SeasonsDropdown";

import {useSeasonListContext} from "../../contexts/Season";
import { useState, useEffect } from "react";

import ShowSeason from "../../react-components/ShowSeason";
import { uid } from "react-uid";


//Display all showbars filtered by season.
function Seasons(props) {

    const [pick, setPick] = useState("All");
    const [season, setSeason] = useState(false);

    useEffect(() => {        
       
        if (pick == "All") {
            setSeason(false)
        }
        else {
            setSeason(true)
        }
        
     }, [pick]);


    const handleOnChange = (e) => {
        setPick(e.target.value)
    }

    const seasonContext = useSeasonListContext();
    const seasons = seasonContext.getSeasons();

    return (
        <div className="home">  
                <div id="filter">
                <h2 className="seasonsLabel">Seasons </h2>
                <form className = "seasons">
                    <select className="dropdown" onChange={handleOnChange} value={pick}>
                        <option className = "options" value="All">All</option>
                        {
                            seasons.map(season => {
                                return (
                                    <option key={uid(season.season)} className = "options" value={season.season}>{season.season}</option>       
                                )
                            })
                        }
                    </select>
                </form>
            </div>
            {season ?<ShowSeason season={pick}></ShowSeason> : <ShowSeasonBars></ShowSeasonBars>}
        </div>
    )
}

export default Seasons;