const log = console.log

const express = require('express');
const router = express.Router();

const { Season } = require('../models/season')

const { mongoChecker, isMongoError } = require('./helpers/mongoHelpers')
const { ObjectID } = require('mongodb')


// Create a new show; todo: uncomment line with authenticate later
// router.post("/seasons/create", mongoChecker, authenticate, async (req, res) => {
router.post('/create', mongoChecker, (req, res) => {

    const showId = req.body.showId;
    const seasonNum = req.body.seasonNum;
    const seasonCategory = req.body.seasonCategory;
    const title = req.body.title;
    const description = req.body.description;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const image_url = req.body.image_url;

    const season = new Season({
        showId: ObjectID(showId),
        seasonNum: seasonNum,
        seasonCategory: seasonCategory,
        title: title,
        description: description,
        startDate: startDate,
        endDate: endDate,
        image_url: image_url
    });

    season.save().then((result) => {
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
    const seasonNum = req.body.seasonNum;
    const seasonCategory = req.body.seasonCategory;
    const title = req.body.title;
    const description = req.body.description;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const image_url = req.body.image_url;


    Season.findById(ObjectID(id)).then((season) => {
        season.seasonNum = seasonNum
        season.seasonCategory = seasonCategory
        season.title = title
        season.description = description
        season.startDate = startDate
        season.endDate = endDate
        season.image_url = image_url
        season.save().then((result) => {
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

// get all seasons in database
router.get('/find', mongoChecker, (req, res) => {

    Season.find({}).then((seasons) => {
        res.send({ seasons })
    }).catch((error) => {
        log(error)
        if (isMongoError(error)) { 
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request'); 
        }
    })
});

// get all seasons of a show
router.get('/findshow/:showid', mongoChecker, (req, res) => {

    const showid = req.params.showid

    Season.find({showId: showid}).then((seasons) => {
        res.send({ seasons })
    }).catch((error) => {
        log(error)
        if (isMongoError(error)) { 
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request'); 
        }
    })
});

router.get('/findseason/:id', mongoChecker, async (req, res) => {
    const id = req.params.id

    Season.findById(ObjectID(id)).then((season) => {
        res.send(season)
    }).catch((error) => {
        log(error)
        if (isMongoError(error)) { 
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request'); 
        }
    })
});

// like or unlike a season; reactionType: "like" or "dislike"
router.post('/reaction/:id', mongoChecker, async (req, res) => {
    const id = req.params.id
    const reactionType = req.body.reactionType

    Season.findById(ObjectID(id)).then((season) => {
        if (reactionType == "like"){
            season.numLikes++
        } else if (reactionType == "dislike"){
            season.numDislikes++
        }
        season.save().then((result) => {
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