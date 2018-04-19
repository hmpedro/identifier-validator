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
      .then((identifier) => {
        res.status(200).send(identifier);
      })
      .catch(next);
  },
  updateIdentifier: (req, res, next) => {
    const { identififerValue } = req.params;
    identifierService.updateIdentifier(identififerValue, req.body)
      .then((identifier) => {
        res.status(200).send(identifier);
      })
      .catch(next);
  },
  deleteIdentifier: (req, res, next) => {
    const { identififerValue } = req.params;
    identifierService.deleteIdentifier(identififerValue)
      .then((identifier) => {
        res.status(200).send(identifier);
      })
      .catch(next);
  },
};

module.exports = identifierController;
