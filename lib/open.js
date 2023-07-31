const sqlite3 = require("sqlite3")

function open(callback) {
    const db = new sqlite3.Database("data.db")
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        record INT
    )`)
    callback(db)
}

module.exports = open
