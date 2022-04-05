import "./styles.css"

import {Link} from "react-router-dom";

function ShowCard(props) {
    function navigate(e) {
        if (props.changePage) {
            props.changePage(props.show.showId);
            window.scrollTo(0,0)
        } 
    }

    return (
        <span className="show-card">
            {/** TODO How do I propogate this URL change better? */}
            <Link to={'/show_page/' + props.show._id} onClick={navigate}>
                <img src={props.show.image_url} alt="show photo" className="show-photo"></img>
            </Link>            
        </span>
    );
}

export default ShowCard;