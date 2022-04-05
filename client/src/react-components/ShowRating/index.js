import "./styles.css";

import {useState, useEffect} from "react";

import { useUserProfileContext } from "../../contexts/UserProfile";
import { getAvgShowRating, rateShow } from "../../actions/show";

function ShowRating(props) {
    const [avgShowRating, setAvgShowRating] = useState(0);
    const [ratings, setRatings] = useState({});
    useEffect(() => {
        setRatings(props?.show?.ratings || {});
        if (props.show._id) {
            getAvgShowRating(props.show._id)
                .then((res) => {
                    setAvgShowRating(res.data.averageStars);
                })
        }
    }, [props.show])

    function styleRatings() {
        const percent1 =  ratings.numOneStars ? (ratings.numOneStars / ratings.numTotalRatings) * 100 : 0;
        let bar = document.getElementsByClassName('bar' + String(1))[0];  
        bar.style.width = String(percent1) + '%';
        
        const percent2 = ratings.numTwoStars ? (ratings.numTwoStars / ratings.numTotalRatings) * 100 : 0;
        bar = document.getElementsByClassName('bar' + String(2))[0];  
        bar.style.width = String(percent2) + '%';

        const percent3 = ratings.numThreeStars ? (ratings.numThreeStars / ratings.numTotalRatings) * 100 : 0;
        bar = document.getElementsByClassName('bar' + String(3))[0];  
        bar.style.width = String(percent3) + '%';

        const percent4 = ratings.numFourStars ? (ratings.numFourStars / ratings.numTotalRatings) * 100 : 0;
        bar = document.getElementsByClassName('bar' + String(4))[0];  
        bar.style.width = String(percent4) + '%';

        const percent5 = ratings.numFiveStars ? (ratings.numFiveStars / ratings.numTotalRatings) * 100 : 0;
        bar = document.getElementsByClassName('bar' + String(5))[0];  
        bar.style.width = String(percent5) + '%';
    }
    
    useEffect(() => {
        styleRatings();
    }, [ratings]);


    const userProfile = useUserProfileContext();

    const arr = [...Array(5).keys()];

    const [hoverIndex, setHoverIndex] = useState(undefined);

    function hoverOver(e) {
        setHoverIndex(e.target.id);
    }

    function hoverOut() {
        setHoverIndex(undefined);
    }

    function submit(e) {
        e.preventDefault();
        if (userProfile.profile._id) {
            const rating = parseFloat(e.target.id);
            rateShow(props.show._id, rating).then(() => {
                props.show.ratings.numTotalRatings++;
                switch (rating) {
                    case 1:
                        props.show.ratings.numOneStars++;
                        break;
                    case 2:
                        props.show.ratings.numTwoStars++;
                        break;
                    case 3:
                        props.show.ratings.numThreeStars++;
                        break;
                    case 4: 
                        props.show.ratings.numFourStars++;
                        break;
                    case 5: 
                        props.show.ratings.numFiveStars++;
                        break;
                }
                props.setShow(Object.assign({}, props.show))
                setRatings(Object.assign({}, props.show.ratings))
                styleRatings();
            })
        } else {
            alert("Must be logged in to vote");
        }
    }

    function getNumVotes(i) {
        switch (i) {
            case 1:
                return ratings?.numOneStars || 0
            case 2:
                return ratings?.numTwoStars || 0
            case 3:
                return ratings?.numThreeStars || 0
            case 4:
                return ratings?.numFourStars || 0
            case 5:
                return ratings?.numFiveStars || 0
            default:
                return 0
        }
    }

    return (
        <div className="rating-container">
            <span className="padding-right">User Rating:</span>
            {
                arr.map((i) => {
                    i++;
                    return i <= Math.floor(avgShowRating + 0.5) ? 
                    <span className={i <= hoverIndex ? "fa fa-star hover-on" : hoverIndex ? "fa fa-star" : "fa fa-star checked"} id={i} onMouseOver={hoverOver} onMouseOut={hoverOut} key={i} onClick={submit}></span> :
                    <span className={i <= hoverIndex ? "fa fa-star hover-on" : "fa fa-star"} id={i} onMouseOver={hoverOver} onMouseOut={hoverOut} key={i} onClick={submit}></span>
                })
            }
            <div>
                {avgShowRating?.toFixed(1) || 0} average based on {ratings?.numTotalRatings || 0} review(s).
            </div>
                <div>
                    5 
                    <span className="bar-outer"> 
                        <div className="bar-inner bar5"></div> 
                    </span> 
                    ({getNumVotes(5)})
                </div>
                <div>
                    4 
                    <div className="bar-outer">
                        <div className="bar-inner bar4"></div>
                    </div>
                    ({getNumVotes(4)})
                </div>
                <div>
                    3 
                    <div className="bar-outer">
                        <div className="bar-inner bar3"></div>
                    </div> 
                    ({getNumVotes(3)})
                </div>
                <div>
                    2 
                    <div className="bar-outer">
                        <div className="bar-inner bar2"></div>
                    </div> 
                    ({getNumVotes(2)})
                </div>
                <div>
                    1 
                    <div className="bar-outer">
                        <div className="bar-inner bar1"></div> 
                    </div> 
                    ({getNumVotes(1)})
                </div>
        </div>
    )
}

export default ShowRating;