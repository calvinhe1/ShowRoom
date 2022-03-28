import "./styles.css";
import { useShowRatingsListContext } from "../../contexts/ShowRatingList";
import { useCommentListContext } from "../../contexts/CommentList";
import ShowsBar from "../ShowsBar";
import { useShowListContext } from "../../contexts/ShowList";


function ShowBars() {

    const showContext = useShowListContext();
    const defaultGenres = ['Action', 'Drama', 'Fantasy'];

    const ratingContext = useShowRatingsListContext();
    const highestRatedIds = ratingContext.getHighestRatedIds();
    const highestRatedShows = highestRatedIds.map(id => showContext.getShowById(id));

    const commentContext = useCommentListContext();
    const mostTalkedAboutIds = commentContext.getMostCommentedIds();
    const mostTalkedAboutShows = mostTalkedAboutIds.map(id => showContext.getShowById(id));

    return (
        <div className="showbars-container">
            <div className="showbar">
                <h2>Highest Rated</h2>
                <ShowsBar shows={highestRatedShows} showRating={true}></ShowsBar>
            </div>

            <div className="showbar">
             <h2>Most Talked About</h2>
                <ShowsBar shows={mostTalkedAboutShows} showCommentCount={true}></ShowsBar>   
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