const log = console.log

const express = require('express');
const router = express.Router();

const { Season } = require('../models/season')

const { mongoChecker, isMongoError } = require('./helpers/mongoHelpers')
const { ObjectID } = require('mongodb')


// Create a new show; todo: uncomment line with authenticate later
// router.post("/seasons/create", mongoChecker, authenticate, async (req, res) => {
router.post('/create', mongoChecker, async (req, res) => {

    const showId = req.body.showId;
    const seasonNum = req.body.seasonNum;
    const title = req.body.title;
    const description = req.body.description;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    const season = new Season({
        showId: ObjectID(showId),
        seasonNum: seasonNum,
        title: title,
        description: description,
        startDate: startDate,
        endDate: endDate
    });

    try {
        const result = await season.save();
        res.send({ seasonId: result._id, 
            showId: result.showId,
            seasonNum: result.seasonNum,
            title: result.title, 
            description: result.description, 
            startDate: result.startDate, 
            endDate: result.endDate});
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
    const seasonId = req.body.id;

    Season.findById(ObjectID(seasonId)).then((season) => {
        res.send(season)
    }).catch((error) => {
        log(error)
        res.status(400).send("Bad Request")
    })
});

module.exports = router;