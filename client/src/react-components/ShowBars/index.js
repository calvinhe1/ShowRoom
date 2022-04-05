import "./styles.css";
import ShowsBar from "../ShowsBar";
import { useShowListContext } from "../../contexts/ShowList";
import { useEffect, useState } from "react";
import { getHighestRatedShows, getMostTalkedABoutShows } from "../../actions/show";


function ShowBars() {
    const defaultGenres = ['Action', 'Drama', 'Fantasy'];
    const [actionShows, setActionShows] = useState([]);
    const [dramaShows, setDramaShows] = useState([]);
    const [fantasyShows, setFantasyShows] = useState({});

    const [highestRated, setHighestRated] = useState([]);
    useEffect(() => {
        getHighestRatedShows().then(res => {
            setHighestRated(res.data)
        })
    }, [])

    const [mostTalkedAbout, setMostTalkedAbout] = useState([]);
    useEffect(() => {
        getMostTalkedABoutShows().then(res => {
            const newShows = []
            res.forEach(r => {
                r.show.commentCount = r.count
                newShows.push(r.show);
            })
            setMostTalkedAbout(newShows)
        })
    }, [])

    return (
        <div className="showbars-container">
            <div className="showbar">
                <h2>Highest Rated</h2>
                <ShowsBar shows={highestRated} showRating={true}></ShowsBar>
            </div>
            
            <div className="showbar">
                <h2>Most Talked About</h2>
                <ShowsBar shows={mostTalkedAbout} showCommentCount={true}></ShowsBar>   
            </div>
            
            {
            defaultGenres.map(genre => {
                return (
                <div key={genre} className="showbar">
                    <h2>{genre}</h2>
                    <ShowsBar shows={showContext.getShowsByGenre(genre)}></ShowsBar>
                </div>
                )
            })
            }
      </div>
    )
}

export default ShowBars;