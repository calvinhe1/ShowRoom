import "./styles.css";

import {useState, useEffect} from "react";

import { showRatingsListContext, useShowRatingsListContext } from "../../contexts/ShowRatingList";
import { useUserProfileContext } from "../../contexts/UserProfile";

function ShowRating(props) {

    const currentShowRatingContext = useShowRatingsListContext();
    const currentShowRating = currentShowRatingContext.getShowRatingById(props.show.showId);
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
        if (userProfile.isLoggedIn) {
            const rating = parseFloat(e.target.id);
            currentShowRatingContext.addShowRating(props.show.showId, userProfile.profile.userId, rating);
        } else {
            alert("Must be logged in to vote");
        }
    }

    function getNumVotes(i) {
        let count = 0;
        Object.keys(currentShowRating.ratings).forEach(r => {if (currentShowRating.ratings[r] == i) count++;})
        return count;
    }

    useEffect(() => {
        for (let i = 1; i <= 5; i++) {
            const percent = (getNumVotes(i) / currentShowRating.ratingCount) * 100;
            const bar = document.getElementsByClassName('bar' + String(i))[0];
            bar.style.width = String(percent) + '%';
        }
    });

    return (
        <div className="rating-container">
            <span className="padding-right">User Rating:</span>
            {
                arr.map((i) => {
                    i++;
                    return i <= Math.floor(currentShowRating.rating + 0.5) ? 
                    <span className={i <= hoverIndex ? "fa fa-star hover-on" : hoverIndex ? "fa fa-star" : "fa fa-star checked"} id={i} onMouseOver={hoverOver} onMouseOut={hoverOut} key={i} onClick={submit}></span> :
                    <span className={i <= hoverIndex ? "fa fa-star hover-on" : "fa fa-star"} id={i} onMouseOver={hoverOver} onMouseOut={hoverOut} key={i} onClick={submit}></span>
                })
            }
            <div>
                {currentShowRating.rating.toFixed(1)} average based on {currentShowRating.ratingCount} review(s).
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