const Joi = require('joi');
const uniqid = require('uniqid');
const propertyModel = require('../models/property');

const validateCreateBody = body => {}

const createProperty = async (req, res) => {
    // add in property validations
    const id = uniqid();
    try {
        const data = await propertyModel.createProperty(id, req.body);
        if (data.length > 0) {
            return res.status(200).send(data[0]);
        }

        throw Error('Error occurred creating property.');
    } catch (err) {
        return res.status(500).send(err);
    }
}

const getPropertyById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await propertyModel.getPropertyById(id);
        if (data.length > 0) {
            return res.status(200).send(data[0]);
        }

        res.status(400).send('Property not found.')
    } catch (err) {
        return res.status(500).send(err);
    }
}

const deletePropertyById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await propertyModel.deletePropertyById(id);
        if (data.length > 0) {
            return res.status(200).send(data[0]);
        }

        res.status(400).send('Error deleting property.')
    } catch (err) {
        return res.status(500).send(err);
    }
}

module.exports = {
    createProperty,
    getPropertyById,
    deletePropertyById
}