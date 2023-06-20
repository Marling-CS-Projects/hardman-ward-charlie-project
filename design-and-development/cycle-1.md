# 2.2.1 Cycle 1: Configure database

## Design

In this first cycle, i will be configuring my SQLite database and testing that I can read and write to it from Node.js. I will use this later on to facilitate registration of new user accounts, authentication of existing accounts, and a leaderboard system comparing time records of players.

### Objectives

* [x] Create a Node.js project in Visual Studio Code
* [x] Install the SQLite3 module
* [x] Create tables for user account details and sessions
* [x] Write to these tables from Node.js
* [x] Read from these tables with Node.js

### Usability Features

### Key Variables

| Variable Name | Use                                                  |
| ------------- | ---------------------------------------------------- |
| db            | Faciliate read/write operations to external database |
| row           | Store output of SQL queries                          |
| err           | If SQL query fails, the cause will be stored here    |

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
user_details = db.get(`SELECT * FROM users WHERE username='charlie'`)
print(user_details)
session_details = db.get(`SELECT * FROM sessions WHERE session='test'`)
print(session_details)
```

## Development

### Outcome

At the end of this cycle, I have confirmed that Node.js is able to interact with my database through the sqlite3 library, both through reading and writing data. This will be necessary for my game to have a user account system and a leaderboard to compare time records.&#x20;

Below is the code that imports the sqlite3 library and opens/creates a new database:

```javascript
// Import SQLite3 module for handling SQLite databases
const sqlite3 = require('sqlite3')

// Open/create SQLite database
const db = new sqlite3.Database("data.db")
```

Below is the code that creates tables for user accounts and sessions if they don't exist:

```javascript
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
```

Below is the code that writes test entries to the tables:

```javascript
// Write to database
db.run(`INSERT INTO users (username, password) VALUES ('charlie','password')`)
db.run(`INSERT INTO sessions (session, username) VALUES ('test', 'charlie')`)
```

Below is the code that reads entries from the tables:

```javascript
// Read from database
db.get(`SELECT * FROM users WHERE username='charlie'`, (err, row) => {
    if (err) {
        console.log(err)
    }
    
    console.log(row)
})
db.get(`SELECT * FROM sessions WHERE session='test'`, (err, row) => {
    if (err) {
        console.log(err)
    }
    
    console.log(row)
})
```

### Challenges

One challenging aspect of this first cycle was working with the asynchronous nature of the Node.js sqlite3 library. This will be useful for my program later on as I want my server to be able to facilitate multiple queries at once, for example if several users are registering an account at once. While in this cycle I can use the "serialize" function so that SQL queries are executed in order, I think in the long-term I will need to find more flexible solutions such as using async functions and promises.

## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Create new database and initialise two tables.</td><td>Two tables "users" and "sessions" in database file.</td><td><p>As expected</p><p></p></td><td>Pass</td></tr><tr><td>2</td><td>Write test entries.</td><td>Test entries for users and sessions written.</td><td>Due to the asynchronous nature of the SQLite3 library, the INSERT SQL code is run before the tables are created, resulting in an error because the tables do not exist yet.</td><td>Fail</td></tr><tr><td>3</td><td>Write test entries, with all SQL code wrapped in serialize function.</td><td>Test entries for users and sessions written.</td><td>As expected</td><td>Pass</td></tr><tr><td>4</td><td>SQL queries obtain values of the test entries.</td><td>Values of the previous test entries are outputted to the console in the format of a list.</td><td>As expected</td><td>Pass</td></tr></tbody></table>

### Evidence

<figure><img src="../.gitbook/assets/Screenshot from 2023-05-22 09-41-56.png" alt=""><figcaption><p>Error about nonexistent tables on the second test</p></figcaption></figure>

<figure><img src="../.gitbook/assets/Screenshot from 2023-05-22 09-42-13.png" alt=""><figcaption><p>Fourth test outputs values of entries to console</p></figcaption></figure>

<figure><img src="../.gitbook/assets/Screenshot from 2023-05-22 09-47-22.png" alt=""><figcaption><p>Third test -- test entry for "users" table</p></figcaption></figure>

<figure><img src="../.gitbook/assets/Screenshot from 2023-05-22 09-47-15.png" alt=""><figcaption><p>Third test -- test entry for "sessions" table</p></figcaption></figure>
