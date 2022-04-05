const express = require('express');
const router = express.Router();

const commentRoutes = require('./routes/comments')
const episodeRoutes = require('./routes/episodes')
const seasonRoutes = require('./routes/seasons')
const showRoutes = require('./routes/shows')
const userRoutes = require('./routes/users')

router.use('/ShowRoomAPI/api/comments', commentRoutes)
router.use('/ShowRoomAPI/api/episodes', episodeRoutes)
router.use('/ShowRoomAPI/api/seasons', seasonRoutes)
router.use('/ShowRoomAPI/api/shows', showRoutes)
router.use('/ShowRoomAPI/api/users', userRoutes)


module.exports = router; 