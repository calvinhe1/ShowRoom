import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { ratingList } from "../../local-data";

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
    const [episodeRatings, setEpisodeRatings] = useState(ratingList);

    function setEpisodeRating(episodeId, episode) {
        episodeRatings[episodeId] = episode;
        setEpisodeRatings(episodeRatings);
    }

    function addNewEpisodeRating(episodeId) {
        const newRating = {
            rating: 0.0,
            ratingCount: 0,
            ratings: {}
        }
        episodeRatings[episodeId] = newRating;
        setEpisodeRatings(episodeRatings);
    }

    function getEpisodeRatingById(id) {
        return episodeRatings[id];
    }

    function getUsersTop5EpisodesById(id){
        const episodes = Object.keys(episodeRatings);
        const userEpisodeIds = episodes.filter(episode => episodeRatings[episode].ratings[id]);
        userEpisodeIds.sort((a, b) => {return episodeRatings[b].ratings[id] - episodeRatings[a].ratings[id]});
        if (userEpisodeIds.length > 5) userEpisodeIds.splice(0, 5);
        return userEpisodeIds;
    }

    function addEpisodeRating(episodeId, userId, rating) {
        const episode = episodeRatings[episodeId];
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

    function getHighestRatedIds() {
        const episodes = Object.keys(episodeRatings);
        episodes.sort((a, b) => {
            if (episodeRatings[a].rating > episodeRatings[b].rating) {
                return -1;
            } else if (episodeRatings[a].rating > episodeRatings[b].rating) {
                return 1;
            } else {
                return 0;
            }
        });
        return episodes;
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
