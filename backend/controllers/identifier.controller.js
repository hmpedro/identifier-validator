const identifierService = require('../services/identifier.service');

const identifierController = {
  list: (req, res, next) => {
    identifierService.list(req.body)
      .then((identifiersList) => {
        res.status(200).send(identifiersList);
      })
      .catch(next);
  },
  createIdentifier: (req, res, next) => {
    identifierService.createIdentifier(req.body)
      .then((cpf) => {
        res.status(200).send(cpf);
      })
      .catch(next);
  },
};

module.exports = identifierController;
