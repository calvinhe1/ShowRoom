/* Show mongoose model */
const mongoose = require('mongoose')

// For episodes that do not have title/description, store empty string
const EpisodeSchema = new mongoose.Schema({
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

// list of episodes nested within a season
const SeasonSchema = new mongoose.Schema({
    SeasonNum: {
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
    startDate: {
        type: Date,
        required: false,
    },
    endDate: {
        type: Date,
        required: false,
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
    episodeList: {
        type: [EpisodeSchema],
        required: true,
        default: []
    }
})

// Shows with only 1 season have len(seasonList) == 1
const ShowSchema = new mongoose.Schema({
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
    startDate: {
        type: Date,
        required: false,
    },
    endDate: {
        type: Date,
        required: false,
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
    seasonList: {
        type: [SeasonSchema],
        default: []
    }
})

const Episode = mongoose.model('Episode', EpisodeSchema)
const Season = mongoose.model('Season', SeasonSchema)
const Show = mongoose.model('Show', ShowSchema)

module.exports = { Show, Season, Episode }