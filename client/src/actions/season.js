import axios from "axios"

// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host


// note: start and end dates can be null
export const createSeason = (showId, seasonNum, seasonCategory, title, description, startDate, endDate, image_url) => {
    const options = {
        url: `${API_HOST}/api/seasons/create`,
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: {
            showId: showId,
            seasonNum: seasonNum,
            seasonCategory: seasonCategory,
            title: title,
            description: description,
            startDate: startDate,
            endDate: endDate,
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

export const modifySeason = (seasonInfo) => {
    const options = {
        url: `${API_HOST}/api/seasons/${seasonInfo._id}`,
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: {
            showId: seasonInfo.showId,
            seasonNum: seasonInfo.seasonNum,
            seasonCategory: seasonInfo.seasonCategory,
            title: seasonInfo.title,
            description: seasonInfo.description,
            startDate: seasonInfo.startDate,
            endDate: seasonInfo.endDate,
            image_url: seasonInfo.image_url
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


export const getAllSeasons = () => {
    const options = {
        url: `${API_HOST}/api/seasons/find`,
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


export const getAllSeasonsByShow = async (showId) => {
    const options = {
        url: `${API_HOST}/api/seasons/findshow/${showId}`,
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

export const getSeasonById = (seasonId) => {
    const options = {
        url: `${API_HOST}/api/seasons/findseason/${seasonId}`,
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

export const likeDislikeSeason = (seasonId, reactionType) => {
    const options = {
        url: `${API_HOST}/api/seasons/reaction/${seasonId}`,
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
