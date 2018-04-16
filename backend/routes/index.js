const express = require('express');

const router = express.Router();
const identifierRouter = require('./identifier');
const statusRouter = require('./status');

/* GET home page. */
router.use('/status', statusRouter);
router.use('/identifier', identifierRouter);


module.exports = router;
