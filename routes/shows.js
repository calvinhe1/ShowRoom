const log = console.log

const express = require('express');
const router = express.Router();

const { Show } = require('../models/show')
const { Comment } = require('../models/comment')

const { mongoChecker, isMongoError } = require('./helpers/mongoHelpers')
const { ObjectID } = require('mongodb')

const { authenticate } = require('./helpers/authenticate')

// cloudinary: configure using credentials found on your Cloudinary Dashboard
// sign up for a free account here: https://cloudinary.com/users/register/free
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

router.post('/create', mongoChecker, (req, res) => {

    const title = req.body.title;
    const description = req.body.description;

    const tags = req.body.tags;
    const genres = req.body.genres;
    const image_url = req.body.image_url;

    const show = new Show({
        title: title,
        description: description,
        tags: tags,
        genres: genres,
        ratings: {},
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
    const tags = req.body.tags;
    const genres = req.body.genres;
    const image_url = req.body.image_url;

    Show.findById(ObjectID(id)).then((show) => {
        show.title = title
        show.description = description
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

    Show.find({}).then((shows) => {
        res.send({ shows })
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
        switch(starRating) {
            case 1:
                show.ratings.numOneStars++;
                show.ratings.numTotalRatings++;
                break;
            case 2:
                show.ratings.numTwoStars++;
                show.ratings.numTotalRatings++;
                break;
            case 3:
                show.ratings.numThreeStars++;
                show.ratings.numTotalRatings++;
                break;
            case 4:
                show.ratings.numFourStars++;
                show.ratings.numTotalRatings++;
                break;
            case 5:
                show.ratings.numFiveStars++;
                show.ratings.numTotalRatings++;
                break;
            default:
                res.status(400).send('Bad Request');
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
        let totalStars = show.ratings.numFiveStars*5 + show.ratings.numFourStars*4 + show.ratings.numThreeStars*3 + show.ratings.numTwoStars*2 + show.ratings.numOneStars
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

async function deleteImage(imageId) {
    return cloudinary.uploader.destroy(imageId);
}

router.post("/images/:id", multipartMiddleware, mongoChecker, authenticate, async (req, res) => {
    const id = req.params.id;
    if (id != req.user._id && !req.user.isAdmin) {
        res.status(401).send('Unauthorized');
        return;
    }
    const show = await Show.findById(id);
    if (show.image_id) {
        // If user already has a profile picture, first delete the old one from cloudinary
        await deleteImage(show.image_id);
    }

    // Use uploader.upload API to upload image to cloudinary server.
    cloudinary.uploader.upload(
        req.files.image.path, // req.files contains uploaded files
        function (result) {
            Show.updateOne({_id: id}, {$set: {image_id: result.public_id, image_url: result.url}})
                .then(() => {
                    res.status(200).send(result);
                });
        });
});

router.get('/highestrated', mongoChecker, async (req, res) => {
    const avg = []
    Show.find().then((shows) => {
        shows.forEach(show => {
            let totalStars = show.ratings.numFiveStars*5 + show.ratings.numFourStars*4 + show.ratings.numThreeStars*3 + show.ratings.numTwoStars*2 + show.ratings.numOneStars
            let averageStars = totalStars / (show.ratings.numTotalRatings || 1)
            averageStars = Math.round(averageStars * 100) / 100
            avg.push({rating: averageStars, show: show});
        })
        avg.sort((a,b) => {
            return b.rating - a.rating
        })
        const sendMe = avg.map(a => a.show);
        res.send({data: sendMe.slice(0, 10)})
    })
});

router.get('/mosttalkedabout', mongoChecker, async (req, res) => {
    const count = {}
    const avg = []
    Comment.find().then(com => {
        com.forEach(c => {
            if (count[c.topicId]) {
                count[c.topicId]++;
            } else {
                count[c.topicId] = 1;
            }
        });
        Object.keys(count).forEach(key => {
            avg.push({showId: key, count: count[key]});
        })
        avg.sort((a,b) => {
            return b.count - a.count
        });
        const ids = avg.map(a => a.showId);
        Show.find({'_id': { $in: ids }}).then(shows => {
            const sendMe = []
            shows.forEach(show => {
                show.commentCount = count[show._id];
                sendMe.push({show: show, count: count[show._id]})
            });
            res.send(sendMe.slice(0, 10));
        })
    })
});

router.get('/genre/:genre', mongoChecker, async (req, res) => {
    const genre = req.params.genre;
    Show.find({genres: genre}).then(result => {
        res.send(result);
    });
})

module.exports = router;