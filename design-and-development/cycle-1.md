# 2.2.1 Cycle 1: Configure database

## Design

In this first cycle, i will be configuring my SQLite database and testing that I can read and write to it from Node.js. I will use this later on to faciliate registration of new user accounts, authentication of existing accounts, and a leaderboard system comparing time records of players.

### Objectives

* [x] Create a Node.js project in Visual Studio Code
* [x] Install the SQLite3 module
* [x] Create tables for user account details and sessions
* [x] Write to these tables from Node.js
* [x] Read from these tables with Node.js

### Usability Features

### Key Variables

| Variable Name | Use |
| ------------- | --- |
|               |     |

### Pseudocode

```
// Import SQLite3 module for handling SQLite databases
import sqlite3

// Open/create SQLite database
db = sqlite3.open("data.db")

// Create tables for accounts and sessions
db.run(`CREATE TABLE IF NOT EXISTS users (
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    record INT
)`)
db.run(`CREATE TABLE IF NOT EXISTS sessions (
    session TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL
)`)

// Write to database
db.run(`INSERT INTO users (username, password) VALUES ('charlie','password')`)
db.run(`INSERT INTO sessions (session, username) VALUES ('test', charlie')`)

// Read from database
const user_details = db.get(`SELECT * FROM users WHERE username='charlie'`)
print(user_details)
const session_details = db.get(`SELECT * FROM sessions WHERE session='test'`)
print(session_details)
```

## Development

### Outcome

At the end of this cycle, I have confirmed that Node.js is able to interact with my database through the sqlite3 library, both through reading and writing data. This will be necessary for my game to have a user account system and a leaderboard to compare time records.&#x20;

### Challenges

One challenging aspect of this first cycle was working with the asynchronous nature of the Node.js sqlite3 library. This will be useful for my program later on as I want my server to be able to facilitate multiple queries at once, for example if several users are registering an account at once. While in this cycle I can use the "serialize" function so that SQL queries are executed in order, I think in the long-term I will need to find more flexible solutions such as using async functions and promises.

## Testing

Evidence for testing

### Tests

| Test | Instructions                                                                                                                             | What I expect                                                                                                                                                            | What actually happens                                                                                                                                                                        | Pass/Fail |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| 1    | Run initial code                                                                                                                         | Database is created along with two tables for user details and sessions, test entries are written successfully, and the results of queries are outputted to the console. | Due to the asynchronous nature of the SQLite3 Node.js library, the query commands are run before the tables get to be initialised, resulting in an error about the tables being nonexistent. | Fail      |
| 2    | Run code with all queries wrapped in the "serialize" function so program waits until each query is complete before moving onto the next. | Database is created along with two tables for user details and sessions, test entries are written successfully, and the results of queries are outputted to the console. | As expected                                                                                                                                                                                  | Pass      |

### Evidence

<figure><img src="../.gitbook/assets/Screenshot from 2023-05-22 09-41-56.png" alt=""><figcaption><p>First test failed with errors about the tables not existing</p></figcaption></figure>

<figure><img src="../.gitbook/assets/Screenshot from 2023-05-22 09-42-13.png" alt=""><figcaption><p>Second test successful</p></figcaption></figure>

<figure><img src="../.gitbook/assets/Screenshot from 2023-05-22 09-47-22.png" alt=""><figcaption><p>User account details written to "users" table</p></figcaption></figure>

<figure><img src="../.gitbook/assets/Screenshot from 2023-05-22 09-47-15.png" alt=""><figcaption><p>Corresponding session written to "sessions" table</p></figcaption></figure>
