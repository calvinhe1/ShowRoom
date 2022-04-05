import axios from "axios"

// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host


// note: start and end dates can be null
export const createEpisode = (seasonId, episodeNum, title, description, airDate, image_url) => {
    const options = {
        url: `${API_HOST}/api/episodes/create`,
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: {
            seasonId: seasonId,
            episodeNum: episodeNum,
            title: title,
            description: description,
            airDate: airDate,
            image_url: image_url
        }
    }
    return axios(options)
    .then((response) => {
        return {
            data: response.data
        }
    }).catch((error) => {
        return error
    })
}


export const modifyEpisode = (episodeInfo) => {
    const options = {
        url: `${API_HOST}/api/episodes/${episodeInfo._id}`,
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: {
            seasonId: episodeInfo.seasonId,
            episodeNum: episodeInfo.episodeNum,
            title: episodeInfo.title,
            description: episodeInfo.description,
            airDate: episodeInfo.airDate,
            image_url: episodeInfo.image_url
        }
    }
    return axios(options)
    .then((response) => {
        return {
            data: response.data
        }
    }).catch((error) => {
        return error
    })
}

export const getAllEpisodes = () => {
    const options = {
        url: `${API_HOST}/api/episodes/find`,
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }
    return axios(options)
    .then((response) => {
        return {
            data: response.data
        }
    }).catch((error) => {
        return error
    })
}

export const getAllEpisodesBySeason = (seasonId) => {
    const options = {
        url: `${API_HOST}/api/episodes/findseason/${seasonId}`,
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }
    return axios(options)
    .then((response) => {
        return {
            data: response.data
        }
    }).catch((error) => {
        return error
    })
}

export const getEpisodeById = (episodeId) => {
    const options = {
        url: `${API_HOST}/api/episodes/findepisode/${episodeId}`,
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }
    return axios(options)
    .then((response) => {
        return {
            data: response.data
        }
    }).catch((error) => {
        return error
    })
}


export const likeDislikeEpisode = (episodeId, reactionType) => {
    const options = {
        url: `${API_HOST}/api/episodes/reaction/${episodeId}`,
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: {
            reactionType: reactionType
        }
    }
    return axios(options)
    .then((response) => {
        return {
            data: response.data
        }
    }).catch((error) => {
        return error
    })
}
