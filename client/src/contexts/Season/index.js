import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { seasonList } from "../../local-data";

export const seasonListDefaultValues = {
    seasons: {},
    setSeasons: () => {},
    getSeasons: () => {},
    getSeasonById: () => {},
    setSeason: () => {},
    addSeason: () => {},
    getSeasonsByGenre: () => {}
}

export const seasonListContext = createContext(seasonListDefaultValues);

export function useSeasonListContext(){
    // import this to files
    return useContext(seasonListContext);
}

export function useProvideSeasonListContext(){
    const [seasons, setseasons] = useState(seasonList);

    function getSeasons() {
        return seasons;
    }

    function getSeasonById(id) {
        return seasons.find(season => season.seasonId == id);
    }

    function setSeason(season) {
        const newseasonList = seasons.map(s => s.seasonId == season.seasonId ? season : s);
        setseasons(newseasonList);
    }

    function addSeason() {
        const newseason = {
            seasonId: seasons[seasons.length - 1].seasonId + 1, //Id system inspired by lecture, use UUID's for server?
            picture: '/images/default-picture.jpg', //TODO allow users to upload photos to server
            title: '',
            genre: [],
            startDate: '',
            endDate: '',
            description: ''
        };
        seasons.push(newseason);
        setSeason(seasons);
        return newseason.seasonId;
    }

    function getSeasonsByGenre(genre) {
        return seasons.filter(season => season.genre.includes(genre));
    }

    return {
        seasons,
        setSeason,
        getSeasons,
        getSeasonById,
        setSeason,
        addSeason,
        getSeasonsByGenre
    }
}

export function ProvideSeasonListContext({children}){
    const seasonList = useProvideSeasonListContext()
    return (
        <seasonListContext.Provider value={seasonList}>
            {children}
        </seasonListContext.Provider>
    )
}
