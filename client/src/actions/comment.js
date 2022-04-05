import axios from "axios"

// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host


// note: airDate can be null
export const createComment = (authorId, topicType, topicId, content) => {
    const options = {
        url: `${API_HOST}/api/comments/create`,
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: {
            authorId: authorId,
            topicType: topicType,
            topicId: topicId,
            content: content
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


export const modifyComment = (commentInfo) => {
    const options = {
        url: `${API_HOST}/api/comments/${commentInfo._id}`,
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: {
            authorId: commentInfo.authorId,
            topicType: commentInfo.topicType,
            topicId: commentInfo.topicId,
            content: commentInfo.content
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

export const getAllComments = () => {
    const options = {
        url: `${API_HOST}/api/comments/find`,
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

export const getCommentsByAuthor = (authorId) => {
    const options = {
        url: `${API_HOST}/api/comments/finduser/${authorId}`,
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

export const getCommentsByTopicId = (topicId) => {
    const options = {
        url: `${API_HOST}/api/comments/findtopic/${topicId}`,
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

export const getCommentsByTopicType = (topicType) => {
    const options = {
        url: `${API_HOST}/api/comments/findtopic`,
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: {
            topicType: topicType
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

export const getCommentById = (commentId) => {
    const options = {
        url: `${API_HOST}/api/comments/findcomment/${commentId}`,
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


export const likeDislikeComment = (commentId, reactionType) => {
    const options = {
        url: `${API_HOST}/api/comments/reaction/${commentId}`,
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
