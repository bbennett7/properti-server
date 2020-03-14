const moment = require('moment');
const pool = require('../../config/pg-config');

const createUserTask = async (id, userTaskId, body) => {
  const createdOn = moment();
  const values = [
    userTaskId,
    id,
    body.task_id,
    body.property_id,
    body.urgency_level,
    body.status,
    body.notes,
    createdOn,
    null
  ];

  return pool.query(
    `INSERT INTO users_tasks(
        id,
        user_id,
        task_id,
        property_id,
        urgency_level,
        status,
        notes,
        created_on,
        completed_on
    ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
    ) RETURNING *`,
    values
  );
};

const getTasksByUserId = async id => {
  return pool.query(
    `SELECT *
        FROM users_tasks
        WHERE user_id IN ($1)`,
    [id]
  );
};

const updateUserTaskById = async (userId, id, body) => {
  const values = [];
  const keys = [];

  values.push(id);
  values.push(userId);
  Object.keys(body).forEach(key => {
    if (!body[key] || key === 'id' || key === 'user_id' || key === 'task_id') {
      return null;
    }

    if (key !== id) {
      values.push(body[key]);
      keys.push(key);
    }
  });

  let query = '';
  let count = 2;
  keys.forEach((key, i) => {
    count += 1;
    query += `${key}=($${count})${keys.length - 1 !== i ? ', ' : ''}`;
  });

  return pool.query(
    `UPDATE users_tasks SET ${query} WHERE id IN($1) AND user_id IN($2) RETURNING *`,
    values
  );
};

const deleteUserTaskById = async (userId, id) => {
  return pool.query(
    `DELETE
        FROM users_tasks
        WHERE id IN ($1) AND user_id IN ($2)
        RETURNING *`,
    [id, userId]
  );
};

const getOpenTasksByManagerId = async id => {
  return pool.query(
    `SELECT 
      users_tasks.id,
      (SELECT row_to_json(t) FROM tasks as t WHERE t.id =     users_tasks.task_id) AS task,
      users_tasks.urgency_level,
      users_tasks.status,
      users_tasks.notes,
      users_tasks.created_on,
      users_tasks.completed_on,
      (SELECT row_to_json(t) FROM users as t WHERE t.id =     users_tasks.user_id) AS resident,
      (SELECT row_to_json(t) FROM properties as t WHERE t.id =     users_tasks.property_id) AS property
      FROM users_tasks
      LEFT JOIN users
        ON users.id = users_tasks.user_id
      LEFT JOIN properties
        ON properties.id = users_tasks.property_id
      WHERE properties.property_manager_id IN ($1) AND users_tasks.status <> 'Completed'`,
    [id]
  );
};

module.exports = {
  createUserTask,
  getTasksByUserId,
  updateUserTaskById,
  deleteUserTaskById,
  getOpenTasksByManagerId
};
