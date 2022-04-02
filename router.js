const express = require('express');
const router = express.Router();

const commentRoutes = require('./routes/comments')
const episodeRoutes = require('./routes/episodes')
const seasonRoutes = require('./routes/seasons')
const showRoutes = require('./routes/shows')
const userRoutes = require('./routes/users')

router.use('/comments', commentRoutes)
router.use('/episodes', episodeRoutes)
router.use('/seasons', seasonRoutes)
router.use('/shows', showRoutes)
router.use('/users', userRoutes)


module.exports = router; 