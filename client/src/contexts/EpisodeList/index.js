import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { episodeList } from "../../local-data";


export const episodeListDefaultValues = {
    episodes: {},
    //setShows: () => {},
    getEpisodes: () => {},
    setEpisode: () => {}
    //getShowById: () => {},
    //setShow: () => {},
    //addShow: () => {},
    //getShowsByGenre: () => {}
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

    function getShowById(id) {
        return episodes.find(episode => episode.showId == id);
    }

    function setEpisode(episode) {
        const newEpisodeList = episodes.map(s => s.showId == episode.showId ? episode: s);
        setEpisodes(newEpisodeList);
    }

    /*
    function getEpisodeById(id) {
        return episodes.find(episode => episode.showId == id);
    }*/

    /*
    function setShow(show) {
        const newShowList = shows.map(s => s.showId == show.showId ? show : s);
        setShows(newShowList);
    }*/

    /*
    function addShow() {
        const newShow = {
            showId: shows[shows.length - 1].showId + 1, //Id system inspired by lecture, use UUID's for server?
            picture: '/images/default-picture.jpg', //TODO allow users to upload photos to server
            title: '',
            genre: [],
            startDate: '',
            endDate: '',
            description: ''
        };
        shows.push(newShow);
        setShows(shows);
        return newShow.showId;
    }*/
    /*
    function getShowsByGenre(genre) {
        return shows.filter(show => show.genre.includes(genre));
    }*/

    return {
        /*
        shows,
        setShows,
        getShows,
        getShowById,
        setShow,
        addShow,
        getShowsByGenre*/

        episodes,
        getEpisodes,
        setEpisode
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



