/* Show mongoose model */
const mongoose = require('mongoose')

// showId used to map season to show
// seasonCategory: "summer 2020, winter 2021, etc"
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
    seasonCategory: {
        type: String,
        required: false
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
    image_url: {
		type: String,
		required: false,
        default: "/images/aot.jpg"
	},
})

const Season = mongoose.model('Season', SeasonSchema)
module.exports = { Season }
