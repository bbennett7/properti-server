const Joi = require('joi');
const uniqid = require('uniqid');
const moment = require('moment');
const userTaskModel = require('../models/userTask');

const validateCreateBody = body => {
  const schema = {
    task_id: Joi.string().required(),
    property_id: Joi.string().required(),
    urgency_level: Joi.string().required(),
    notes: Joi.string().required()
  };

  return Joi.validate(body, schema);
};

const createUserTask = async (req, res) => {
  const { error } = validateCreateBody(req.body);
  if (error) return res.status(400).send({ error: error.details[0] });

  const userTaskId = uniqid();
  const { id } = req.params;
  try {
    const data = await userTaskModel.createUserTask(id, userTaskId, req.body);
    if (data.length > 0) {
      return res.status(200).send(data[0]);
    }

    return res.status(400).send('Error occurred creating task for user.');
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getTasksByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await userTaskModel.getTasksByUserId(id);

    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const updateUserTaskById = async (req, res) => {
  const { userId, id } = req.params;
  const { body } = req;

  if (body.status === 'Completed') {
    body.completed_on = moment();
  }

  try {
    const data = await userTaskModel.updateUserTaskById(userId, id, body);

    if (data.length > 0) {
      return res.status(200).send(data[0]);
    }

    return res.status(400).send('Error updating task for user.');
  } catch (err) {
    return res.status(500).send(err);
  }
};

const deleteUserTaskById = async (req, res) => {
  const { userId, id } = req.params;
  try {
    const data = await userTaskModel.deleteUserTaskById(userId, id);
    if (data.length > 0) {
      return res.status(200).send(data[0]);
    }

    return res.status(400).send('Error deleting task for user.');
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getOpenTasksByManagerId = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await userTaskModel.getOpenTasksByManagerId(id);

    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  createUserTask,
  getTasksByUserId,
  updateUserTaskById,
  deleteUserTaskById,
  getOpenTasksByManagerId
};
