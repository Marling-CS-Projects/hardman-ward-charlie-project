const http = require('http')
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const account = require('./lib/account')
const leaderboard = require('./lib/leaderboard')
const { Server } = require("socket.io")

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(__dirname + "/public"))

app.post('/register', (req, res) => {
    account.register(req.body, (err) => {
        if (err) {
            res.status(err.code).send(err.msg)
        } else {
            res.redirect("login.html")
        }
        res.end()
    })
})

app.post('/login', (req, res) => {
    account.login(req.body, (err, id) => {
        if (err) {
            res.status(err.code).send(err.msg)
        } else {
            res.cookie('id', id)
            res.redirect("/")
        }
        res.end()
    })
})

// app.get('/', (req, res) => {
//     const id = req.cookies.id

//     if (id === undefined) {
//         res.redirect("login.html")
//     } else {
//         res.end("Hello, your ID is " + id)
//     }
// })

app.get('/leaderboard', (req, res) => {
    const id = req.cookies.id
    if (id === undefined) {
        res.redirect("login.html")
    } else {
        account.usernameFromId(id, (username) => {
            if (username) {
                leaderboard.getPersonalRecord(username, (record) => {
                    var html = `
                        <!DOCTYPE html>
                            <html>
                                <head lang="en">
                                    <meta charset="utf-8">
                                    <title>Leaderboard</title>
                                </head>
                                <body>
                                    <h1>Leaderboard</h1>
                                    <p><strong>Your personal record: </strong>${record}</p>
                                    <table>
                                        <tr>
                                            <th>Position</th>
                                            <th>Username</th>
                                            <th>Record</th>
                                        <tr>
                    `
                    
                    leaderboard.topRecords((topRecords) => {
                        for (let i = 0; i < topRecords.length; i++) {
                            html += `
                                <tr>
                                    <td>${i+1}</td>
                                    <td>${topRecords[i].username}</td>
                                    <td>${topRecords[i].record}</td>
                                </tr>
                            `
                        }

                        html += "</table></body></html>"

                        res.end(html)
                    })
                })
            } else {
                res.end("Username not found.")
            }
        })
    }
})

const server = http.createServer(app)
server.listen(8080, () => {
    console.log("Server is running!")
})

function generateRoom(rooms) {
    var room

    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split('')

    while (true) {
        room = ""

        for (let i = 0; i < 8; i++) {
            const chosenChar = chars[Math.floor(Math.random() * chars.length)]

            room += chosenChar
        }

        if (!rooms.includes(room)) {
            break
        }
    }

    return room
}

const io = new Server(server)

io.on('connection', (socket) => {
    socket.on('fetch username', (id) => {
        account.usernameFromId(id, (username) => {
            socket.emit('give username', username)
        })
    })

    socket.on('create room', () => {
        const rooms = Object.keys(io.sockets.adapter.rooms)

        const room = generateRoom(rooms)

        socket.emit('give room', room)
    })

    socket.on('join room', (data) => {
        const { room, username } = data

        socket.join(room)

        socket.emit('you joined room')
        socket.to(room).emit('new user', username)
    })

    socket.on('i clicked the button', (data) => {
        const { room, username } = data

        socket.to(room).emit('someone clicked the button', username)
    })
})
