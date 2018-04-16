const express = require('express');
const identifierController = require('../controllers/identifier.controller');

const router = express.Router();

router.get('/', identifierController.list);

router.post('/cpf', identifierController.createCpf);

router.post('/cnpj', identifierController.createCnpj);

module.exports = router;
