const log = console.log

const express = require('express');
const router = express.Router();

const { User } = require('../models/user')

const { mongoChecker, isMongoError } = require('./helpers/mongoHelpers')
const { authenticate } = require('./helpers/authenticate')
const { ObjectID } = require('mongodb')


// A route to login and create a session
router.post('/login', mongoChecker, (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // log(email, password);
    // Use the static method on the User model to find a user
    // by their email and password
    User.findByEmailPassword(email, password)
        .then(user => {
            // Add the user's id to the session.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.email = user.email; 
            res.send({ _id: user._id, 
                       profilePicture: user.profilePicture,
                       isAdmin: user.isAdmin }); //TODO send other user stuff like profile picture
        })
        .catch(error => {
            res.status(400).send();
        });
});

// A route to login and create a session
router.post('/create', mongoChecker, async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = new User({
        email: email,
        password: password,
        isAdmin: false 
    });

    try {
		const result = await user.save();
		res.send({ _id: result._id, profilePictureL: result.profilePicture, isAdmin: result.isAdmin });
	} catch (error) {
		log(error);
		if (isMongoError(error)) { 
			res.status(500).send('Internal server error');
		} else {
            if (error.code === 11000) {
			    res.status(401).send('Account already exists'); 
            } else {
                res.status(400).send("Server error");
            }
		}
	}
});


// A route to logout a user
router.get('/logout', (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

// A route to check if a user is logged in on the session
router.get('/check-session', (req, res) => {
    if (req.session.user) {
        res.send({ _id: req.session._id });
    } else {
        res.status(401).send();
    }
});

router.get('/:id', mongoChecker, async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(400).send('Can\'t find user');
        return;
    } 
    const result = await User.findById(id);
    const sendMe = {
        _id: result?._id,
        username: result?.username,
        profilePicture: result?.profilePicture,
        bio: result?.bio
        //TODO top shows and stuff
    }
    res.send(sendMe);
});


router.delete('/:id', mongoChecker, authenticate, async (req, res) => {
    const id = req.params.id;
    //Only a user can edit themselves or an admin
    if (id != req.user._id && !req.user.isAdmin) {
        res.status(401).send('Unauthorized');
    } else {
        const result = await User.deleteOne({_id: id});
        res.status(200).send(result);
    }
});

router.post('/', mongoChecker, authenticate, async (req, res) => {
    //Only a user can edit themselves or an admin
    if (req.body._id != req.user._id && !req.user.isAdmin) {
        res.status(401).send('Unauthorized');
    } else {
        const result = await User.updateOne({_id: req.body._id}, {$set: { ...req.body }});
        res.status(200).send(result);
    }
});

module.exports = router;