import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { showList } from "../../local-data";

export const showListDefaultValues = {
    shows: {},
    setShows: () => {},
    getShows: () => {},
    getShowById: () => {},
    setShow: () => {},
    addShow: () => {},
    getShowsByGenre: () => {},
    getShowsBySeason: () => {}
}

export const showListContext = createContext(showListDefaultValues);

export function useShowListContext(){
    // import this to files
    return useContext(showListContext);
}

export function useProvideShowListContext(){
    const [shows, setShows] = useState(showList);

    function getShows() {
        return shows;
    }

    function getShowById(id) {
        return shows.find(show => show.showId == id);
    }

    function setShow(show) {
        const newShowList = shows.map(s => s.showId == show.showId ? show : s);
        setShows(newShowList);
    }

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
    }

    function getShowsByGenre(genre) {
        return shows.filter(show => show.genre.includes(genre));
    }

    function getShowsBySeason(season) {
        return shows.filter(show => show.season.includes(season));

    }

    return {
        shows,
        setShows,
        getShows,
        getShowById,
        setShow,
        addShow,
        getShowsByGenre,
        getShowsBySeason
    }
}

export function ProvideShowListContext({children}){
    const showList = useProvideShowListContext()
    return (
        <showListContext.Provider value={showList}>
            {children}
        </showListContext.Provider>
    )
}
