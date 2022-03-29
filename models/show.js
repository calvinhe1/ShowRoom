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
const Show = mongoose.model('Show', {
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

module.exports = { Show }