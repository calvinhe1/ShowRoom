/* Comment mongoose model */
const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    authorName: {
		type: String,
		required: true,
		minlength: 1,
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
