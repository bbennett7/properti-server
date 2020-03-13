const pool = require('../../config/pg-config');
const moment = require('moment')

const createUserTask = async (id, userTaskId, body) => {
    const createdOn = moment()
    const values = [
        userTaskId,
        id,
        body.task_id,
        body.urgency_level,
        body.status,
        body.notes,
        createdOn,
        null
    ] 

    return pool.query(
        `INSERT INTO users_tasks(
            id,
            user_id,
            task_id,
            urgency_level,
            status,
            notes,
            created_on,
            completed_on
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8
        ) RETURNING *`,
        values
    )
}

const getTasksByUserId = async (id) => {
    return pool.query(
        `SELECT *
        FROM users_tasks
        WHERE user_id IN ($1)`,
        [id]
    )
}

const deleteUserTaskById = async id => {
    return pool.query(
        `DELETE
        FROM users_tasks
        WHERE id IN ($1)
        RETURNING *`,
        [id]
    )
}

module.exports = {
    createUserTask,
    getTasksByUserId,
    deleteUserTaskById
}