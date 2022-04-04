const express = require('express');
const router = express.Router();

const commentRoutes = require('./routes/comments')
const episodeRoutes = require('./routes/episodes')
const seasonRoutes = require('./routes/seasons')
const showRoutes = require('./routes/shows')
const userRoutes = require('./routes/users')

router.use('/api/comments', commentRoutes)
router.use('/api/episodes', episodeRoutes)
router.use('/api/seasons', seasonRoutes)
router.use('/api/shows', showRoutes)
router.use('/api/users', userRoutes)


module.exports = router; 