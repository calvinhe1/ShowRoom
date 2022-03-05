import React from "react";
import { useState, useEffect, createContext, useContext } from "react";

export const showRatingsListDefaultValues = {
    showRatings: {},
    setShowRatings: () => {},
    setShowRating: () => {},
    addNewShowRating: () => {}
}

export const showRatingsListContext = createContext(showRatingsListDefaultValues);

export function useShowRatingsListContext(){
    // import this to files
    return useContext(showRatingsListContext);
}

export function useProvideShowRatingsListContext(){
    const [showRatings, setShowRatings] = useState({});

    useEffect(() => {
        // initial call to set list of users with default
        const defaultList = {
            //Key is the showId aka the primary key in the show relation - CSC343 :)
            0: {
              rating: 5.0,
              ratingCount: 1,
              ratings: {0: 5.0}, //UserId: rating 
            },
            1: {
                rating: 5.0,
                ratingCount: 1,
                ratings: {0: 5.0}, //UserId: rating 
              },
            2: {
                rating: 5.0,
                ratingCount: 1,
                ratings: {0: 5.0}, //UserId: rating 
              }
        }

        setShowRatings(defaultList);
    }, [])

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


    return{
        showRatings,
        setShowRatings,
        setShowRating,
        addNewShowRating
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
