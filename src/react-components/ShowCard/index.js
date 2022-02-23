import "./styles.css"

import {Link} from "react-router-dom";

function ShowCard(props) {
    return (
        <div className="show-card">
            {/** TODO this should pass the showId to the URL */}
            <Link to={'/show_page/' + props.show.showId}>
                <img src={props.show.picture} alt="show photo" className="show-photo"></img>
            </Link>            
        </div>
    );
}

export default ShowCard;