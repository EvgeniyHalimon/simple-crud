const pool = require('./connection')

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
        console.log(results)
        console.log(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const {id, name, surname} = request.params
    console.log('REQ',request.params)
    pool.query('INSERT INTO users (id, name, surname) VALUES ($1, $2, $3)', [id, name, surname], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(results)
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const user = request.params
    pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [user.name, user.surname, id],
        (error, results) => {
        if (error) {
            throw error
        }
            response.status(200).json(results)
        }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
        throw error
    }
        response.status(200).send(results.rows)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}