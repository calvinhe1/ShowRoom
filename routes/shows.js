const log = console.log

const express = require('express');
const router = express.Router();

const { Show } = require('../models/show')

const { mongoChecker, isMongoError } = require('./helpers/mongoHelpers')
const { ObjectID } = require('mongodb')


// Create a new show; todo: uncomment line with authenticate later
// router.post("/shows/create", mongoChecker, authenticate, async (req, res) => {
router.post('/create', mongoChecker, async (req, res) => {

    const title = req.body.title;
    const description = req.body.description;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    const show = new Show({
        title: title,
        description: description,
        startDate: startDate,
        endDate: endDate
    });

    try {
        const result = await show.save();
        res.send({ showId: result._id, 
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

// check list of all 
// router.get("/shows/find/:id", mongoChecker, async (req, res) => {
router.get('/find', mongoChecker, async (req, res) => {
    const showId = req.body.id;

    Show.findById(ObjectID(showId)).then((show) => {
        res.send(show)
    }).catch((error) => {
        log(error)
        res.status(400).send("Bad Request")
    })
});

module.exports = router;