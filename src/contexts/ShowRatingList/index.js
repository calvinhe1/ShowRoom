import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { ratingList } from "../../local-data";

export const showRatingsListDefaultValues = {
    showRatings: {},
    setShowRatings: () => {},
    setShowRating: () => {},
    addNewShowRating: () => {},
    getShowRatingById: () => {},
    addShowRating: () => {},
    getHighestRatedIds: () => {}
}

export const showRatingsListContext = createContext(showRatingsListDefaultValues);

export function useShowRatingsListContext(){
    // import this to files
    return useContext(showRatingsListContext);
}

export function useProvideShowRatingsListContext(){
    const [showRatings, setShowRatings] = useState(ratingList);

    function setShowRating(showId, show) {
        showRatings[showId] = show;
        setShowRatings(showRatings);
    }

    function addNewShowRating(showId) {
        const newRating = {
            rating: 0.0,
            ratingCount: 0,
            ratings: {}
        }
        showRatings[showId] = newRating;
        setShowRatings(showRatings);
    }

    function getShowRatingById(id) {
        return showRatings[id];
    }

    function addShowRating(showId, userId, rating) {
        const show = showRatings[showId];
        if (!show.ratings[userId]) {
            show.ratingCount++;
        }
        show.ratings[userId] = rating;
        let total = 0;
        Object.keys(show.ratings).forEach(key => {
            total += show.ratings[key];
        });
        show.rating = total / show.ratingCount;
        setShowRatings(showRatings);
    }

    function getHighestRatedIds() {
        const shows = Object.keys(showRatings);
        shows.sort((a, b) => {
            if (showRatings[a].rating > showRatings[b].rating) {
                return -1;
            } else if (showRatings[a].rating > showRatings[b].rating) {
                return 1;
            } else {
                return 0;
            }
        });
        return shows;
    }


    return{
        showRatings,
        setShowRatings,
        setShowRating,
        addNewShowRating,
        getShowRatingById,
        addShowRating,
        getHighestRatedIds
    }
}

export function ProvideShowRatingsListContext({children}){
    const showRatings = useProvideShowRatingsListContext()
    return (
        <showRatingsListContext.Provider value={showRatings}>
            {children}
        </showRatingsListContext.Provider>
    )
}
