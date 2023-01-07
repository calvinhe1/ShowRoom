const log = console.log

const express = require('express');
const router = express.Router();

const { User } = require('../models/user')

const { mongoChecker, isMongoError } = require('./helpers/mongoHelpers')
const { authenticate } = require('./helpers/authenticate')
const { ObjectID } = require('mongodb')

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


router.post("/login", mongoChecker, (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findByEmailPassword(email, password)
        .then(user => {
            // Add the user's id to the session.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.email = user.email; 
            res.send({ _id: user._id, 
                       image_url: user.image_url,
                       isAdmin: user.isAdmin }); //TODO send other user stuff like profile picture
        })
        .catch((e) => {
            res.status(e).send();
        });
});

// A route to login and create a session
router.post("/create", mongoChecker, async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = new User({
        email: email,
        password: password,
        isAdmin: false 
    });

    try {
		const result = await user.save();
		res.send({ _id: result._id, profilePicture: result.profilePicture, isAdmin: result.isAdmin });
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
router.get("/logout", (req, res) => {
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
router.get("/check-session", (req, res) => {
    if (req.session.user) {
        res.send({ _id: req.session.user });
    } else {
        res.status(401).send();
    }
});

router.get("/:id", mongoChecker, async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(400).send('Can\'t find user');
        return;
    } 
    const result = await User.findById(id);
    const sendMe = {
        _id: result?._id,
        username: result?.username,
        image_url: result?.image_url,
        bio: result?.bio
        //TODO top shows and stuff
    }
    res.send(sendMe);
});

async function deleteImage(imageId) {
    return cloudinary.uploader.destroy(imageId);
}

router.delete("/:id", mongoChecker, authenticate, async (req, res) => {
    const id = req.params.id;
    //Only a user can edit themselves or an admin
    if (id == req.user._id || req.user.isAdmin) {
        const user = await User.findById(id);
        if (user.image_id) {
            // Clean up their data from cloudinary
            await deleteImage(user.image_id);
        }
        const result = await User.deleteOne({_id: id});
        req.session.destroy();
        res.status(200).send(result);
    } else {
        res.status(401).send('Unauthorized');
    }
});

router.post("/", mongoChecker, authenticate, async (req, res) => {
    //Only a user can edit themselves or an admin
    const id = req.body._id;

    if (id == req.user._id || req.user.isAdmin) {
        const result = await User.updateOne({_id: req.body._id}, {$set: { ...req.body }});
        res.status(200).send(result);
    } else {
        res.status(401).send('Unauthorized');
    }
});

router.post("/profileImages/:id", multipartMiddleware, mongoChecker, authenticate, async (req, res) => {
    const id = req.params.id;
    if (id != req.user._id && !req.user.isAdmin) {
        res.status(401).send('Unauthorized');
        return;
    }

    if (req.user.image_id) {
        // If user already has a profile picture, first delete the old one from cloudinary
        await deleteImage(req.user.image_id);
    }

    // Use uploader.upload API to upload image to cloudinary server.
    cloudinary.uploader.upload(
        req.files.image.path, // req.files contains uploaded files
        function (result) {
            User.updateOne({_id: id}, {$set: {image_id: result.public_id, image_url: result.url}})
                .then(() => {
                    res.status(200).send(result);
                });
        });
});

router.post('/favorite', mongoChecker, authenticate, async (req, res) => {
    try {
    const user = await User.findById(req.user._id);
    const show = await user.favoriteShows.create({
        showId: req.body.showId
    });
    await user.favoriteShows.push(show);
    const result = await user.save();
    res.send(result);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/favorite', mongoChecker, authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const show = await user.find({showId: req.body.showId});
        await show.remove();
        const result = await user.save();
        res.send(result);
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router;