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

  createIdentifier: async (identifier) => {
    StatusService.incrementQuery('createIdentifier');

    if (!identifier) {
      throw new Error('Empty Object');
    }

    if (!identifier) {
      throw new Error('Empty Object');
    }

    if (identifier.type === 'CPF' && !cpfValidator.isValid(identifier.value)) {
      throw new Error('Invalid CPF');
    }

    if (identifier.type === 'CNPJ' && !cnpjValidator.validate(identifier.value)) {
      throw new Error('Invalid CNPJ');
    }

    const identifierToSave = new Identifier({
      value: identifier.value,
      type: identifier.type,
      blacklist: identifier.blacklist,
    });

    try {
      const savedObj = await identifierToSave.save();
      return savedObj;
    } catch (error) {
      console.log(error);
      if (error.message.includes('duplicate key error')) throw new Error('Duplicated CPF');

      throw error;
    }
  },

};

module.exports = identifierService;