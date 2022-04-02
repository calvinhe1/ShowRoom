const log = console.log

const express = require('express');
const router = express.Router();

const { Episode } = require('../models/episode')

const { mongoChecker, isMongoError } = require('./helpers/mongoHelpers')
const { ObjectID } = require('mongodb')


router.post('/create', mongoChecker, async (req, res) => {

    const seasonId = req.body.seasonId;
    const episodeNum = req.body.episodeNum;
    const title = req.body.title;
    const description = req.body.description;
    const airDate = req.body.airDate;

    const episode = new Episode({
        seasonId: ObjectID(seasonId),
        episodeNum: episodeNum,
        title: title,
        description: description,
        airDate: airDate
    });

    try {
        const result = await episode.save();
        res.send({ episodeId: result._id, 
            seasonId: result.seasonId,
            episodeNum: result.episodeNum,
            title: result.title, 
            description: result.description, 
            airDate: result.airDate});
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
    const episodeId = req.body.id;

    Episode.findById(ObjectID(episodeId)).then((episode) => {
        res.send(episode)
    }).catch((error) => {
        log(error)
        res.status(400).send("Bad Request")
    })
});

module.exports = router;