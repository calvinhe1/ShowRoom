import "./styles.css"


function ShowEpisodeCard(props) {

    return (
        
        
        <span className="show-card">
            {/** TODO How do I propogate this URL change better? */}
    
        {<img src={props.episode.picture} alt="show photo" className="show-photo" value = {props.episode.episode}></img>}
        <h4 className="epNumber">{"Episode " + props.episode.episode}</h4>
        </span>
    );
}

export default ShowEpisodeCard;