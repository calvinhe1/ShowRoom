import "./styles.css";


function UserShow(props) {

    return (
        <div className="top-show-container">
            <h2 className="top-show-title">{props.show.title}</h2>
            <img className="top-show-picture" src={props.show.picture}></img>
        </div>
    );
}

export default UserShow;