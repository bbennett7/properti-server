const Joi = require('joi');
const uniqid = require('uniqid');
const taskModel = require('../models/task');

const validateCreateBody = body => {}

const upsertTask = async (req, res) => {
    // add in task validations
    const id = uniqid();
    req.body.name.trim()
    try {
        const data = await taskModel.upsertTask(id, req.body);
        if (data.length > 0) {
            return res.status(200).send(data[0]);
        }

        return res.status(400).send('Error occurred creating task.');
    } catch (err) {
        console.log(err)
        return res.status(500).send(err);
    }
}

const getTasks = async (req, res) => {
    try {
        const data = await taskModel.getTasks();
        
        return res.status(200).send(data);
    } catch (err) {
        return res.status(500).send(err);
    }
}

const deleteTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await taskModel.deleteTaskById(id);
        if (data.length > 0) {
            return res.status(200).send(data[0]);
        }

        res.status(400).send('Error deleting task.')
    } catch (err) {
        return res.status(500).send(err);
    }
}

module.exports = {
    upsertTask,
    getTasks,
    deleteTaskById
}