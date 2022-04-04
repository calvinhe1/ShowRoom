const log = console.log

const express = require('express');
const router = express.Router();

const { Comment } = require('../models/comment')

const { mongoChecker, isMongoError } = require('./helpers/mongoHelpers')
const { ObjectID } = require('mongodb')

// Topic types: show, season, episode
// based on topic type, topic id can be showId, seasonId, or episodeId
router.post('/create', mongoChecker, (req, res) => {

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

    comment.save().then((result) => {
        res.send(result)
    }).catch((error) => {
        log(error)
        if (isMongoError(error)) { 
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request'); 
        }
    })

});


router.patch('/:id', mongoChecker, (req, res) => {

    const id = req.params.id
    const authorId = req.body.authorId;
    const topicType = req.body.topicType;
    const topicId = req.body.topicId;
    const content = req.body.content;

    Comment.findById(ObjectID(id)).then((comment) => {
        comment.authorId = ObjectID(authorId)
        comment.topicType = topicType
        comment.topicId = ObjectID(topicId)
        comment.content = content
        comment.save().then((result) => {
            res.send(result)
        })
    }).catch((error) => {
        log(error)
        if (isMongoError(error)) { 
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request'); 
        }
    })

});

// get all comments in database
router.get('/find', mongoChecker, (req, res) => {

    Comment.find({}).then((comments) => {
        res.send({ comments })
    }).catch((error) => {
        log(error)
        if (isMongoError(error)) { 
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request'); 
        }
    })
});


// get all comments from a specific author
router.get('/finduser/:authorid', mongoChecker, (req, res) => {

    const authorid = req.params.authorid

    Comment.find({authorId: authorid}).then((comments) => {
        res.send({ comments })
    }).catch((error) => {
        log(error)
        if (isMongoError(error)) { 
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request'); 
        }
    })
});

// get all comments from a specific topicId
router.get('/findtopic/:topicid', mongoChecker, (req, res) => {

    const topicid = req.params.topicid

    Comment.find({topicId: topicid}).then((comments) => {
        res.send({ comments })
    }).catch((error) => {
        log(error)
        if (isMongoError(error)) { 
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request'); 
        }
    })
});

// get all comments from a specific topic type
router.get('/findtopic', mongoChecker, (req, res) => {

    const topicType = req.body.topicType;

    Comment.find({topicType: topicType}).then((comments) => {
        res.send({ comments })
    }).catch((error) => {
        log(error)
        if (isMongoError(error)) { 
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request'); 
        }
    })
});

//get specific comment info by commentId
router.get('/findcomment/:id', mongoChecker, (req, res) => {
    const id = req.params.id

    Comment.findById(ObjectID(id)).then((comment) => {
        res.send(comment)
    }).catch((error) => {
        log(error)
        if (isMongoError(error)) { 
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request'); 
        }
    })
});


// like or unlike a comment; reactionType: "like" or "dislike"
router.post('/reaction/:id', mongoChecker, (req, res) => {
    const id = req.params.id
    const reactionType = req.body.reactionType

    Comment.findById(ObjectID(id)).then((comment) => {
        if (reactionType == "like"){
            comment.numLikes++
        } else if (reactionType == "dislike"){
            comment.numDislikes++
        }
        comment.save().then((result) => {
            res.send(result)
        })
    }).catch((error) => {
        log(error)
        if (isMongoError(error)) { 
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request'); 
        }
    })
});

module.exports = router;