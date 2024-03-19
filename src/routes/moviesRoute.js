const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/producer', moviesController.getProducerWithMaxMinGap);

module.exports = router;
