import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { ratingEpisodeList } from "../../local-data";

export const episodeRatingsListDefaultValues = {
    episodeRatings: {},
    setEpisodeRatings: () => {},
    setEpisodeRating: () => {},
    addNewEpisodeRating: () => {},
    getEpisodeRatingById: () => {},
    getUsersTop5EpisodesById: () => {},
    addEpisodeRating: () => {},
    getHighestRatedIds: () => {}
}

export const episodeRatingsListContext = createContext(episodeRatingsListDefaultValues);

export function useEpisodeRatingsListContext(){
    // import this to files
    return useContext(episodeRatingsListContext);
}

export function useProvideEpisodeRatingsListContext(){
    const [episodeRatings, setEpisodeRatings] = useState(ratingEpisodeList);

    function setEpisodeRating(episodeId, episode) {
        episodeRatings[episodeId-1] = episode;
        setEpisodeRatings(episodeRatings);
    }

    function addNewEpisodeRating(showId, episodeId) {
        const newRating = {
            episodeId: episodeId,
            rating: 0.0,
            ratingCount: 0,
            ratings: {}
        }
        episodeRatings[showId].episodes.push(newRating)
        setEpisodeRatings(episodeRatings);
    }

    function getEpisodeRatingById(showId, episodeId) {
       
        return episodeRatings[showId].episodes[episodeId-1];
    }
    
    function getUsersTop5EpisodesById(id){
        const episodes = Object.keys(episodeRatings);
        const userEpisodeIds = episodes.filter(episode => episodeRatings[episode].ratings[id]);
        userEpisodeIds.sort((a, b) => {return episodeRatings[b].ratings[id] - episodeRatings[a].ratings[id]});
        if (userEpisodeIds.length > 5) userEpisodeIds.splice(0, 5);
        return userEpisodeIds;
    }

    function addEpisodeRating(showId, episodeId, userId, rating) {
        const episode = episodeRatings[showId].episodes[episodeId-1];
        if (!episode.ratings[userId]) {
            episode.ratingCount++;
        }
        episode.ratings[userId] = rating;
        let total = 0;
        Object.keys(episode.ratings).forEach(key => {
            total += episode.ratings[key];
        });
        episode.rating = total / episode.ratingCount;
        setEpisodeRatings(episodeRatings);
    }

    function getHighestRatedIds(showId) {



        if (episodeRatings[showId] == undefined) 
            return
            
        
        const episodes = episodeRatings[showId].episodes //access the show (An array of object episodes)

   

        episodes.sort((a,b) => { 
            if (a.rating < b.rating)  {
                return -1;
            }
            if (a.rating > b.rating) {
                return 1;
            }
            return 0;
        })

        //Extract 0-2 elements (if it exists)
        return episodes.reverse();
    }


    return{
        episodeRatings,
        setEpisodeRatings,
        setEpisodeRating,
        addNewEpisodeRating,
        getEpisodeRatingById,
        getUsersTop5EpisodesById,
        addEpisodeRating,
        getHighestRatedIds
    }
}

export function ProvideEpisodeRatingsListContext({children}){
    const episodeRatings = useProvideEpisodeRatingsListContext()
    return (
        <episodeRatingsListContext.Provider value={episodeRatings}>
            {children}
        </episodeRatingsListContext.Provider>
    )
}
