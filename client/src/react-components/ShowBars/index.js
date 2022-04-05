import "./styles.css";
import ShowsBar from "../ShowsBar";
import { useEffect, useState } from "react";
import { getHighestRatedShows, getMostTalkedABoutShows, getShowsByGenre } from "../../actions/show";


function ShowBars() {
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

    const [actionShows, setActionShows] = useState([]);
    useEffect(() => {
        getShowsByGenre('Action').then(res => {
            setActionShows(res)
        })
    }, [])
    const [dramaShows, setDramaShows] = useState([]);
    useEffect(() => {
        getShowsByGenre('Drama').then(res => {
            setDramaShows(res);
        })
    }, [])
    const [fantasyShows, setFantasyShows] = useState([]);
    useEffect(() => {
        getShowsByGenre('Fantasy').then(res => {
            setFantasyShows(res);
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
            
            <div className="showbar">
                <h2>Action</h2>
                <ShowsBar shows={actionShows}></ShowsBar>
            </div>

            <div className="showbar">
                <h2>Drama</h2>
                <ShowsBar shows={dramaShows}></ShowsBar>
            </div>

            <div className="showbar">
                <h2>Fantasy</h2>
                <ShowsBar shows={fantasyShows}></ShowsBar>
            </div>
            
            
            
      </div>
    )
}

export default ShowBars;