import "./styles.css";

function RatingStars(props) {
    const arr = [...Array(5).keys()];
    let totalStars = props.ratingInfo.numFiveStars*5 + props.ratingInfo.numFourStars*4 + props.ratingInfo.numThreeStars*3 + props.ratingInfo.numTwoStars*2 + props.ratingInfo.numOneStars
    let averageStars = totalStars / (props.ratingInfo.numTotalRatings || 1)
    averageStars = Math.round(averageStars * 100) / 100

    return (
        <div className="center-stars">
            {
                arr.map((i) => {
                    i++;
                    return i <= Math.floor(averageStars + 0.5) ? 
                    <span className="fa fa-star checked" key={i} ></span> :
                    <span className="fa fa-star" key={i} ></span>
                })
            }
            <span className="rating-count">({props.ratingInfo.numTotalRatings})</span>
        </div>
    )
}

export default RatingStars;