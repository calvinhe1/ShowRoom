import "./styles.css";

function RatingStars(props) {
    const arr = [...Array(5).keys()];

    return (
        <div className="center-stars">
            {
                arr.map((i) => {
                    i++;
                    return i <= Math.floor(props.ratingInfo.rating + 0.5) ? 
                    <span className="fa fa-star checked" key={i} ></span> :
                    <span className="fa fa-star" key={i} ></span>
                })
            }
            <span className="rating-count">({props.ratingInfo.ratingCount})</span>
        </div>
    )
}

export default RatingStars;