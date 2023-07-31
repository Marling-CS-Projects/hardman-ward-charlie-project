const open = require('./open')

function register(form, callback) {
    open((db) => {
        const username = form.username
        const email = form.email
        const password = form.password

        db.get(`SELECT * FROM users WHERE username='${username}'`, (err, usernameExists) => {
            if (usernameExists) {
                callback({
                    code: 409,
                    msg: "Username already taken"
                })
            } else {
                db.run(`INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`, (err) => {
                    if (err) {
                        callback({
                            code: 500,
                            msg: "Internal database error"
                        })
                    } else {
                        callback(false)
                    }
                })
            }
        })
    })
}

function login(form, callback) {
    open((db) => {
        const username = form.username
        const password = form.password

        db.get(`SELECT * FROM users WHERE username='${username}' AND password='${password}'`, (err, row) => {
            if (row) {
                callback(false, row.id)
            } else if (err) {
                callback({
                    code: 500,
                    msg: "Internal database error"
                })
            } else {
                callback({
                    code: 401,
                    msg: "Invalid username or password"
                })
            }
        })
    })
}

function usernameFromId(id, callback) {
    open((db) => {
        db.get(`SELECT username FROM users WHERE id='${id}'`, (err, row) => {
            if (row) {
                callback(row.username)
            } else {
                callback(false)
            }
        })
    })
}

module.exports = { register, login, usernameFromId }
