import axios from "axios"

// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host

// tags and genres are string arrays
export const createShow = async (title, description, tags, genres, image_url) => {
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

export const getAllShows = async () => {
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

export const getAvgShowRating = async (showId) => {
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

// Set a users profile image
export const setShowImage = async (form, id) => {

    const url = `${API_HOST}/api/shows/images/${id}`;

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