/* Show mongoose model */
const mongoose = require('mongoose')

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
    }
})

const Show = mongoose.model('Show', ShowSchema)

module.exports = { Show }