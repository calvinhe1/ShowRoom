import axios from "axios"

// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host

// tags and genres are string arrays
export const createShow = (title, description, tags, genres, image_url) => {
    const options = {
        url: `${API_HOST}/api/shows/create`,
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: {
            title: title,
            description: description,
            tags: tags,
            genres: genres,
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

export const modifyShow = (showInfo) => {
    const options = {
        url: `${API_HOST}/api/shows/${showInfo._id}`,
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: {
            title: showInfo.title,
            description: showInfo.description,
            tags: showInfo.tags,
            genres: showInfo.genres,
            image_url: showInfo.image_url
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

export const getAllShows = () => {
    const options = {
        url: `${API_HOST}/api/shows/find`,
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

export const getShowById = (showId) => {
    const options = {
        url: `${API_HOST}/api/shows/find/${showId}`,
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

export const rateShow = (showId, numStars) => {
    const options = {
        url: `${API_HOST}/api/shows/rating/${showId}`,
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: {
            stars: numStars
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

export const getAvgShowRating = (showId) => {
    const options = {
        url: `${API_HOST}/api/shows/rating/${showId}`,
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