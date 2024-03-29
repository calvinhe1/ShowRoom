/* Show mongoose model */
const mongoose = require('mongoose')

// For episodes that do not have title/description, store empty string
const EpisodeSchema = new mongoose.Schema({
    showId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    seasonId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    episodeNum: {
        type: Number,
        required: true,
        unique: false
    },
	title: {
		type: String,
		required: false,
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
    },
    image_url: {
		type: String,
		required: false,
        default: "/images/aot.jpg"
	},
    image_id: {
        type: String,
        required: false
    }
})

const Episode = mongoose.model('Episode', EpisodeSchema)

module.exports = { Episode }
