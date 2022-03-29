import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { episodeList } from "../../local-data";


export const episodeListDefaultValues = {
    episodes: {},
    setEpisodes: () => {},
    getEpisodes: () => {},
    setEpisode: () => {},
    getEpisodeById: () => {},
    setEpisode: () => {},
    addEpisode: () => {},
    getEpisodesByGenre: () => {},
    getAllEpisodesByShow: () => {},
    getEpisodeByShow: () => {}
}

export const episodeListContext = createContext(episodeListDefaultValues);

export function useEpisodeListContext(){
    // import this to files
    return useContext(episodeListContext);
}

export function useProvideEpisodeListContext(){
    const [episodes, setEpisodes] = useState(episodeList);

    function getEpisodes() {
        return episodes;
    }

    function getEpisodeById(id) {
        return episodes.find(episode => episode.showId == id);
    }

    function getAllEpisodesByShow(id) {
        let arr = []
        for (let i=0; i<episodes.length; i++) {
            if (episodes[i].showId == id) {
                arr.push(episodes[i])
            }
        }
        return arr

    }

    function getEpisodeByShow(showId, epId) {
        return episodes.find(episode => episode.episode == epId && episode.showId == showId);
    }

    function setEpisode(episode, showId) {
        const newEpisodeList = episodes.map(s => s.episode == episode.episode && s.showId == showId ? episode: s);
        setEpisodes(newEpisodeList);
    }

    
    function getEpisodeById(id) {
        return episodes.find(episode => episode.episode == id);
    }

    
    function setEpisode(Episode) {
        const newEpisodeList = episodes.map(s => s.episode == Episode.episode ? Episode : s);
        setEpisodes(newEpisodeList);
    }

    
    function addEpisode() {
        const newEpisode = {
            episode: episodes[episodes.length - 1].episode + 1, //Id system inspired by lecture, use UUID's for server?
            picture: '/images/default-picture.jpg', //TODO allow users to upload photos to server
            title: '',
            genre: [],
            startDate: '',
            endDate: '',
            description: ''
        };
        episodes.push(newEpisode);
        setEpisodes(episodes);
        return newEpisode.episode;
    }
    
    function getEpisodesByGenre(genre) {
        return episodes.filter(episode => episode.genre.includes(genre));
    }

    return {
    
        setEpisodes,
        getEpisodes,
        getEpisodeById,
        setEpisode,
        addEpisode,
        getEpisodesByGenre,
        episodes,
        getEpisodes,
        setEpisode,
        getAllEpisodesByShow,
        getEpisodeByShow
    }
}

export function ProvideEpisodeListContext({children}){
    const episodeList = useProvideEpisodeListContext()
    return (
        <episodeListContext.Provider value={episodeList}>
            {children}
        </episodeListContext.Provider>
    )
}



