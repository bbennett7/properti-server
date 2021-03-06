const pool = require('../../config/pg-config');

const upsertTask = async (id, name) => {
  const values = [id, name];

  return pool.query(
    `INSERT INTO tasks(
            id,
            name
        ) VALUES (
            $1, $2
        ) ON CONFLICT (name) DO UPDATE SET 
        name = $2 
        RETURNING id, name`,
    values
  );
};

const getTasks = async () => {
  return pool.query(
    `SELECT *
        FROM tasks`
  );
};

const deleteTaskById = async id => {
  return pool.query(
    `DELETE
        FROM tasks
        WHERE id IN ($1)
        RETURNING *`,
    [id]
  );
};

module.exports = {
  upsertTask,
  getTasks,
  deleteTaskById
};
