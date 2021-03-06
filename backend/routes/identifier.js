const express = require('express');
const identifierController = require('../controllers/identifier.controller');

const router = express.Router();

router.get('/', identifierController.list);

router.post('/', identifierController.createIdentifier);

router.put('/:identififerValue', identifierController.updateIdentifier);

router.delete('/:identififerValue', identifierController.deleteIdentifier);


module.exports = router;
