const Joi = require('joi');
const uniqid = require('uniqid');
const userTask = require('../models/userTask');

const validateCreateBody = body => {}

const createUserTask = async (req, res) => {
    // add in task validations
    const userTaskId = uniqid();
    const { id } = req.params;
    try {
        const data = await userTask.createUserTask(id, userTaskId, req.body);
        if (data.length > 0) {
            return res.status(200).send(data[0]);
        }

        return res.status(400).send('Error occurred creating task for user.');
    } catch (err) {
        return res.status(500).send(err);
    }
}

const getTasksByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await userTask.getTasksByUserId(id);

        return res.status(200).send(data);
    } catch (err) {
        return res.status(500).send(err);
    }
}

const updateUserTaskById = async (req, res) => {}

const deleteUserTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await userTask.deleteUserTaskById(id);
        if (data.length > 0) {
            return res.status(200).send(data[0]);
        }

        res.status(400).send('Error deleting task for user.')
    } catch (err) {
        return res.status(500).send(err);
    }
}

module.exports = {
    createUserTask,
    getTasksByUserId,
    updateUserTaskById,
    deleteUserTaskById
}