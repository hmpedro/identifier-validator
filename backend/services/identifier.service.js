/* eslint-disable max-len */
const cpfValidator = require('cpf');
const cnpjValidator = require('node-cnpj');

const Identifier = require('../models/identifier.model');
const StatusService = require('./status.service');

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

const identifierService = {
  list: async ({filters}) => {
    StatusService.incrementQuery('retrieveIdentifier');

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
    StatusService.incrementQuery('updateIdentifier');

    validateIdentifier(identifier);

    try {
      const oldIdentifier = await Identifier.findOne({ value: identififerValue }).exec();

      oldIdentifier.value = identifier.value;
      oldIdentifier.type = identifier.type;
      oldIdentifier.blacklist = identifier.blacklist;

      const savedObj = await oldIdentifier.save();
      return savedObj;
    } catch (error) {
      console.log(error);

      throw error;
    }
  },

  deleteIdentifier: async (identififerValue) => {
    StatusService.incrementQuery('deleteIdentifier');

    try {
      const deletedIdentifier = await Identifier.findOne({ value: identififerValue }).remove().exec();

      return deletedIdentifier;
    } catch (error) {
      console.log(error);

      throw error;
    }
  },
};


module.exports = identifierService;
