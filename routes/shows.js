const log = console.log

const express = require('express');
const router = express.Router();

const { Show } = require('../models/show')

const { mongoChecker, isMongoError } = require('./helpers/mongoHelpers')
const { ObjectID } = require('mongodb')


// Create a new show; todo: uncomment line with authenticate later
// router.post("/shows/create", mongoChecker, authenticate, async (req, res) => {
router.post('/create', mongoChecker, (req, res) => {

    const title = req.body.title;
    const description = req.body.description;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    // e.g. "Summer 2021"
    const scheduleSeason = req.body.scheduleSeason;
    const tags = req.body.tags;
    const genres = req.body.genres;
    const image_url = req.body.image_url;

    // 

    const show = new Show({
        title: title,
        description: description,
        startDate: startDate,
        endDate: endDate,
        scheduleSeason: scheduleSeason,
        tags: tags,
        genres: genres,
        image_url: image_url
    });


    show.save().then((result) => {
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

    const title = req.body.title;
    const description = req.body.description;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    // e.g. "Summer 2021"
    const scheduleSeason = req.body.scheduleSeason;
    const tags = req.body.tags;
    const genres = req.body.genres;
    const image_url = req.body.image_url;

    Show.findById(ObjectID(showId)).then((show) => {
        show.title = title
        show.description = description
        show.startDate = startDate
        show.endDate = endDate
        show.scheduleSeason = scheduleSeason
        show.tags = tags
        show.genres = genres
        show.image_url = image_url
        show.save().then((result) => {
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

})

// get all show information
router.get('/find', mongoChecker, (req, res) => {

    Show.find({}).then((result) => {
        res.send({ result })
    }).catch((error) => {
        log(error)
        if (isMongoError(error)) { 
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request'); 
        }
    })
});


// get specific show by id
router.get('/find/:id', mongoChecker, (req, res) => {
    const id = req.params.id

    Show.findById(ObjectID(id)).then((show) => {
        res.send(show)
    }).catch((error) => {
        log(error)
        if (isMongoError(error)) { 
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request'); 
        }
    })
});

// add rating; where id = showid, and stars = 1,2,3,4,5
router.post('/rating/:id', mongoChecker, (req, res) => {
    const id = req.params.id
    const starRating = req.body.stars

    Show.findById(ObjectID(id)).then((show) => {
        show.ratings.numTotalRatings++;
        switch(starRating) {
            case 1:
                show.ratings.numOneStars++;
                break;
            case 2:
                show.ratings.numTwoStars++;
                break;
            case 3:
                show.ratings.numThreeStars++;
                break;
            case 4:
                show.ratings.numFourStars++;
                break;
            case 5:
                show.ratings.numFiveStars++;
                break;
        }
        show.save().then((result) => {
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

// get calculated average ratings; rounded to nearest 2 decimals
router.get('/rating/:id', mongoChecker, (req, res) => {
    const id = req.params.id

    Show.findById(ObjectID(id)).then((show) => {
        let totalStars = show.ratings.numFiveStars + show.ratings.numFourStars + show.ratings.numThreeStars + show.ratings.numTwoStars + show.ratings.numOneStars
        let averageStars = totalStars / show.ratings.numTotalRatings
        averageStars = Math.round(averageStars * 100) / 100
        res.send({averageStars : averageStars})
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