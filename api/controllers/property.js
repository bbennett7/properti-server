const uniqid = require('uniqid');
const propertyModel = require('../models/property');

const createProperty = async (req, res) => {
  const id = uniqid();
  try {
    const data = await propertyModel.createProperty(id, req.body);
    if (data.length > 0) {
      return res.status(200).send(data[0]);
    }

    return res.status(400).send('Error occurred creating property.');
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getProperties = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await propertyModel.getProperties(id);
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getPropertyById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await propertyModel.getPropertyById(id);
    if (data.length > 0) {
      return res.status(200).send(data[0]);
    }

    return res.status(400).send('Property not found.');
  } catch (err) {
    return res.status(500).send(err);
  }
};

const deletePropertyById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await propertyModel.deletePropertyById(id);
    if (data.length > 0) {
      return res.status(200).send(data[0]);
    }

    return res.status(400).send('Error deleting property.');
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getPropertiesByManagerId = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await propertyModel.getPropertiesByManagerId(id);

    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  createProperty,
  getPropertyById,
  getProperties,
  deletePropertyById,
  getPropertiesByManagerId
};
