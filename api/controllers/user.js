const Joi = require('joi');
const userModel = require('../models/user');

const validateCreateBody = body => {
  const schema = {
    id: Joi.string().required(),
    email: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    unit: Joi.string().required(),
    account_type: Joi.string().required()
  };

  return Joi.validate(body, schema);
};

const createUser = async (req, res) => {
  const { error } = validateCreateBody(req.body);
  if (error) return res.status(400).send({ error: error.details[0] });

  try {
    const data = await userModel.createUser(req.body);
    if (data.length > 0) {
      return res.status(200).send(data[0]);
    }

    return res.status(400).send('Error occurred creating user.');
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await userModel.getUserById(id);
    if (data.length > 0) {
      return res.status(200).send(data[0]);
    }

    return res.status(400).send('User not found.');
  } catch (err) {
    return res.status(500).send(err);
  }
};

const updateUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await userModel.updateUserById(id, req.body);
    if (data.length > 0) {
      return res.status(200).send(data[0]);
    }

    return res.status(400).send('Error updating user.');
  } catch (err) {
    return res.status(500).send(err);
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await userModel.deleteUserById(id);
    if (data.length > 0) {
      return res.status(200).send(data[0]);
    }

    return res.status(400).send('Error deleting user.');
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById
};
