const log = console.log

const express = require('express');
const router = express.Router();

const { Episode } = require('../models/episode')

const { mongoChecker, isMongoError } = require('./helpers/mongoHelpers')
const { ObjectID } = require('mongodb')
const { authenticate } = require('./helpers/authenticate')

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dgd284zmh',
    api_key: '939854537778158',
    api_secret: 'FdY3dpnSqjBf8BHJd3d292OHA88'
});

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();


// airDate example format: "2020-04-14"
router.post('/create', mongoChecker, (req, res) => {
    const showId = req.body.showId;
    const seasonId = req.body.seasonId;
    const episodeNum = req.body.episodeNum;
    const title = req.body.title;
    const description = req.body.description;
    const airDate = req.body.airDate;
    const image_url = req.body.image_url;

    const episode = new Episode({
        showId: showId,
        seasonId: ObjectID(seasonId),
        episodeNum: episodeNum,
        title: title,
        description: description,
        airDate: airDate,
        image_url: image_url
    });

    episode.save().then((result) => {
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

async function deleteImage(imageId) {
    return cloudinary.uploader.destroy(imageId);
}

router.post("/images/:id", multipartMiddleware, mongoChecker, authenticate, async (req, res) => {
    const id = req.params.id;
    if (id != req.user._id && !req.user.isAdmin) {
        res.status(401).send('Unauthorized');
        return;
    }

    const episode = await Episode.findById(id);
    if (episode.image_id) {
        // If user already has a profile picture, first delete the old one from cloudinary
        await deleteImage(episode.image_id);
    }


    // Use uploader.upload API to upload image to cloudinary server.
    cloudinary.uploader.upload(
        req.files.image.path, // req.files contains uploaded files
        function (result) {
            Episode.updateOne({_id: id}, {$set: {image_id: result.public_id, image_url: result.url}})
                .then(() => {
                    res.status(200).send(result);
                });
        });
});


router.patch('/:id', mongoChecker, (req, res) => {
    const showId = req.body.showId;
    const id = req.params.id
    const seasonId = req.body.seasonId;
    const episodeNum = req.body.episodeNum;
    const title = req.body.title;
    const description = req.body.description;
    const airDate = req.body.airDate;
    const image_url = req.body.image_url;


    Episode.findById(ObjectID(id)).then((episode) => {
        episode.showId = showId
        episode.seasonId = ObjectID(seasonId)
        episode.episodeNum = episodeNum
        episode.title = title
        episode.description = description
        episode.airDate = airDate
        episode.image_url = image_url
        episode.save().then((result) => {
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

// get all episodes in database
router.get('/find', mongoChecker, (req, res) => {

    Episode.find({}).then((episodes) => {
        res.send({ episodes })
    }).catch((error) => {
        log(error)
        if (isMongoError(error)) { 
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request'); 
        }
    })
});

// get all episodes of a season
router.get('/findseason/:seasonid', mongoChecker, (req, res) => {

    const seasonid = req.params.seasonid

    Episode.find({seasonId: seasonid}).then((episodes) => {
        res.send({ episodes })
    }).catch((error) => {
        log(error)
        if (isMongoError(error)) { 
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request'); 
        }
    })
});

//get specific episode info by episodeId
router.get('/findepisode/:id', mongoChecker, (req, res) => {
    const id = req.params.id

    Episode.findById(ObjectID(id)).then((episode) => {
        res.send(episode)
    }).catch((error) => {
        log(error)
        if (isMongoError(error)) { 
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request'); 
        }
    })
});


// like or unlike an episode; reactionType: "like" or "dislike"
router.post('/reaction/:id', mongoChecker, (req, res) => {
    const id = req.params.id
    const reactionType = req.body.reactionType

    Episode.findById(ObjectID(id)).then((episode) => {
        if (reactionType == "like"){
            episode.numLikes++
        } else if (reactionType == "dislike"){
            episode.numDislikes++
        }
        episode.save().then((result) => {
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

router.get('/toprated/:id', async (req, res) => {
    try {
        const result = await Episode.find({}).sort({'numLikes': 'desc'});
        //Only get the top 3
        res.send(result.slice(0, 3));
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;