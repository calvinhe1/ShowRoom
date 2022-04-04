/* Comment mongoose model */
const mongoose = require('mongoose')

// Topic types: show, season, episode
// based on topic type, topic id can be showId, seasonId, or episodeId
const CommentSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    topicType: {
        type: String,
        required: true
    },
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true,
        minlength: 1
    },
    numLikes: {
        type: Number,
        required: true,
        default: 0
    },
    numDislikes: {
        type: Number,
        required: true,
        default: 0
    },
}, {timestamps: true});

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = { Comment }
