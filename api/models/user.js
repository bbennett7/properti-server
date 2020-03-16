const pool = require('../../config/pg-config');

const createUser = async body => {
  const values = [body.id, body.email, body.first_name, body.last_name, body.account_type];

  return pool.query(
    `INSERT INTO users(
            id,
            email,
            first_name,
            last_name,
            account_type
        ) VALUES (
            $1, $2, $3, $4, $5
        ) RETURNING *`,
    values
  );
};

const getUserById = async id => {
  return pool.query(
    `SELECT users.id,
        users.email,
        users.first_name,
        users.last_name,
        users.unit,
        users.account_type,
        (SELECT row_to_json(t) FROM properties as t WHERE t.id = users.property_id) AS property,
        (SELECT row_to_json(t) FROM users as t WHERE t.id = properties.property_manager_id) AS property_manager
        FROM users
        LEFT JOIN properties
          ON users.property_id = properties.id
        WHERE users.id = ($1)`,
    [id]
  );
};

const updateUserById = async (id, body) => {
  const values = [];
  const keys = [];

  values.push(id);
  Object.keys(body).forEach(key => {
    if (!body[key] || key === 'id') {
      return null;
    }

    if (key !== id) {
      values.push(body[key]);
      keys.push(key);
    }
  });

  let query = '';
  let count = 1;
  keys.forEach((key, i) => {
    count += 1;
    query += `${key}=($${count})${keys.length - 1 !== i ? ', ' : ''}`;
  });

  return pool.query(`UPDATE users SET ${query} WHERE id IN($1) RETURNING *`, values);
};

const deleteUserById = async id => {
  return pool.query(
    `DELETE
        FROM users
        WHERE id IN ($1)
        RETURNING *`,
    [id]
  );
};

module.exports = {
  createUser,
  getUserById,
  deleteUserById,
  updateUserById
};
