/* Show mongoose model */
const mongoose = require('mongoose')

// For episodes that do not have title/description, store empty string
const EpisodeSchema = new mongoose.Schema({
    seasonId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    episodeNum: {
        type: Number,
        required: true,
        unique: true
    },
	title: {
		type: String,
		required: true,
        default: ""
	}, 
	description: {
		type: String,
        required: false,
        default: ""
	},
    airDate: {
        type: Date,
        required: false
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
    }
})

const Episode = mongoose.model('Episode', EpisodeSchema)

module.exports = { Episode }
