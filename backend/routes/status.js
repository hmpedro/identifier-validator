const express = require('express');
const StatusController = require('../controllers/status.controller');

const router = express.Router();

router.get('/', StatusController.status);

module.exports = router;
