import "./styles.css"

import {Link} from "react-router-dom";

function ShowCard(props) {
    return (
        <div className="show-card">
            {/** TODO How do I propogate this URL change better? */}
            <Link to={'/show_page/' + props.show.showId} onClick={() => props.changePage(props.show.showId)}>
                <img src={props.show.picture} alt="show photo" className="show-photo"></img>
            </Link>            
        </div>
    );
}

export default ShowCard;