import ShowPage from "../ShowPage";
import {useParams} from "react-router-dom";
import {useState} from "react";
import ShowSeasonBars from "../../react-components/ShowSeasonBars";
import "./styles.css";
import {Link, useNavigate} from 'react-router-dom';
import SeasonsDropdown from "../../react-components/SeasonsDropdown";


//Display all showbars filtered by season.
function Seasons(props) {

    /*
    let { id } = useParams();

    id === undefined ? id = 0 : id = parseInt(id);

    const [showId, setShowId] = useState(id);

    function changePage(id) {
        id === undefined ? id = 0 : id = parseInt(id);
        setShowId(id);
    }
    */


    
    return (
        <div className="home">  
            <SeasonsDropdown></SeasonsDropdown>
            <ShowSeasonBars></ShowSeasonBars>
        </div>
    )
}

export default Seasons;