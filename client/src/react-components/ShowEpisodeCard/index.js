import "./styles.css"


function ShowEpisodeCard(props) {

    return (
        //TODO clicking here set's it to an episode?
        <span className="show-card">    
        {<img src={props.episode.image_url} alt="show photo" className="show-photo" value={props.episode._id}></img>}
        <h4 className="epNumber">{"Episode " + props.episode.episodeNum}</h4>
        </span>
    );
}

export default ShowEpisodeCard;