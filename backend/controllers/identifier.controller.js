const identifierService = require('../services/identifier.service');

const identifierController = {
  list: (req, res, next) => {
    identifierService.list(req.body)
      .then((identifiersList) => {
        res.status(200).send(identifiersList);
      })
      .catch(next);
  },
  createCpf: (req, res, next) => {
    identifierService.createCpf(req.body)
      .then((cpf) => {
        res.status(200).send(cpf);
      })
      .catch(next);
  },
  createCnpj: (req, res, next) => {
    identifierService.createCnpj(req.body)
      .then((cnpj) => {
        res.status(200).send(cnpj);
      })
      .catch(next);
  },
};

module.exports = identifierController;
