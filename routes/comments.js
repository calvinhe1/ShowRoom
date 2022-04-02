const log = console.log

const express = require('express');
const router = express.Router();

const { Comment } = require('../models/comment')

const { mongoChecker, isMongoError } = require('./helpers/mongoHelpers')
const { ObjectID } = require('mongodb')


router.post('/create', mongoChecker, async (req, res) => {

    const authorId = req.body.authorId;
    const topicType = req.body.topicType;
    const topicId = req.body.topicId;
    const content = req.body.content;

    const comment = new Comment({
        authorId: ObjectID(authorId),
        topicType: topicType,
        topicId: topicId,
        content: content
    });

    try {
        const result = await comment.save();
        res.send({ commentId: result._id, 
            authorId: result.showId,
            topicType: result.topicType,
            topicId: result.topicId,
            content: result.content,
            createdAt: result.createdAt});
    } catch (error) {
        log(error);
        if (isMongoError(error)) { 
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request'); 
        }
    }
});

router.get('/find', mongoChecker, async (req, res) => {
    // finds all comments by certain user
    const commentId = req.body.id;

    Comment.findById(ObjectID(commentId)).then((comment) => {
        res.send(comment)
    }).catch((error) => {
        log(error)
        res.status(400).send("Bad Request")
    })
});

module.exports = router;