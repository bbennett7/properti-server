const pool = require('../../config/pg-config');

const createUser = async body => {
    const values = [
        body.id,
        body.email,
        body.first_name,
        body.last_name,
        body.unit,
        body.account_type
    ]

    return pool.query(
        `INSERT INTO users(
            id,
            email,
            first_name,
            last_name,
            unit,
            account_type
        ) VALUES (
            $1, $2, $3, $4, $5, $6
        ) RETURNING *`,
        values
    )
}

const getUserById = async id => {
    return pool.query(
        `SELECT *
        FROM users
        WHERE users.id = ($1)`,
        [id]
    )
}

const deleteUserById = async id => {
    return pool.query(
        `DELETE
        FROM users
        WHERE id IN ($1)
        RETURNING *`,
        [id]
    )
}

module.exports = {
    createUser,
    getUserById,
    deleteUserById
}