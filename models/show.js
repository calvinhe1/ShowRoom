/* Show mongoose model */
const mongoose = require('mongoose')

const RatingSchema = new mongoose.Schema({
    numTotalRatings: {
        type: Number,
        required: true,
        default: 0
    },
    numFiveStars: {
        type: Number,
        required: true,
        default: 0
    },
    numFourStars: {
        type: Number,
        required: true,
        default: 0
    },
    numThreeStars: {
        type: Number,
        required: true,
        default: 0
    },
    numTwoStars: {
        type: Number,
        required: true,
        default: 0
    },
    numOneStars: {
        type: Number,
        required: true,
        default: 0
    },
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
    tags: [String],
    genres: [String],
    ratings: RatingSchema,
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

const Show = mongoose.model('Show', ShowSchema)

module.exports = { Show }