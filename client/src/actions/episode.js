import axios from "axios"

// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host


// note: start and end dates can be null
export const createEpisode = async (showId, seasonId, episodeNum, title, description, airDate, image_url) => {
    const options = {
        url: `${API_HOST}/api/episodes/create`,
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: {
            showId: showId,
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
            showId: episodeInfo.showId,
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

export const getAllEpisodesBySeason = async (seasonId) => {
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

export const getTopRatedEpisodes = async (showId) => {
    const options = {
        url: `${API_HOST}/api/episodes/toprated/${showId}`,
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
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

export const setEpisodeImage = async (form, id) => {

    const url = `${API_HOST}/api/episodes/images/${id}`;

    // The data we are going to send in our request
    const imageData = new FormData(form);

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: imageData,
    });

    // Send the request with fetch()
    return fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If image was added successfully, tell the user.
                alert('Success!');
                return res.json();
            } else {
                // If server couldn't add the image, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                alert('Error! Could not add image');
            }
        })
        .then((res) => {
            return res.url;
        })
        .catch(error => {
            console.log(error);
        });
}; 
