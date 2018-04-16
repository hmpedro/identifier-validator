const cpfValidator = require('cpf');
const cnpjValidator = require('node-cnpj');

const Identifier = require('../models/identifier.model');
const StatusService = require('./status.service');

const identifierService = {
  list: async ({ filters }) => {
    StatusService.incrementQuery('list');

    try {
      return await Identifier.find();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  createCpf: async ({ cpf }) => {
    StatusService.incrementQuery('cpf');

    if (!cpf || !cpfValidator.isValid(cpf)) {
      throw new Error('Invalid CPF');
    }

    const identifier = new Identifier({
      value: cpfValidator.clear(cpf),
      type: 'CPF',
    });

    try {
      return await identifier.save();
    } catch (error) {
      console.log(error);
      if (error.message.includes('duplicate key error')) throw new Error('Duplicated CPF');

      throw error;
    }
  },

  createCnpj: async ({ cnpj }) => {
    StatusService.incrementQuery('cnpj');

    if (!cnpj || !cnpjValidator.validate(cnpj)) {
      throw new Error('Invalid CNPJ');
    }

    const identifier = new Identifier({
      value: cpfValidator.unMask(cnpj),
      type: 'CNPJ',
    });

    try {
      return await identifier.save();
    } catch (error) {
      console.log(error);
      if (error.message.includes('duplicate key error')) throw new Error('Duplicated CPF');

      throw error;
    }
  },
};

module.exports = identifierService;
