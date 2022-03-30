"use strict";

const env = process.env.NODE_ENV;

const log = console.log;
const path = require('path');

const express = require("express");
// starting the express server
const app = express();

const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose models
const { User } = require("./models/user");

// to validate object IDs
const { ObjectID } = require("mongodb");

// enable CORS if in development, for React local development server to connect to the web server.
const cors = require('cors')
if (env !== 'production') { app.use(cors()) }

// body-parser: middleware for parsing parts of the request into a usable object (onto req.body)
const bodyParser = require('body-parser') 
app.use(bodyParser.json()) // parsing JSON body
app.use(bodyParser.urlencoded({ extended: true })); // parsing URL-encoded form data (from form POST requests)

// express-session for managing user sessions
const session = require("express-session");
const MongoStore = require('connect-mongo') // to store session information on the database in production

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()  
    }   
}

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send("Unauthorized")
        })
    } else {
        res.status(401).send("Unauthorized")
    }
}

/*** Session handling **************************************/
// Create a session and session cookie
app.use(
    session({
        secret: process.env.SESSION_SECRET || "our hardcoded secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        },
        // store the sessions on the database in production
        store: env === 'production' ? MongoStore.create({
                                                mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/ShowRoomAPI'
                                 }) : null
    })
);

// A route to login and create a session
app.post("/users/login", mongoChecker, (req, res) => {
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
app.post("/users/create", mongoChecker, async (req, res) => {
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
app.get("/users/logout", (req, res) => {
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
app.get("/users/check-session", (req, res) => {
    if (req.session.user) {
        res.send({ _id: req.session._id });
    } else {
        res.status(401).send();
    }
});

app.get("/users/:id", mongoChecker, async (req, res) => {
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


app.delete("/users/:id", mongoChecker, authenticate, async (req, res) => {
    const id = req.params.id;
    //Only a user can edit themselves or an admin
    if (id != req.user._id && !req.user.isAdmin) {
        res.status(401).send('Unauthorized');
    } else {
        const result = await User.deleteOne({_id: id});
        res.status(200).send(result);
    }
});

app.post("/users", mongoChecker, authenticate, async (req, res) => {
    //Only a user can edit themselves or an admin
    if (req.body._id != req.user._id && !req.user.isAdmin) {
        res.status(401).send('Unauthorized');
    } else {
        const result = await User.updateOne({_id: req.body._id}, {$set: { ...req.body }});
        res.status(200).send(result);
    }
});


/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "/client/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // send index.html
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});