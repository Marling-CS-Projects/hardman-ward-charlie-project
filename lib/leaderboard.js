const open = require('./open')

function formatSeconds(seconds) {
    const hours = Math.floor(seconds / 3600)
    seconds -= (hours * 3600)

    const minutes = Math.floor(seconds / 60)
    seconds -= (minutes * 60)

    const format = `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`
    return format
}

function getPersonalRecord(username, callback) {
    open((db) => {
        db.get(`SELECT record FROM users WHERE username='${username}'`, (err, row) => {
            const recordSeconds = row.record
            const record = formatSeconds(recordSeconds)
            callback(record)
        })
    })
}

function topRecords(callback) {
    open((db) => {
        db.all(`SELECT username, record FROM users WHERE record IS NOT NULL ORDER BY record ASC`, (err, rows) => {
            var numberOfRows
            if (rows.length < 50) {
                numberOfRows = rows.length
            } else {
                numberOfRows = 50
            }

            const topRecords = []
            for (let i = 0; i < numberOfRows; i++) {
                const recordSeconds = rows[i].record
                const record = formatSeconds(recordSeconds)

                topRecords.push({
                    username: rows[i].username,
                    record: record
                })
            }

            callback(topRecords)
        })
    })
}

module.exports = { getPersonalRecord, topRecords }
