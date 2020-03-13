const pool = require('../../config/pg-config');

const createProperty = async (id, body) => {
  const values = [
    id,
    body.name,
    body.street_address,
    body.city,
    body.state,
    body.property_manager_id,
    0
  ];

  return pool.query(
    `INSERT INTO properties(
            id,
            name,
            street_address,
            city,
            state,
            property_manager_id,
            outstanding_task_count
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7
        ) RETURNING *`,
    values
  );
};

const getPropertyById = async id => {
  return pool.query(
    `SELECT *
        FROM properties
        WHERE properties.id = ($1)`,
    [id]
  );
};

const getProperties = async () => {
  return pool.query(
    `SELECT *
        FROM properties`
  );
};

const deletePropertyById = async id => {
  return pool.query(
    `DELETE
        FROM properties
        WHERE id IN ($1)
        RETURNING *`,
    [id]
  );
};

module.exports = {
  createProperty,
  getPropertyById,
  getProperties,
  deletePropertyById
};
