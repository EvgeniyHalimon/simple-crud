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
    const {id, name, surname} = request.body
    pool.query('INSERT INTO users (id, name, surname) VALUES ($1, $2, $3)', [id, name, surname], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${id}`)
    })
}

const updateUser = (request, response) => {
    console.log('REQUETS', request.body)
    const id = parseInt(request.params.id)
    const {name, surname} = request.body
    pool.query(
    'UPDATE users SET name = $1, surname = $2 WHERE id = $3',
    [name, surname, id],
        (error, results) => {
        if (error) {
            throw error
        }
            response.status(200).send(`User modified (?) with ID: ${id}`)
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