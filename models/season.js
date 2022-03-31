/* Show mongoose model */
const mongoose = require('mongoose')

// showId used to map season to show
const SeasonSchema = new mongoose.Schema({
    showId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    seasonNum: {
        type: Number,
        required: true,
        default: 1
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
    }
})

const Season = mongoose.model('Season', SeasonSchema)
module.exports = { Season }
