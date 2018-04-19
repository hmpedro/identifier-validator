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

    validateIdentifier(identifier);

    const identifierToSave = new Identifier({
      value: identifier.value,
      type: identifier.type,
      blacklist: identifier.blacklist || undefined,
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

  updateIdentifier: async (identififerValue, identifier) => {
    StatusService.incrementQuery('createIdentifier');

    validateIdentifier(identifier);

    try {
      const savedObj = await Identifier.update({ value: identififerValue }, identifier);
      return savedObj;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

};

function validateIdentifier(identifier) {
  if (!identifier) {
    throw new Error('Empty Object');
  }

  if (identifier.type === 'CPF' && !cpfValidator.isValid(identifier.value)) {
    const err = new Error('Invalid CPF');
    err.status = 400;

    throw err;
  }

  if (identifier.type === 'CNPJ' && !cnpjValidator.validate(identifier.value)) {
    const err = new Error('Invalid CNPJ');
    err.status = 400;

    throw err;
  }
}

module.exports = identifierService;
